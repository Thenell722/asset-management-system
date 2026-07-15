# Warely — Inventory Management (Frontend)

A Next.js (App Router) frontend for an inventory management system, covering:

- **Dashboard** — KPI stat cards, an inbound/outbound stock trend chart, a category
  breakdown donut, and a recent stock-movement feed.
- **User management** — searchable directory with add / edit / delete (local state).
- **Role management** — role cards with permission tags, add / edit / delete (local state).

Layout is a classic sidebar + top toolbar shell, responsive down to mobile
(sidebar becomes a slide-over behind a hamburger menu).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.js         Root layout, loads fonts, wraps everything in <Shell>
  page.js            Dashboard route ("/")
  users/page.js      User management route
  roles/page.js      Role management route
  globals.css        Tailwind + the "manifest tag" signature card styles
components/
  Shell.js           Sidebar + Topbar + content composition (mobile nav state)
  Sidebar.js         Left nav (Dashboard / Users / Roles)
  Topbar.js          Breadcrumb, search, notifications, account
  Card.js            Reusable panel wrapper
  StatTag.js         Signature perforated "manifest tag" stat card
  StatusPill.js       Active / Suspended badge
  Modal.js           Generic dialog used by both Add/Edit forms
  charts/            Recharts wrappers (trend area chart, category donut)
  users/             UserTable, UserModal
  roles/             RoleTable, RoleModal
lib/
  mockData.js        Stand-in data — swap for real API calls when wiring a backend
```

## Wiring up a real backend

Everything currently reads from `lib/mockData.js` and mutates local React state
(`useState`) in `app/users/page.js` and `app/roles/page.js`. To connect a real
API:

1. Replace the imports from `mockData` with `fetch` calls (or a data-fetching
   library like SWR/React Query) inside the page components, or convert the
   pages to Server Components that fetch data and pass it down.
2. Replace `handleSave` / `handleDelete` in each page with calls to your API
   (`POST /users`, `PATCH /users/:id`, `DELETE /users/:id`, etc.), then update
   local state from the response (or re-fetch).
3. The `roles` prop passed into `UserModal` currently comes from
   `initialRoles` — point it at your live roles list instead.

## Design notes

- Palette: ink navy sidebar, cool paper background, amber accent (signage/hazard-tape
  reference), teal/rust/alert for status and chart series.
- Type: Barlow Condensed for display headings, Inter for body/UI text, IBM Plex
  Mono for figures, SKUs, and timestamps (manifest/ticket feel).
- Signature element: the dashboard stat cards ("manifest tags") are styled like
  a perforated shipping tag, tying the UI back to the warehouse domain.
