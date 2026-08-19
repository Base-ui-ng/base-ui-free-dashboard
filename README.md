# Base UI Free Dashboard

A free Angular admin dashboard template built with **Angular 22**, **Tailwind CSS 4**, and the [Base UI](https://base-ui.net) free tier.

Use it as a starter for SaaS-style apps, or as a live gallery to review free Base UI components in a real shell.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Angular 22 (standalone, zoneless-friendly patterns) |
| Styling | Tailwind CSS 4 |
| Components | Base UI free tier via [`base-ui-cli`](https://www.npmjs.com/package/base-ui-cli) (source copied into the repo) |
| Icons | Base UI sprite (`public/assets/icons.svg`) |

---

## Features

- **Auth flow** — login, register, forgot password (mocked `localStorage` auth)
- **App shell** — free `base-app-shell` with a collapsible mini rail, grouped `base-app-shell-nav-section` links, and a compact topbar
- **App pages** — dashboard metrics, users CRUD with dialogs, settings with in-page `base-sidenav`
- **Component gallery** — scroll-nav demos for primitives, forms, feedback, overlays, navigation, data display, and all 19 free form blocks (including hover-card, menubar, currency-input, kbd, aspect-ratio, scroll-area, loading-overlay, and cookie-banner)
- **Pro upsell notes** — comments where Pro widgets/layouts would extend the free shell

---

## Quick start

**Requirements:** Node.js 22+ (24 recommended)

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

### Demo credentials

| Field | Value |
| --- | --- |
| Email | `demo@base-ui.net` |
| Password | `password` |

(Any email/password works — auth is mocked.)

### Other scripts

```bash
npm run build           # production build → dist/base-ui-free-dashboard/browser
npm run watch           # rebuild on change
npm test                # unit tests
npm run deploy          # build + deploy to Cloudflare Pages (requires wrangler login)
```

---

## Deploy (Cloudflare Pages)

The demo is set up for [Cloudflare Pages](https://pages.cloudflare.com/) with SPA routing (`public/_redirects`).

### Option A — Connect the GitHub repo (recommended)

1. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select `lussos/base-ui-free-dashboard`.
3. Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist/base-ui-free-dashboard/browser` |
| Root directory | `/` (default) |
| Environment variable | `NODE_VERSION` = `22` |

4. Deploy. Cloudflare will rebuild on every push to `main`.
5. Optional: attach a custom domain under the project’s **Custom domains** tab.

After the first deploy you get a URL like `https://base-ui-free-dashboard-demo.pages.dev`.

### Option B — GitHub Actions

A workflow is included at `.github/workflows/deploy-cloudflare.yml`.

1. Create a Cloudflare API token with **Account → Cloudflare Pages → Edit**.
2. In the GitHub repo → **Settings → Secrets and variables → Actions**, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID` (from the Workers & Pages overview sidebar)
3. Create the Pages project once (Option A, or `npx wrangler pages project create base-ui-free-dashboard-demo`).
4. Push to `main` (or run the workflow manually).

### Option C — Deploy from your machine

```bash
npx wrangler login
npm run deploy
```

Config lives in `wrangler.toml` (`pages_build_output_dir` points at the Angular browser output).

---

## App routes

| Route | Description |
| --- | --- |
| `/login` | Sign in |
| `/register` | Create account |
| `/forgot-password` | Password reset request |
| `/app/dashboard` | Overview metrics & activity |
| `/app/users` | Users table, create/edit/delete dialogs |
| `/app/settings` | Profile / Billing / Notifications (in-page sidenav) |

---

## Component gallery

Browse under **Component gallery** in the sidebar (requires sign-in).

| Route | Covers |
| --- | --- |
| `/app/ui/primitives` | Buttons, badges, chips, avatars, icons, kbd, aspect-ratio, scroll-area, ripple, reveal, screen size |
| `/app/ui/forms` | Inputs, select, OTP, phone, currency, mask, spinner, color, rating, dual-range, filter |
| `/app/ui/feedback` | Alert, toast, progress, meter-group, counter, countdown, coming-soon, loading-overlay, cookie-banner |
| `/app/ui/overlays` | Dialog, dropdown, context-menu, tooltip, popover, hover-card, drawer, bottom-sheet, speed-dial |
| `/app/ui/navigation` | Tabs, breadcrumb, accordion, menubar, stepper, scroll-to, scroll buttons |
| `/app/ui/data-display` | Cards, stats, calendar, carousel, code, paginator, timeline, quote |
| `/app/ui/form-blocks` | All 19 free form blocks (capped at `540px` in the demo) |

Gallery pages use `base-scroll-nav` (“On this page”), content max-width **1080px**, and consistent section cards.

---

## Project structure

```
src/app/
  components/          # Base UI components (CLI) + layout-app-shell
  core/auth/           # Mock auth service + guards
  layouts/
    app-shell/         # Authenticated chrome
    auth-layout/       # Login / register / forgot
  pages/
    dashboard|users|settings/
    login|register|forgot-password/
    ui/                # Component gallery
public/assets/         # Icon sprite, static assets
docs/                  # Extra architecture notes
base-ui.json           # CLI config
base-ui-lock.json      # Installed component lockfile
```

Import Base UI symbols with the path alias:

```ts
import { BaseButtonDirective, CardComponent } from 'Base';
```

Alias mapping: `"Base"` → `src/app/components/index.ts` (see `tsconfig.json`).

> **Note:** Components that are themselves exported from the `Base` barrel (especially form blocks) should import their dependencies with **relative paths**, not `from 'Base'`, to avoid circular dependency errors (`NG0919`).

---

## Shells vs sidenav

| Need | Use | Tier |
| --- | --- | --- |
| App chrome (sidebar + topbar + content) | `base-app-shell` (`layout-app-shell`) + `SidebarService` | Free |
| Grouped sidebar links (labels fade in the mini rail) | `base-app-shell-nav-section` + `base-app-shell-nav-item` | Free |
| In-page section nav (Settings, docs TOC) | `base-sidenav` | Free |
| Unified product chrome (page + dashboard modes) | `base-shell` | Pro |
| Nested / multi-level nav | `mega-menu`, `tree` | Pro |
| Full opinionated dashboard page | `layout-dashboard` | Pro |

Do **not** use `base-sidenav` as the primary application shell — it is for section navigation inside a page body.

More detail: [docs/shells-vs-sidenav.md](docs/shells-vs-sidenav.md).

---

## Working with Base UI

This project already has Base UI initialized. Components live under `src/app/components/` (you own the source).

```bash
# List free + pro catalog
npx base-ui-cli list

# Add a component
npx base-ui-cli add dialog -y

# Update installed components from the registry
npx base-ui-cli update -y

# Diff local vs upstream
npx base-ui-cli diff
```

Docs & pricing: [base-ui.net](https://base-ui.net) · [Pricing](https://base-ui.net/pricing)

---

## Auth notes

- Auth is **mocked** — no backend.
- Session key: `localStorage` → `base-ui-dashboard-auth`
- `authGuard` protects `/app/*`; `guestGuard` keeps signed-in users off auth pages

---

## License

Dashboard template code in this repository is available for use in your projects.

Base UI component source copied by the CLI is licensed under the [Base UI license](https://github.com/lussos/base-theme/blob/main/LICENSE.md): free-tier components are free for unlimited projects; Pro components require a license. Do not redistribute fetched component source as a standalone library or kit.
