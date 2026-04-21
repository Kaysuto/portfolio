# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 5000
npm run build      # tsc -b --noCheck + vite build
npm run lint       # ESLint (ESLint 9, TypeScript ESLint 8)
npm run preview    # Preview production build locally
npm run kill       # Kill process on port 5000
```

No test runner is configured.

## Architecture

**SPA**: React 19 + TypeScript 5 + Vite 6 + Tailwind CSS 4. Deployed on Vercel. PWA via `public/manifest.json` + `public/sw.js`.

**Entry**: `src/main.tsx` — wraps `<AppRouter>` in `ErrorBoundary` + `NotificationProvider`, registers SW with SKIP_WAITING.

**Routing** (`src/AppRouter.tsx`): React Router 6 with v7 migration flags. Four public routes (`/`, `/bio`, `/cv`, `/legal-notice`) under a shared `Layout`. Unmatched routes redirect to `/`.

**Main page** (`src/PortfolioApp.tsx`): `HeroSection` rendered eagerly; `AboutSection`, `ProjectsSection`, `ContactSection` are lazy-loaded via `src/components/LazyComponents.tsx` + `<Suspense>` with `SectionSkeleton` fallback.

**Admin section** (`src/admin/`): Separate lazy-loaded sub-app with its own router (`AdminApp.tsx`), `AuthGuard`, pages, services, and styles (`admin.css`). Not linked from public routes.

**Layout** (`src/components/Layout.tsx`): `Navbar` + `<main>` + `Footer` + `PrivacyBadge`. Hosts Sonner toast container.

## Theming

Dark/light toggle stored in both cookie and localStorage. Cookie is always written (even before consent); localStorage follows consent status. Theme is applied via `data-appearance` attribute on `<html>`, not Tailwind `dark:` classes. CSS variables use OKLch color space. `src/lib/theme.ts` owns persistence; `src/hooks/use-theme.ts` subscribes to storage events + system `prefers-color-scheme` + custom `themeChange` events.

## UI & Styling

- Path alias: `@/` → `src/`
- Component library pattern: Radix UI primitives wrapped in `src/components/ui/`
- DaisyUI loaded as a Tailwind plugin for utility components
- Icons: `@phosphor-icons/react` (primary), `lucide-react`, `@heroicons/react`
- Animations: 20+ custom keyframes in `src/index.css`; delay utilities `.animate-delay-*`

## State & Data

- No global state manager — local hooks + Context (theme, auth)
- Remote data: `@tanstack/react-query` via `src/lib/queryClient.ts`
- GitHub API: `@octokit/core`
- Supabase (optional): configured in `src/lib/supabase.ts`, requires `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` env vars

## Build

Vite splits output into four chunks: `vendor` (React/React-DOM), `ui` (Radix), `icons` (Phosphor), and the app. `console.*` calls are stripped by Terser in production. CSS code-splitting is enabled.

## Adding things

- **New public page**: add a lazy-loaded component + route in `src/AppRouter.tsx`
- **New UI component**: add to `src/components/ui/`, follow Radix/headless pattern with typed props and ARIA attributes
- **New service/utility**: `src/lib/` for public, `src/admin/services/` for admin
