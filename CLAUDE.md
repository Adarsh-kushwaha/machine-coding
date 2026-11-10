# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured — no test files, no test script. Do not assume a way to run tests.

## What this repo is

A personal practice collection of self-contained React "machine coding" interview problems (autocomplete, carousel, kanban, virtual list, nested comments, OTP input, tic-tac-toe, etc.). Each problem is an isolated demo reachable at its own route. Problems do not share state or logic with each other — treat each as a standalone mini-app.

## Architecture

- Entry: `src/main.jsx` wraps `<App/>` in `BrowserRouter`. `src/App.jsx` wraps everything in `ToastProvider` and declares one `<Route>` per problem.
- **Two-layer pattern per problem:**
  - `src/pages/<Name>Page.jsx` — thin route wrapper; renders the component, sometimes supplies demo data/props.
  - `src/components/<feature>/` — the actual implementation plus a co-located `<feature>.css` (CSS is plain, one file per component, imported directly).
- Adding a new problem = create the component folder, create a page wrapper, add one `<Route>` in `App.jsx`. `Home.jsx` is currently just a heading and does **not** list/link the routes, so navigate by typing the path (e.g. `/kanban`).

## Conventions to match

- Components are mostly named exports (`export const Kanban = ...`); a few pages are default exports (`Home`, `Toast`, `TicTacToe`). Match the surrounding file — imports in `App.jsx` are the source of truth for which style each uses.
- Local state only: React `useState`/`useContext`. `zustand` is in `package.json` but **not used anywhere** — don't reach for it unless deliberately introducing global state.
- Cross-cutting state uses React Context. The one live example is toast: `ToastProvider` (`components/toast/notificationProvider.jsx`) exposes `addNotification` / `removeNotification` / `toasts` via `ToastContext`, consumed through the `use-toast.js` hook.
- Mostly `.jsx`/JavaScript. A couple of pages are `.tsx` (`ToDoPage.tsx`, `VirtualListPage.tsx`) but there is **no `tsconfig.json`** and no type-aware lint — TypeScript here is incidental, not a project standard.
- ESLint: unused vars error unless the name matches `^[A-Z_]` (see `eslint.config.js`).
