#!/usr/bin/env node

// Script de diagnostic Supabase selon la documentation officielle
// https://supabase.com/docs/guides/self-hosting/docker

import https from 'https';
import http from 'http';

const CONFIG = {
  customDomain: {
    url: 'https://db.kaysuto.fr',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzU1NjM3OTQ4LCJleHAiOjIwNzA5OTc5NDh9.ooNByjZ-M9a6fvLuVKM2nQwsKxAKfFpMNvD413L5f6E'
  },
  tailscale: {
    url: 'http://100.79.95.114:8000',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzU1NjM3OTQ4LCJleHAiOjIwNzA5OTc5NDh9.ooNByjZ-M9a6fvLuVKM2nQwsKxAKfFpMNvD413L5f6E'
  }
};

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;

    const req = client.request(url, {
      method: 'GET',
      headers: {
        'apikey': options.apikey || '',
        'Authorization': options.authorization || '',
        'Content-Type': 'application/json',
        'User-Agent': 'Supabase-Diagnostic/1.0'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function testEndpoint(name, config) {
  console.log(`\n🔍 Test ${name}:`);
  console.log(`URL: ${config.url}`);
  console.log(`API Key: ${config.apikey.substring(0, 20)}...`);

  try {
    // Test 1: Endpoint de base
    console.log('\n📡 Test endpoint de base...');
    const baseResponse = await makeRequest(`${config.url}/rest/v1/`, {
      apikey: config.apikey
    });

    console.log(`✅ Status: ${baseResponse.status}`);
    console.log(`📋 Headers CORS: ${baseResponse.headers['access-control-allow-origin'] || 'Non défini'}`);

    // Test 2: Table projects
    console.log('\n📊 Test table projects...');
    const projectsResponse = await makeRequest(`${config.url}/rest/v1/projects?select=*`, {
      apikey: config.apikey,
      authorization: `Bearer ${config.apikey}`
    });

    console.log(`✅ Status: ${projectsResponse.status}`);

    if (projectsResponse.status === 200) {
      try {
        const projects = JSON.parse(projectsResponse.data);
        console.log(`📈 Nombre de projets: ${projects.length}`);
        if (projects.length > 0) {
          console.log(`🎯 Premier projet: ${projects[0].title}`);
        }
      } catch (e) {
        console.log(`📄 Réponse brute: ${projectsResponse.data.substring(0, 100)}...`);
      }
    } else {
      console.log(`❌ Erreur: ${projectsResponse.data}`);
    }

    return true;

  } catch (error) {
    console.log(`❌ Erreur de connexion: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Diagnostic Supabase Self-Hosting');
  console.log('=====================================');

  const results = {};

  // Test domaine personnalisé
  results.customDomain = await testEndpoint('Domaine Personnalisé', CONFIG.customDomain);

  // Test Tailscale
  results.tailscale = await testEndpoint('Tailscale', CONFIG.tailscale);

  // Résumé
  console.log('\n📋 RÉSUMÉ DU DIAGNOSTIC:');
  console.log('========================');

  if (results.customDomain && results.tailscale) {
    console.log('✅ Les deux endpoints fonctionnent correctement');
    console.log('💡 Le problème vient probablement de la configuration côté client');
    console.log('🔧 Vérifiez:');
    console.log('   - Configuration du proxy Vite');
    console.log('   - Headers d\'authentification dans les requêtes');
    console.log('   - Règles RLS (Row Level Security) activées');
  } else if (results.customDomain) {
    console.log('✅ Domaine personnalisé OK, Tailscale KO');
    console.log('💡 Utilisez uniquement le domaine personnalisé');
  } else if (results.tailscale) {
    console.log('✅ Tailscale OK, Domaine personnalisé KO');
    console.log('💡 Utilisez uniquement Tailscale pour le développement');
  } else {
    console.log('❌ Aucun endpoint ne fonctionne');
    console.log('🔧 Vérifiez:');
    console.log('   - Configuration réseau');
    console.log('   - Clés API valides');
    console.log('   - Instance Supabase démarrée');
  }

  console.log('\n📚 Documentation: https://supabase.com/docs/guides/self-hosting/docker');
}

main().catch(console.error);
