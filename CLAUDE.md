# CLAUDE.md

This file guides Claude Code when working in this repository.

## Project Overview

This is a **Next.js (App Router)** project that acts as a personal site / hub, live at https://lcytot.subani.cc.

- `/` — Home page. A short intro, a link to `/profile`, and a **directory of every project** (cards rendered from `lib/projects.ts`; clicking one opens `app/_components/ProjectDialog.tsx` with description, tech, GitHub and live link). Private projects (no public URL) are listed too.
- `/<slug>` — Each public project has its own route. Most are thin `redirect()` pages pointing at the live app on its own subdomain (`/accounting` → `TRACK_MY_EXPENSE` env URL, `/moto-license` → https://scooter.subani.cc).
- `/profile` — Personal introduction / resume, with a print-to-PDF resume (`app/profile/_components/PrintableResume.tsx`, `@media print` rules in `globals.css`).
- `/piyan` — Standalone static HTML (`public/piyan.html`) served via a rewrite in `next.config.ts`. Use this pattern for self-contained HTML projects.
- All routes share the same global shell: `Nav`, `Background`, `theme` (light/dark) and `lang` (i18n locale).

## Tech Stack

- Next.js 16 (App Router, TypeScript) — APIs differ from older versions; see `AGENTS.md`
- Tailwind CSS for styling (mobile-first, use `sm: md: lg:` breakpoints — do not write separate mobile/desktop components)
- React Context for global state (`theme`, `lang`) — no external state library needed unless the project grows significantly
- Keep dependencies minimal; ask before adding new libraries for things Context/Tailwind can already handle

## Folder Structure

```
app/
  layout.tsx              # Root layout — <Providers>, <Background />, <Nav /> above {children}
  page.tsx                # "/" — intro + project directory
  providers.tsx           # Client component: ThemeProvider + LangProvider wrapper
  globals.css             # Tailwind + @media print rules for the PDF resume
  icon.svg, apple-icon.png
  _components/
    ProjectDialog.tsx     # Project detail dialog + ProjectIcon
  profile/
    page.tsx              # "/profile" — resume page
    _components/PrintableResume.tsx   # white one-page PDF version, shown only when printing
  accounting/page.tsx     # redirect → accounting app
  moto-license/page.tsx   # redirect → scooter.subani.cc

components/
  Nav.tsx                 # Top nav — logo (links to /), theme toggle, lang switch
  Logo.tsx
  Background.tsx

context/
  theme-context.tsx       # ThemeContext + useTheme()
  lang-context.tsx        # LangContext + useLang() + t()

lib/
  projects.ts             # Project registry (projects + privateProjects) + SITE_REPO_URL
  dictionaries.ts         # en / zh-TW text, incl. profile content and projects.<key>
  links.ts                # External links (GitHub profile)

public/
  projects/               # Project app icons
  piyan.html              # Static flashcards served at /piyan
```

## Shared Context Requirements

### Theme (`context/theme-context.tsx`)
- Values: `"light" | "dark"`
- Expose: `theme`, `setTheme(theme)`, `toggleTheme()`
- Persist choice to `localStorage`; on load, a `?theme=` query param wins (and is persisted), then the saved value, otherwise `prefers-color-scheme`
- Apply theme by toggling a `dark` class on `<html>` (so Tailwind's `dark:` variant works project-wide)

### Language (`context/lang-context.tsx`)
- Values: start with `"en" | "zh-TW"` (extendable later)
- Expose: `lang`, `setLang(lang)`
- Persist choice to `localStorage`; a `?lang=` query param on load overrides and is persisted
- Simple `t(key)` translation helper is fine for now (a small dictionary object per language); don't over-engineer with a full i18n library unless asked

### Wiring
- `Providers` (in `app/providers.tsx`, marked `"use client"`) wraps `<ThemeProvider><LangProvider>{children}</LangProvider></ThemeProvider>`
- `app/layout.tsx` (server component) imports `Providers` and wraps `{children}` with it
- Every route/project under `app/*` automatically gets access to `useTheme()` and `useLang()` without re-declaring context — do not create per-project theme/lang state

## Nav (shared across every project)

- `components/Nav.tsx` is rendered **once, in `app/layout.tsx`**, above `{children}` — not re-imported per project. This makes it appear on every route automatically.
- Contains: site logo/name (links back to `/`), theme toggle, language switch. The project list lives on the `/` directory page, not in the Nav.
- Responsive: it has only a few controls, so it stays a single row at every width (no hamburger menu). Keep it that way unless links are added.
- Uses `useTheme()` / `useLang()` from context — must be a client component (or contain a small client sub-component for the interactive parts).

## Project Registry (for the home directory page)

- `lib/projects.ts` is the single source of truth: `projects` (public, each with a `slug`) and `privateProjects` (no public URL). Fields: `{ key, slug?, image?, tech, github? }`.
- Display text lives in `lib/dictionaries.ts` under `projects.<key>` (`title`, `description`, `detail`, `platform`, `signup`) — add both `en` and `zh-TW`.
- When adding a public project: registry entry + dictionary text + `app/<slug>/page.tsx` (usually a `redirect()` to the live app). Optional icon in `public/projects/`.

## Profile / Resume

- Content (experience, education, certificates, skills…) lives in `lib/dictionaries.ts` per language; `app/profile/page.tsx` renders it.
- "Download resume" calls `window.print()`; `PrintableResume` (id `print-resume`) is the only thing visible under `@media print`. Keep it to **one page with ≥12pt text** when editing content.

## Conventions

- TypeScript everywhere (`.tsx`/`.ts`), strict mode on
- Functional components only
- Prefer server components by default; only mark `"use client"` where you actually need hooks/state/browser APIs (context providers, theme toggle button, etc.)
- Co-locate small project-specific components inside that project's folder (e.g. `app/profile/_components/`); only promote to `components/` if reused across projects
- Keep each project route independently readable — someone should be able to open `app/profile/page.tsx` and understand it without hunting through unrelated project folders

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build (check this passes before considering a task done)
npm run lint      # lint
```

## Deployment

- Self-hosted on a Mac mini behind Cloudflare Tunnel (`127.0.0.1:8100` → https://lcytot.subani.cc). Not Vercel.
- Pushing to `main` deploys automatically within ~5 minutes (`npm ci` → `npm run build` → `next start`); a failed build keeps the old version live.
- Production env vars (`TRACK_MY_EXPENSE`) live in `.env.production` on the server, not in git. `NEXT_PUBLIC_*` vars are baked in at build time.
- Preview UI changes locally before pushing — `main` is production.
- Commit messages: `ADD: ...` / `UPDATE: ...`.
