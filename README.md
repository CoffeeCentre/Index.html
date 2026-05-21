# Coffee Centre London

Marketing site for Coffee Centre London — SCA & CQI approved coffee training.

## Stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with the brand colour palette
  (`charcoal`, `gold`, `cream`, `brand.blue`) and Playfair Display + Source
  Sans 3 fonts
- [shadcn/ui](https://ui.shadcn.com/) primitives (`Button`, `Accordion`) plus
  Radix UI under the hood — `components.json` is wired so you can
  `npx shadcn add <component>` to pull more
- [React Router](https://reactrouter.com/) for page navigation

## Getting started

```bash
npm install        # install dependencies
npm run dev        # Vite dev server with hot reload at http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # preview the production build
```

## Project layout

```
src/
  components/
    icons.tsx          shared inline SVG icons
    section.tsx        Section / SectionHeader / PageHero helpers
    layout/            shared header, footer, and routed layout shell
    ui/                shadcn primitives (button, accordion)
  lib/utils.ts         `cn()` helper
  pages/               one file per route (Home, About, Courses, …)
  App.tsx              React Router routes
  main.tsx             entry point
  index.css            Tailwind directives + base typography
```

The original single-file mockup is kept as `COFFEECENTREWEB.html` for
reference.
