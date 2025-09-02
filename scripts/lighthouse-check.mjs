import { spawn } from 'node:child_process';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import lighthouse from 'lighthouse';
import { launch as launchChrome } from 'chrome-launcher';

const ROOT = process.cwd();
const PREVIEW_PORT = 4173;
const TARGET_URL = `http://localhost:${PREVIEW_PORT}/`;
const REPORT_DIR = path.join(ROOT, 'lighthouse-reports');

function log(msg) {
  console.log(`[LH] ${msg}`);
}

function run(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: os.platform() === 'win32', ...options });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`${cmd} ${args.join(' ')} exited with code ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Server not ready at ${url} after ${timeoutMs}ms`);
}

function killProcessTree(proc) {
  if (!proc || proc.killed) return Promise.resolve();
  return new Promise((resolve) => {
    if (os.platform() === 'win32') {
      const killer = spawn('taskkill', ['/pid', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
      killer.on('close', () => resolve());
    } else {
      proc.kill('SIGTERM');
      setTimeout(() => {
        if (!proc.killed) proc.kill('SIGKILL');
        resolve();
      }, 1000);
    }
  });
}

async function runLighthouse(url, preset) {
  const chrome = await launchChrome({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  const options = {
    logLevel: 'error',
    output: ['json', 'html'],
    port: chrome.port,
    preset,
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  };

  try {
    const runnerResult = await lighthouse(url, options);
    return { chrome, runnerResult };
  } catch (e) {
    await chrome.kill();
    throw e;
  }
}

function extractScores(lhr) {
  const cats = lhr.categories;
  return {
    performance: cats.performance.score,
    accessibility: cats.accessibility.score,
    bestPractices: cats['best-practices'].score,
    seo: cats.seo.score,
  };
}

function allHundred(scores) {
  return Object.values(scores).every((s) => Math.round((s ?? 0) * 100) === 100);
}

function fmt(scores) {
  const kv = Object.entries(scores).map(([k, v]) => `${k}: ${Math.round((v ?? 0) * 100)}`);
  return kv.join(' | ');
}

async function ensureReportDir() {
  await mkdir(REPORT_DIR, { recursive: true });
}

async function main() {
  log('Build du site (vite build)…');
  await run('npm', ['run', 'build']);

  log(`Lancement du serveur de prévisualisation sur ${TARGET_URL}…`);
  const preview = spawn('npm', ['run', 'preview'], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: os.platform() === 'win32',
  });

  try {
    await waitForServer(TARGET_URL);
    log('Serveur prêt. Exécution de Lighthouse (mobile + desktop)…');

    await ensureReportDir();

    // Mobile (par défaut)
    const { chrome: chromeMob, runnerResult: rrMob } = await runLighthouse(TARGET_URL, undefined);
    const scoresMob = extractScores(rrMob.lhr);
    const mobReports = rrMob.report;
    if (Array.isArray(mobReports) && mobReports.length === 2) {
      const [jsonMob, htmlMob] = mobReports;
      await writeFile(path.join(REPORT_DIR, 'report-mobile.json'), typeof jsonMob === 'string' ? jsonMob : JSON.stringify(rrMob.lhr, null, 2));
      await writeFile(path.join(REPORT_DIR, 'report-mobile.html'), htmlMob);
    } else {
      await writeFile(path.join(REPORT_DIR, 'report-mobile.json'), JSON.stringify(rrMob.lhr, null, 2));
    }
    log(`Scores Mobile -> ${fmt(scoresMob)}`);
  try { await chromeMob.kill(); } catch {}

    // Desktop
    const { chrome: chromeDesk, runnerResult: rrDesk } = await runLighthouse(TARGET_URL, 'desktop');
    const scoresDesk = extractScores(rrDesk.lhr);
    const deskReports = rrDesk.report;
    if (Array.isArray(deskReports) && deskReports.length === 2) {
      const [jsonDesk, htmlDesk] = deskReports;
      await writeFile(path.join(REPORT_DIR, 'report-desktop.json'), typeof jsonDesk === 'string' ? jsonDesk : JSON.stringify(rrDesk.lhr, null, 2));
      await writeFile(path.join(REPORT_DIR, 'report-desktop.html'), htmlDesk);
    } else {
      await writeFile(path.join(REPORT_DIR, 'report-desktop.json'), JSON.stringify(rrDesk.lhr, null, 2));
    }
    log(`Scores Desktop -> ${fmt(scoresDesk)}`);
  try { await chromeDesk.kill(); } catch {}

    const ok = allHundred(scoresMob) && allHundred(scoresDesk);
    if (!ok) {
      console.error('\nAu moins un score est < 100. Consultez les rapports JSON dans ./lighthouse-reports');
      process.exitCode = 1;
    } else {
      log('\nTous les scores sont à 100 ✅');
    }
  } finally {
    await killProcessTree(preview);
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
