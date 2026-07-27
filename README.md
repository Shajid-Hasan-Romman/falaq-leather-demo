# Falaq v2.0

A fresh Angular 22 storefront foundation — the next-generation FalaqCommerce
frontend. **Frontend-only today**; the backend API and database are added later
behind the typed HTTP layer.

## Stack

- **Angular 22** — standalone components, OnPush, signals, new control flow
- **TypeScript 6** (strict) · **SCSS** · **Tailwind v4** (design tokens)
- **SSR** — server-side rendering + hydration (`@angular/ssr`, Express)
- **Vitest** — unit tests (`@angular/build:unit-test`)
- **ng-openapi-gen** — typed API client generated from the backend OpenAPI spec (wired, populated once the API exists)

## Prerequisites

- Node.js 22+ (developed on 24) · npm 11+

## Getting started

```bash
npm install            # installs deps + builds Tailwind (postinstall)
npm run dev            # Tailwind --watch + ng serve → http://localhost:4200
```

`npm start` (plain `ng serve`) works too, but it does **not** rebuild Tailwind on
change — use `npm run dev` during active styling, or keep `npm run tailwind:watch`
in a second terminal.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Tailwind watch + dev server together (recommended) |
| `npm start` | Dev server only (`ng serve`, port 4200) |
| `npm run build` | Production SSR build (`prebuild` compiles Tailwind first) |
| `npm run serve:ssr:falaq-v2.0` | Run the built SSR server from `dist/` |
| `npm test` | Unit tests (Vitest) |
| `npm run tailwind:build` / `tailwind:watch` | Compile `theme.css` → `tailwind.generated.css` |
| `npm run generate:api` | Regenerate the API client (needs the backend running) |

## Project structure

```
src/
  environments/                 # typed environment config (dev / prod)
  styles/theme.css              # Tailwind v4 design tokens (source of truth)
  styles.scss                   # imports the compiled Tailwind output
  app/
    core/
      guards/ interceptors/     # route guards, HTTP interceptors
      services/api/             # generated API client (do not edit by hand)
    shared/
      components/ pipes/ directives/
    features/
      home/                     # sample landing feature (lazy-loaded)
      not-found/
    layouts/main-layout/        # header + footer shell
    app.routes.ts               # lazy feature routes
    app.config.ts               # providers (router, http, hydration)
```

## Conventions

Standalone + OnPush everywhere · signals for local state, RxJS for async ·
`inject()` over constructors · `input()` / `output()` over decorators · no
NgModules · no NgRx · no manual DTOs (use the generated client) · SSR-safe code
(guard `window`/`document` behind platform checks). See `CLAUDE.md` for the full
rule set.

## Backend & database (future)

The HTTP layer (`provideHttpClient` + `environment.apiBaseUrl` + the
`ng-openapi-gen` config) is in place so the backend + database drop in without
re-architecting the frontend. `proxy.conf.json` already forwards `/api`,
`/openapi`, and `/scalar` to `http://localhost:5199` for local API development.
