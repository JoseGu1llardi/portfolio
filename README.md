# Portfolio – José Wellington

Personal portfolio built with **Next.js 16**, **React 19**, **TailwindCSS 4**, and customized Radix/UI components.

## Overview
- Hero card with name/handle and primary tech stack.
- Weather card with live time (São Paulo TZ) and mock forecast.
- Bento grid linking to internal pages and social profiles.
- GitHub activity card (placeholder `yourusername`).
- Newsletter card UI for email capture.

## Stack
- Next.js 16 (app router) + TypeScript
- TailwindCSS 4 + `tailwind-merge`
- Radix UI + `class-variance-authority`
- Icons: `lucide-react`
- Forms: `react-hook-form` + `zod`

## Structure at a glance
- `app/` – routes and global layout.
- `components/` – sections (hero, weather, bento) and reusable UI in `components/ui/`.
- `lib/utils.ts` – helpers (e.g., `cn`).
- `public/` – icons and assets.

## Scripts
- `pnpm dev` – development server.
- `pnpm build` – production build.
- `pnpm start` – serve the build.
- `pnpm lint` – linting.

## Run locally
```bash
pnpm install
pnpm dev
```
Visit http://localhost:3000.

## Environment variables
- Optional: `NEXT_PUBLIC_GITHUB_TOKEN` to raise GitHub API rate limits for the activity card. Generate a classic token with public scopes only and place it in `.env.local` (already git-ignored).

## Customize before publishing
- `components/hero-section.tsx`: update name, handle, and `techStack`.
- `components/bento-grid.tsx`: change section `href`s and social URLs.
- `components/github-activity-card.tsx`: set your `username`.
- `components/weather-card.tsx`: adjust timezone/city and real data if desired.
- Favicons in `public/` (`icon-*.png`, `icon.svg`, `apple-icon.png`).

## Deploy
Ready for Vercel (includes `@vercel/analytics/next`). Connect the repo and run `pnpm build`; add env vars if you introduce them.
