# Bomb Rolls & Bowls - Digital Menu

## Overview

This is a **static digital menu website** for "Bomb Rolls & Bowls," an Asian fusion restaurant. Customers scan a QR code at their table and browse the menu on their phone while waiting for the waiter. The app does **not** process orders — it's purely for browsing dishes, reading descriptions, viewing spice levels, and checking allergen info so customers can decide what to order before the waiter arrives.

The app is a full-stack TypeScript project with a React frontend (Vite), Express backend, PostgreSQL database (via Drizzle ORM), and shadcn/ui component library. Despite having a cart/favorites feature in the UI (stored in localStorage), there is no checkout or payment flow — the cart is informational only.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (`client/`)
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: React Context API for cart and favorites (persisted to localStorage), TanStack React Query for server data
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui (new-york style) component library
- **Animations**: Framer Motion for page transitions, card flips, scroll effects, and micro-interactions
- **Icons**: Lucide React
- **Fonts**: Poppins (headings), Inter (body), Bangers (accent/logo) via Google Fonts

### Key Pages
- `/` — Splash/landing page with brand logo, red gradient background, and "Explore Menu" CTA
- `/menu-selection` — Veg vs Non-Veg preference selection screen
- `/menu` — Full menu with category filters, search, veg/non-veg toggle, and card grid
- `/favorites` — Saved favorite items (localStorage-backed)

### Backend (`server/`)
- **Framework**: Express 5 (TypeScript, ESM)
- **Database**: PostgreSQL with Drizzle ORM
- **API**: REST endpoints defined in `shared/routes.ts` with Zod validation schemas
  - `GET /api/items` — List items with optional filters (categoryId, isVeg, search, featured)
  - `GET /api/items/:id` — Get single item details
  - `GET /api/categories` — List all categories
- **Seeding**: The server auto-seeds categories and menu items on first run if the database is empty (in `server/routes.ts`)
- **Dev Server**: Vite dev middleware served through Express in development; static files served in production

### Shared Code (`shared/`)
- `schema.ts` — Drizzle table definitions for `categories` and `items` tables, plus Zod insert schemas and TypeScript types
- `routes.ts` — API route definitions with paths, methods, and Zod response schemas (acts as a contract between frontend and backend)

### Database Schema
- **categories**: id, name, slug (unique), description, image
- **items**: id, categoryId (FK → categories), name, description, price (integer, in smallest currency unit), isVeg, image, spiceLevel (0-4), foundation, ingredients (JSONB string array), preparation, chefSecret, isFeatured, nutritionalInfo (JSONB with calories/protein/carbs/fat), allergens (JSONB string array)

### Build System
- Development: `tsx server/index.ts` runs the Express server with Vite middleware for HMR
- Production: `script/build.ts` builds the Vite client to `dist/public` and bundles the server with esbuild to `dist/index.cjs`
- Database migrations: `drizzle-kit push` (schema push, not migration files)

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/` (for static images bundled with Vite)

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used through `pg` Pool + Drizzle ORM.
- **Drizzle ORM** with `drizzle-zod` for schema-to-Zod type generation
- **connect-pg-simple** — Listed as dependency (likely for session storage, though not currently used for auth)

### Key NPM Packages
- **Frontend**: `react`, `wouter`, `@tanstack/react-query`, `framer-motion`, `lucide-react`, full shadcn/ui component set (Radix primitives), `embla-carousel-react`, `recharts`, `vaul` (drawer), `cmdk` (command palette), `react-day-picker`, `input-otp`, `react-resizable-panels`
- **Backend**: `express` v5, `drizzle-orm`, `pg`, `zod`, `nanoid`
- **Build Tools**: `vite`, `@vitejs/plugin-react`, `esbuild`, `tsx`, `tailwindcss`, `postcss`, `autoprefixer`, `drizzle-kit`
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`

### External Services
- **Google Fonts** — Loaded via CDN link in `client/index.html` (Poppins, Inter, Bangers, DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Unsplash** — Used as placeholder image source for menu items without uploaded images (via `source.unsplash.com` URLs in components)
- No authentication, payment processing, or third-party API integrations are currently implemented