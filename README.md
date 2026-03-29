This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

This project queries Supabase **only from the server** (no browser SDK). The server client
in `src/utils/supabase/server.ts` uses the **service role** key so API routes can read
data without per-user auth. Add a `.env.local` file at the project root:

```bash
# .env.local
SUPABASE_PROJECT_URL="https://<project-ref>.supabase.co"
SUPABASE_SERVICE_ROLE="<your-service-role-key>"
# Used only by `pnpm run sb:gen` (TypeScript types from the hosted project)
SUPABASE_PROJECT_ID="<project-ref>"
```

The project ref is the same substring that appears in the dashboard URL and in your
project URL (`https://<project-ref>.supabase.co`).

Copy `env.example` to `.env.local` and fill in real values:

```bash
cp env.example .env.local
```

Run `pnpm dev` (or `npm run dev`) and visit `/api/ping` to verify the connection.

## Generating TypeScript types (`src/types/database.ts`)

After the database schema changes, regenerate types so `Database` stays in sync with
PostgREST.

**Prerequisites:** the `supabase` CLI is a dev dependency. You must be logged in once
so the CLI can talk to the Supabase API (`gen types` uses your CLI session, not the
service role key).

```bash
pnpm run sb:login   # opens the browser once; stores a token for the CLI
pnpm run sb:gen     # requires SUPABASE_PROJECT_ID in .env.local
```

That runs `supabase gen types --lang typescript --project-id <project-ref>` and
overwrites **`src/types/database.ts`** (the `Database` type used by
`src/utils/supabase/server.ts`).

**Without the CLI:** if you use the Supabase MCP in Cursor, the `generate_typescript_types`
tool accepts your `project_id` and returns the same TypeScript; save that output as
`src/types/database.ts`.

Other Supabase CLI shortcuts are in `package.json` (`sb:start`, `sb:db:pull`, etc.) for
when you adopt local Docker workflows; this repo does not ship a `supabase/` config
directory yet, so type generation is remote-project based.
