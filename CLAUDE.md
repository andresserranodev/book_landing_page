# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Un Andrés Más" - A bilingual (Spanish/English) landing page for a travel memoir about a motorcycle journey from Colombia to Patagonia. Built with React, Express, and PostgreSQL.

## Development Commands

### Running the Application

```bash
npm run dev          # Start development server (client + server on port 5000)
npm run build        # Build for production (client + server bundle)
npm start            # Start production server
npm run check        # TypeScript type checking
```

### Database

```bash
npm run db:push      # Push schema changes to PostgreSQL using Drizzle Kit
```

Database schema is defined in `shared/schema.ts` and managed via Drizzle ORM. Migrations are stored in `./migrations`.

## Architecture

### Monorepo Structure

This is a **monolithic full-stack application** with client, server, and shared code in a single repository:

```
client/          # React SPA (Vite)
├── src/
│   ├── components/  # React components
│   ├── hooks/       # Custom React hooks
│   ├── lib/         # Utilities, context, translations
│   └── pages/       # Route pages
server/          # Express API server
├── index.ts     # Server entry point
├── routes.ts    # API routes (prefix with /api)
├── storage.ts   # Drizzle ORM storage interface
├── vite.ts      # Vite dev server integration
└── static.ts    # Static file serving (production)
shared/          # Shared TypeScript types/schemas
└── schema.ts    # Drizzle schema + Zod validation
attached_assets/ # Static assets (images)
```

### Key Architectural Patterns

**1. Dual-Mode Server**

- Development: Express serves API, Vite middleware serves client with HMR
- Production: Express serves both API and pre-built static client
- Single port (5000) serves everything to avoid firewall issues on Replit

**2. Path Aliases**

- `@/*` → `client/src/*` (client-side imports)
- `@shared/*` → `shared/*` (both client and server)
- `@assets/*` → `attached_assets/*` (static assets)
  1
  **3. Bilingual i18n**
- `lib/LanguageContext.tsx` provides global language state
- `lib/translations.ts` contains all UI text in English/Spanish
- Browser language auto-detection on first visit
- Language preference persisted in localStorage
- Access via `const { t, language, setLanguage } = useLanguage()`

**4. Database Layer**

- Drizzle ORM with PostgreSQL
- Schema defined in `shared/schema.ts` (shared between client/server)
- Storage interface in `server/storage.ts` wraps all database operations
- Zod schemas auto-generated from Drizzle schemas for validation

**5. Component Organization**

- `components/ui/` - shadcn/ui primitives (Radix UI + Tailwind)
- `components/*.tsx` - Page-specific sections (Hero, About, PreOrder, etc.)
- Each section component is self-contained with its own logic

**6. Design System**

- **Typography**: Playfair Display (headings) + Inter (body)
- **Colors**: Warm earth tones (see `design_guidelines.md`)
- **Layout**: Mobile-first with `md:` (768px) and `lg:` (1024px) breakpoints
- **Components**: Built on Radix UI primitives via shadcn/ui
- See `design_guidelines.md` for complete design specifications

## Important Implementation Details

### Server Configuration

- Server uses `process.env.PORT || 5000` as the default port
- Server listens on `0.0.0.0` with `reusePort: true` for deployment
- In development, Vite middleware MUST be set up last (after API routes)
- Production mode serves static files from `dist/public`

### Build Process

- `script/build.ts` builds both client (Vite) and server (esbuild)
- Server is bundled to single file (`dist/index.cjs`) with selective dependency bundling
- Allowlist in `build.ts` controls which deps are bundled (reduces cold start time)
- Client output goes to `dist/public`

### API Routes

- Prefix all API routes with `/api` in `server/routes.ts`
- Use `storage` object for database operations (e.g., `storage.insertUser()`)
- Error handling middleware catches all errors and returns JSON

### State Management

- React Query for server state (`@tanstack/react-query`)
- React Context for global UI state (language, theme)
- Local state for component-specific UI

### Styling

- Tailwind CSS with custom config in `tailwind.config.ts`
- PostCSS for processing (config in `postcss.config.js`)
- shadcn/ui configuration in `components.json`
- Tailwind Animate + Framer Motion for animations

### Routing

- Client-side: Wouter (lightweight React router)
- Server-side: Express
- Single Page App with client-side routing, server handles all routes for SPA

## Working with Translations

To add new translatable text:

1. Add key to `Translations` interface in `lib/translations.ts`
2. Add values for both `en` and `es` in the `translations` object
3. Use in components: `const { t } = useLanguage()` then `t.nav.aboutBook`

Current translation sections: `nav`, `hero`, `aboutBook`, `aboutAuthor`, `preorder`, `footer`

## Database Workflow

1. Modify schema in `shared/schema.ts` (Drizzle tables + Zod schemas)
2. Run `npm run db:push` to apply changes to PostgreSQL
3. Update `server/storage.ts` to add/modify data access methods
4. Use storage interface in routes: `storage.getUserByUsername(username)`

Drizzle config is in `drizzle.config.ts` - requires `DATABASE_URL` env var.

## Constants and Configuration

Key configuration lives in `client/src/lib/constants.ts`:

- `SITE_CONFIG` - Site metadata (title, email)
- `SOCIAL_LINKS` - Social media links (Instagram, Facebook, X)
- `NAV_SECTIONS` - Navigation menu configuration
- `JOURNEY_STATS` - Journey statistics per language

Update these constants instead of hardcoding values in components.
