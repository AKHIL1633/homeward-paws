<!-- Keep this summary aligned with .21st/design.json. -->
# Adopt a Buddy design context

## Project

- Product: India-first pet adoption marketplace
- Stack: Next.js, React, TypeScript, CSS, GSAP, Howler
- Direction: tactile neighbourhood storybook with honest photography
- Color mode: warm light
- Density: editorial and spacious

## Sources

- Machine-readable tokens and constraints: `.21st/design.json`
- Human-readable system: `docs/design/system.md`
- Motion contract: `docs/design/motion.md`
- Asset ledger: `docs/design/assets.md`

## Constraints

- Keep real pet data and adoption actions clear.
- Use generated art only for editorial storytelling.
- Preserve complete static states for reduced motion.
- Start sound off and load it only after direct interaction.
- Avoid generic gradients, glass cards, and decorative motion without narrative purpose.

## Decisions

- Use one cinematic pinned chapter instead of pinning every section.
- Prefer authored SVG and compressed raster layers over runtime 3D.
- Use GSAP timelines for the emotional story and CSS for routine interface states.
