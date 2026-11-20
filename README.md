# my-projects

A personal site / project hub built with Next.js (App Router), live at
<https://lcytot.subani.cc>. `/` introduces me and lists every project; clicking a
project card opens a dialog with its description, tech stack, GitHub link and a
link to the live app. All routes share one global shell — nav, background,
theme, and language.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it.

## Routes

| Route | What it is |
|---|---|
| `/` | Intro + project directory (cards from `lib/projects.ts`) |
| `/profile` | Personal introduction / resume, with a "download resume" button that prints a one-page PDF (`app/profile/_components/PrintableResume.tsx`) |
| `/accounting` | Redirects to the accounting app (URL from the `TRACK_MY_EXPENSE` env var; repo `subanote`) |
| `/moto-license` | Redirects to <https://scooter.subani.cc> (repo `taiwan-scooter-license-notifier`) |
| `/piyan` | Standalone static HTML flashcards (`public/piyan.html`, served via a rewrite in `next.config.ts`) |

## Tech Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS (v4) for styling
- React Context for shared global state — no external state library

## Shared Context

Every route under `app/*` automatically gets:

- **Theme** (`context/theme-context.tsx`) — light/dark, persisted to
  `localStorage`, falls back to `prefers-color-scheme`. Applied via a
  `dark` class on `<html>`.
- **Language** (`context/lang-context.tsx`) — `en` / `zh-TW`, persisted to
  `localStorage`, with a simple `t(key)` translation helper backed by
  `lib/dictionaries.ts`.

Both can be set on first load via query params, e.g.
`http://localhost:3000/?theme=dark&lang=zh-TW` — this also becomes the new
persisted default for that browser.

## Adding a New Project

1. Add an entry to `lib/projects.ts` — `projects` for public ones
   (`{ key, slug, image?, tech, github? }`), `privateProjects` for ones with no
   public URL — and the matching text under `projects.<key>` in
   `lib/dictionaries.ts` (both languages). This is what makes it show up on `/`.
2. If it has a `slug`, create `app/<slug>/page.tsx` — usually just a
   `redirect()` to the live app, or a real page.
3. Optional: put an app icon in `public/projects/` and set `image`.
4. Use `useTheme()` / `useLang()` from context instead of re-declaring
   per-project state.

## Commands

```bash
npm run dev       # local dev server
npm run build     # production build (check this passes before shipping)
npm run lint      # lint
```

## Deployment

Self-hosted on a Mac mini behind Cloudflare Tunnel (port 8100). Pushing to
`main` deploys automatically within ~5 minutes (`npm ci` → `npm run build` →
`next start`). Production env vars (e.g. `TRACK_MY_EXPENSE`) live in
`.env.production` on the server, not in git.

See `CLAUDE.md` for the full project conventions.
