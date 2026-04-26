# Project Overview

This repository is a `Next.js 15` application using the App Router with `React 19` and `TypeScript`.
It serves a public-facing website for Texas defense data, with a mix of static content pages, data pages,
map-based UI, and API routes that read from Supabase.

## Architecture

- `src/app`: App Router pages, layouts, and route handlers.
- `src/components`: Reusable UI building blocks such as cards, sections, navigation, and the large `TexasMap` component.
- `src/theme`: MUI theme setup and shared design tokens.
- `src/utils/supabase`: Supabase client helpers for server and browser contexts.
- `src/types/database.ts`: Generated database types used to keep Supabase queries typed.

The main data flow is:

`UI page/component -> Next.js route handler in src/app/api -> Supabase -> JSON response -> rendered UI`

## Tech Stack

- `Next.js 15` with the App Router
- `React 19`
- `TypeScript`
- `npm` as the current package manager
- `Material UI 7` with `Emotion` for styling
- `MUI X Charts` for data visualizations
- `Supabase` for database access
- `Leaflet`, `react-leaflet`, and `react19-simple-maps` for map experiences

## Notes

- Global layout and providers live in `src/app/layout.tsx`.
- Styling is primarily theme-driven through MUI rather than custom CSS-heavy patterns.
- Supabase access is typed and centered around helpers in `src/utils/supabase`.
- `package-lock.json` is the source-of-truth lockfile for installs and deployments.
