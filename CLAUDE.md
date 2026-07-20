# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173/)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run oxlint

## Tech Stack

- React 19 + Vite (JavaScript, not TypeScript)
- Plain CSS (`src/App.css`, `src/index.css`), no CSS-in-JS or utility framework
- Task state persists to `localStorage` (see `src/components/TaskBoard.jsx`) — there is no backend
- Linting via oxlint (`.oxlintrc.json`), not ESLint

## Component Conventions

- One component per file under `src/components/`, filename and export both in `PascalCase` (e.g. `TaskBoard.jsx`, `TaskItem.jsx`).
- CSS class names follow BEM (`block__element--modifier`), scoped by component/feature: e.g. `task-board`, `task-board__title`, `task-item`, `task-item--completed`. Match this pattern for new UI pieces rather than introducing a different naming style.
- State and persistence logic (e.g. `localStorage` read/write) lives in the container component (`TaskBoard`); presentational children (`TaskItem`) receive data and callbacks via props only.

## Deployment

- Deployed to GitHub Pages at https://arata5991.github.io/task-board/
- `.github/workflows/deploy.yml` builds and deploys automatically on every push to `main`
- `vite.config.js` sets `base: '/task-board/'` to match the Pages project site path — update this if the repo is ever renamed

## Git Workflow Rules

- **Push after every code change.** Whenever code in this repository is modified, commit the change and push it to GitHub immediately — do not batch multiple unrelated changes into a single push.
- Each commit should correspond to one logical change, with a clear commit message describing the change.
- Do not leave changes committed locally without pushing them to the remote.
