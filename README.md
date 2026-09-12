# Digital Alchemy

Digital Alchemy is Mehmet Yıldız's personal theme, frontend-defaults, and UI reference
repository. It is currently a TypeScript-first React/Vite showcase and visual laboratory—not a
published package and not an API or backend service.

The goal is to keep the decisions that should be repeatable across Memo projects and client work
in one place, so a new project or coding agent can start from a clear reference instead of
reconstructing the same theme and tooling choices every time.

## Current status

- React 19, TypeScript, Vite, Tailwind CSS v4, and pnpm.
- Showcase routes for the overview, foundations, UI primitives, and composed patterns.
- A sticky theme rail for changing semantic tokens, font set, radius, motion, and light/dark mode.
- Preferences persisted in the browser so palette decisions can be compared across pages.
- Semantic components: primitives consume roles such as `bg-card` and `text-muted-foreground`; raw
  metals and gemstones stay in the theme layer.
- The Digital Alchemy rating order is fixed from lowest to highest as ruby, topaz, emerald, sapphire,
  and amethyst.
- The developer signature is available as an explicit runtime helper and is not changed by the
  showcase.
- CI checks formatting, linting, types, tests, and the production build.

The package-style `exports` field in `package.json` describes possible local entry points. Because
the project is marked `private`, those entries are not a published package contract.

## Run the showcase

```bash
fnm use
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:5173`.

Useful commands:

```bash
pnpm check          # format check, lint, typecheck, tests, and build
pnpm dev            # local Vite server
pnpm build          # production build
pnpm format         # write Oxfmt changes
pnpm lint           # run Oxlint
```

Use the Node version in `.node-version`. Use pnpm only; do not add npm or Yarn lockfiles. If a
future project needs Python, use the pinned `.python-version` with uv.

## GitHub Pages

The organization repository is configured as a GitHub Pages project site:

`https://mehmet-yildiz-dev.github.io/alchemy-lab/`

`.github/workflows/deploy-pages.yml` builds with pnpm and deploys only after a push to `main` or a
manual workflow run. The build sets the `/alchemy-lab/` Vite base path, creates a `404.html` SPA
fallback for deep links, and publishes the generated `dist` directory. In the repository settings,
set Pages → Build and deployment → Source to **GitHub Actions**.

The showcase is still a static frontend. GitHub Pages does not provide a backend or API runtime.
Canonical page URLs point to the Pages site, while author attribution points to
[`mehmetyildiz.dev`](https://mehmetyildiz.dev/).

## How to use this repository today

Treat the repository as a reference or a starting template:

1. Inspect the showcase to choose a palette, semantic role, font set, radius, and motion defaults.
2. Copy only the layers a new project needs: usually `src/styles`, selected files from
   `src/foundation`, `src/ui/react`, `src/utils`, and optionally the developer signature.
3. Keep product-specific pages and compositions in the new project's own `src/pages` and
   `src/components` directories.
4. Preserve semantic roles in reusable components. Change a token assignment in the theme rather
   than editing every component when a color decision changes.
5. Give an AI agent this repository, `AGENTS.md`, and this README as the reference context for a
   new project.

The showcase itself is intentionally not the reusable layer. `src/pages`, `ShowcaseShell`, the
theme sidebar, and laboratory specimens demonstrate the system; they are not required in every
application.

## Source boundaries

| Location                    | Responsibility                                                           |
| --------------------------- | ------------------------------------------------------------------------ |
| `src/styles/tokens.css`     | Raw light/dark material values and structural preset variables.          |
| `src/styles/tailwind.css`   | Tailwind v4 setup and semantic utility aliases.                          |
| `src/styles/global.css`     | Browser defaults, typography base, focus, scrollbar, and global helpers. |
| `src/styles/animations.css` | Keyframes, motion utilities, and reduced-motion behavior.                |
| `src/styles/index.css`      | Ordered stylesheet entry point.                                          |
| `src/foundation/`           | Framework-neutral theme definitions and rating rules.                    |
| `src/ui/react/`             | Reusable React UI primitives and their export map.                       |
| `src/components/`           | Composed components built from multiple primitives.                      |
| `src/utils/`                | Small shared helpers with focused responsibilities.                      |
| `src/lib/`                  | Runtime facilities such as the developer signature.                      |
| `src/pages/`                | Showcase-only route implementations.                                     |
| `src/config/seo.ts`         | Route titles, descriptions, canonical URLs, and social metadata updates. |

The CSS layers are deliberately separate. A new project should be able to copy the style layers
without also copying showcase layout code.

## Project guidance

[`AGENTS.md`](AGENTS.md) is the concise source of truth for project boundaries, semantic-token
invariants, named breakpoints, tooling, SEO ownership, and the developer signature. The source files
and showcase are the live documentation; obsolete planning documents are intentionally not kept in
this repository.

## Reuse later

There is no need to publish a package yet. A private GitHub repository or organization template is
the simplest way to keep defaults together while they are still changing. If two or more real
projects need independent upgrades from the same stable code, extract a small framework-neutral
core and a separate React entry point. At that point, document the package contract separately from
this visual lab.

Until then, this repository's value is its tested decisions, specimens, documentation, and agent
instructions—not a registry version.
