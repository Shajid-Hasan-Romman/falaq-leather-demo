# CLAUDE.md

Guidance for working in the **Falaq Leather** Angular storefront.

## What this is

The Falaq Leather storefront, built from scratch on the latest Angular.
**Frontend-only today** — there is no backend or database in this repo yet. The
HTTP layer is scaffolded so an API + DB can be added later without re-architecting
the frontend.

## Stack

- **Angular 22**, **TypeScript 6** (strict), **SCSS**, **Tailwind v4**
- **SSR** via `@angular/ssr` (Express) — SEO + fast first paint
- **State:** Angular Signals (sync/local), RxJS (async streams). No NgRx.
- **API client:** `ng-openapi-gen` — generated from the OpenAPI spec (empty until the backend exists)
- **Tests:** Vitest (`@angular/build:unit-test`)
- **Build system:** `@angular/build:application` (esbuild)

## Build & run

```bash
npm install                       # deps + Tailwind build (postinstall)
npm run dev                       # Tailwind watch + ng serve → http://localhost:4200
npm run build                     # production SSR build
npm test                          # unit tests (Vitest)
npm run generate:api              # regenerate API client (needs backend at :5199)
```

## Architecture

```
src/app/
  core/
    guards/                       # route guards
    interceptors/                 # HTTP interceptors (auth, etc.)
    services/                     # singleton services
    services/api/                 # generated from OpenAPI (do NOT edit)
  shared/
    components/  pipes/  directives/
  features/
    home/                         # lazy-loaded feature
    not-found/
  layouts/
    main-layout/                  # header + footer shell
  app.routes.ts                   # lazy feature routes
  app.config.ts                   # providers (router, http, hydration)
```

### Non-negotiable rules

1. **Standalone components only** — no NgModules.
2. **OnPush everywhere** — `changeDetection: ChangeDetectionStrategy.OnPush`.
3. **Signals for local state** — `signal()`, `computed()`, `effect()`; RxJS for async only.
4. **`inject()` over constructor DI.**
5. **`input()` / `output()` functions**, not `@Input()` / `@Output()` decorators.
6. **No `any`** — strict TypeScript, explicit return types on public methods.
7. **No manual DTOs / no raw `HttpClient` URL strings in features** — call the
   generated client in `core/services/api`. Until the backend exists, `HttpClient`
   with a `// TODO: migrate to generated API` comment is the temporary exception.
8. **Feature isolation** — features are lazy-loaded and never import each other.
9. **SSR-safe** — no bare `window` / `document` / `localStorage`; guard with
   `isPlatformBrowser(inject(PLATFORM_ID))`.

### File naming

Angular 22 default (suffix-less): `home.ts` / `home.html` / `home.scss` exporting
`class Home`; `main-layout.ts` exporting `class MainLayout`. No `.component` suffix.

## Styling

- **Tailwind v4** with tokens in `src/styles/theme.css`, compiled by the standalone
  Tailwind CLI to `src/styles/tailwind.generated.css` (git-ignored, rebuilt on
  `postinstall`/`prebuild`). `styles.scss` imports the compiled output.
- `ng serve` does **not** rebuild Tailwind — use `npm run dev` or `tailwind:watch`.
- Add/adjust design tokens in `theme.css` (`@theme { ... }`); prefer Tailwind
  utilities in templates over component SCSS.
- Mobile-first. Breakpoints: sm 576 · md 768 · lg 992 · xl 1200.

## API integration (when the backend lands)

- Base URL from `environment.apiBaseUrl` (empty = same-origin relative URLs).
- Populate `ng-openapi-gen.json` `includeTags`, run `npm run generate:api`.
- Add HTTP interceptors to the array in `app.config.ts` (`withInterceptors([...])`).
- `proxy.conf.json` forwards `/api`, `/openapi`, `/scalar` to `http://localhost:5199`.
