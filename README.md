# Campus Guide — Client

React 19 single-page application for the university Campus Guide. Provides indoor navigation, timetable lookup, and classroom search for VSU students.

## Tech Stack

| Category      | Library                                         |
| ------------- | ----------------------------------------------- |
| Framework     | React 19 + TypeScript                           |
| Build tool    | Vite 7                                          |
| Routing       | React Router v7                                 |
| Server state  | TanStack React Query v5                         |
| HTTP client   | Axios                                           |
| Forms         | React Hook Form + Zod                           |
| UI primitives | shadcn/ui (Radix UI, New York style)            |
| Styling       | Tailwind CSS v4                                 |
| Icons         | Lucide React                                    |
| Floor maps    | SVG via vite-plugin-svgr + react-zoom-pan-pinch |
| Toasts        | Sonner                                          |
| Input masking | Maskito                                         |

## Project Structure

```
src/
├── assets/          # SVG floor maps (floor-1.svg … floor-7.svg)
├── components/
│   ├── ui/          # shadcn/ui primitives
│   └── ...          # App-specific components (layout, floor map, cards, filters)
├── hooks/           # useAuth, usePersistedState, useDebounce, useTimetable, useGreeting
├── pages/           # One file per route/screen
├── schemas/         # Zod validation schemas for forms
└── services/
    ├── fetcher.ts   # Axios instance (reads VITE_BASE_URL)
    └── <domain>/
        ├── api/     # API call functions
        ├── query/   # React Query hooks
        └── types.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- The [server](../server) running locally (default: `http://localhost:7070`)

### Install

```bash
npm install
```

### Environment

Create `client/.env`:

```env
VITE_BASE_URL=http://localhost:7070
```

### Run

```bash
npm run dev       # Dev server with HMR on http://localhost:5173
npm run build     # Type-check + production bundle → dist/
npm run preview   # Serve the production build locally
npm run lint      # ESLint
npm run format    # Prettier
```

The Vite dev server proxies all `/api/*` requests to the backend (`vite.config.ts`), so no CORS setup is needed during development.

## Features

- **Indoor navigation** — interactive floor maps with zoom/pan, path highlighting across floors
- **Timetable** — search lessons by group, lecturer, or classroom
- **Classroom search** — filter and locate rooms by number, type, or equipment
- **Authentication** — JWT-based login/register with password reset via email
- **Profile** — avatar upload (Cloudinary), account settings
- **PWA** — installable via `vite-plugin-pwa`
