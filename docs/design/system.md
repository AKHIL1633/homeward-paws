# Visual system

## Character

The site should feel like a well-loved Indian picture book printed with modern editorial craft: warm paper, confident primary colour, imperfect shapes, tangible shadows, and intimate everyday scenes. It is bright without becoming childish and expressive without weakening trust.

## Tokens

| Role | Value | Use |
|---|---:|---|
| Paper | `#F8F0DC` | Main canvas |
| Bright paper | `#FFFAF0` | Cards and forms |
| Ink | `#172C55` | Text, outlines, hard shadows |
| Cobalt | `#154A91` | Primary actions and links |
| Tomato | `#D94B39` | Emotional emphasis and active marks |
| Marigold | `#F4BD2E` | Optimism, highlights, focus contrast |
| Leaf | `#2E7352` | Availability, trust, sound state |

Fraunces carries editorial headlines. DM Sans carries navigation, body text, labels, forms, and data. Headings use tight tracking and deliberate line breaks; body copy stays below roughly 65 characters per line.

## Composition

- Use asymmetric framed imagery with two or three graphic planes, not floating card collections.
- Use navy outlines and hard offset shadows to unify photography, generated art, and controls.
- Use numbered chapter labels only when the page is expressing a real sequence.
- Prefer one dominant image or action per viewport.
- Keep narrative copy brief; keep practical pet and form information complete.

## Components

- Primary buttons: cobalt surface, navy outline, small hard shadow, minimum 44px target.
- Secondary actions: direct underlined text or warm-paper button.
- Pet cards: real photo, visible availability, name/location/fee, diagonal action marker.
- Forms: bright-paper controls with explicit labels, navy focus, and red error surface.
- Empty states: one vector icon, direct explanation, and an actionable next step.

## Responsive behavior

Desktop uses asymmetric two-column compositions. Below 900px, content becomes a single reading flow. Below 640px, remove nonessential navigation copy, eliminate decorative offsets that cause overflow, and maintain 44px interaction targets.
