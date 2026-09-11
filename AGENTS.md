# Digital Alchemy project instructions

## Tooling

- Use pnpm exclusively. Do not create npm or Yarn lockfiles.
- Use the Node version in `.node-version` through fnm: `fnm use`.
- If Python is introduced, use the version in `.python-version` and manage environments and dependencies with uv. Do not use bare `pip` or commit a virtual environment.
- Run `pnpm check` before handing off a completed implementation.

## Source boundaries

- Reusable React UI primitives live in `src/ui/react` and are exported from its `index.ts`.
- Composed product components built from multiple primitives live in `src/components`.
- Framework-neutral scales and rules live in `src/foundation`.
- Shared helpers live in `src/utils`; avoid a generic dumping ground.
- Keep `tokens.css`, `tailwind.css`, `global.css`, and `animations.css` responsibilities separate.

## Theme invariants

- Components use semantic tokens. Raw metals and gemstones are allowed only in theme definitions and explicit palette specimens.
- Raw light/dark material values live in `src/styles/tokens.css`.
- Do not introduce per-mode semantic mappings. The semantic assignment is shared; raw materials adapt by mode.
- The default surfaces are diamond background, graphite pearl card, and obsidian muted, popover, disabled, and indicator-track surfaces.
- Metal naming: silver is the main foreground, quicksilver is card/strong text, titanium is used for borders and inputs, and platinum is used for muted/disabled text.
- Popover foreground is gold. Metadata is topaz.
- Digital Alchemy ratings are, from lowest to highest: ruby, topaz, emerald, sapphire, amethyst.
- Never substitute a traffic-light rating scale or duplicate the rating ordering. Import it from `src/foundation/rating-scale.ts`.
- Unknown or unavailable ratings use a neutral token, never ruby.
- Preserve reduced-motion behavior and never use color as the only carrier of meaning.

## Project conventions

- Responsive styles are mobile-first. Use only the named `tablet`, `desktop`, and `wide` breakpoints.
- Use display, body, and mono font roles. Do not hard-code a preset font inside reusable components.
- Use control, surface, and overlay radius roles instead of arbitrary component radii.
- Keep SEO route metadata in `src/config/seo.ts`; update it whenever a public showcase route changes.
- Do not change the developer signature without explicit instruction.
