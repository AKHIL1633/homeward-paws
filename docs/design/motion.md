# Motion system

Motion expresses emotion and sequence. GSAP owns all coordinated animation.

## The Walk Home

The desktop story is one ScrollTrigger timeline pinned for `180%` additional scroll distance. Its labels are conceptual rather than time-based:

1. **Trust:** the drawn route appears and the pair begins moving.
2. **Rhythm:** human and animal translate together while limbs alternate.
3. **Play:** the ball follows a single MotionPath arc.
4. **Belonging:** the home appears and the background quiets.

The animation must scrub and reverse without spawning independent loops. ScrollTrigger belongs on the parent timeline. Character transforms, SVG stroke progress, opacity, and scale are the main animated properties.

## Supporting movement

- Hero: one load-in stagger and one framed-art scale.
- Listing cards: grouped viewport entrances and restrained image hover.
- Long content: grouped reveal, maximum 750ms.
- Product forms and dashboard: CSS state transitions only.

## Accessibility and reliability

- At `prefers-reduced-motion: reduce`, render final scene states in document flow.
- Below 901px, remove pinning and present all three story captions.
- Essential content starts visible in the DOM; animation may enhance it but must not own it.
- Scope GSAP with `useGSAP`, revert media contexts on unmount, and use selectors only inside the component root.
- Sound starts off and requires a button press. Pause when the document is hidden and unload on unmount.
