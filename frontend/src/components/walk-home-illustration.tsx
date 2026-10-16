export function WalkHomeIllustration() {
  return (
    <svg className="walk-illustration" viewBox="0 0 1200 620" role="img" aria-labelledby="walk-title walk-description">
      <title id="walk-title">A person and dog finding their rhythm together</title>
      <desc id="walk-description">An illustrated neighbourhood changes from a first cautious meeting to a walk, a game, and a quiet home.</desc>
      <defs>
        <pattern id="windows" width="46" height="38" patternUnits="userSpaceOnUse"><rect width="18" height="20" x="5" y="6" rx="2" fill="#f4bd2e" opacity=".55" /></pattern>
      </defs>
      <rect className="story-sky" width="1200" height="620" rx="34" fill="#e9f1ff" />
      <circle className="story-sun" cx="1020" cy="118" r="74" fill="#f4bd2e" />
      <path d="M0 420C190 365 314 426 477 398s306-92 475-35 248 27 248 27v230H0Z" fill="#77a865" />
      <path d="M0 492c220-34 405-2 597-30s368-44 603-7v165H0Z" fill="#f3e5c3" />
      <g className="story-buildings" opacity=".82">
        <path d="M39 178h210v252H39z" fill="#154a91" /><path d="M66 204h160v200H66z" fill="url(#windows)" />
        <path d="M943 223h223v201H943z" fill="#d94b39" /><path d="M970 252h168v145H970z" fill="url(#windows)" />
      </g>
      <g className="story-tree" transform="translate(805 188)">
        <path d="M73 237c-5-97 8-151 24-210" stroke="#173b2c" strokeWidth="22" fill="none" />
        <circle cx="94" cy="38" r="62" fill="#2e7352" /><circle cx="45" cy="90" r="54" fill="#438d5f" /><circle cx="122" cy="106" r="65" fill="#2e7352" />
      </g>
      <path id="walk-route" className="walk-route" d="M160 505C330 454 420 512 563 480S790 420 1027 482" fill="none" stroke="#d94b39" strokeWidth="8" strokeLinecap="round" strokeDasharray="16 20" />
      <path id="ball-path" d="M650 457 Q742 220 838 456" fill="none" stroke="transparent" />
      <g className="story-person" transform="translate(330 270)">
        <circle cx="58" cy="52" r="39" fill="#8f512f" />
        <path d="M25 36c8-40 69-43 79 2-22-9-54-11-79-2Z" fill="#172c55" />
        <path d="M26 103c12-20 72-22 84 3l19 151H8Z" fill="#154a91" />
        <path className="person-arm" d="M29 126C2 157-5 200 18 228" fill="none" stroke="#8f512f" strokeWidth="22" strokeLinecap="round" />
        <path className="person-leg person-leg-back" d="M45 252 24 347" fill="none" stroke="#172c55" strokeWidth="29" strokeLinecap="round" />
        <path className="person-leg person-leg-front" d="M94 252 123 347" fill="none" stroke="#172c55" strokeWidth="29" strokeLinecap="round" />
        <path d="m5 350 42-1" stroke="#f8f0dc" strokeWidth="18" strokeLinecap="round" /><path d="m107 350 44 1" stroke="#f8f0dc" strokeWidth="18" strokeLinecap="round" />
      </g>
      <g className="story-dog" transform="translate(520 414)">
        <ellipse cx="76" cy="45" rx="68" ry="43" fill="#d88443" />
        <circle cx="142" cy="25" r="42" fill="#d88443" />
        <path d="m119 3-22-36 42 25ZM158 1l27-32-4 43Z" fill="#a9582d" />
        <path d="M154 36c17 2 30 10 38 23-15 10-34 9-49-2Z" fill="#f8f0dc" />
        <circle cx="154" cy="18" r="5" fill="#172c55" />
        <path className="dog-tail" d="M17 35C-20 13-11-18 8-28" fill="none" stroke="#d88443" strokeWidth="18" strokeLinecap="round" />
        <path className="dog-leg dog-leg-a" d="M44 75 34 126" stroke="#a9582d" strokeWidth="17" strokeLinecap="round" />
        <path className="dog-leg dog-leg-b" d="M93 75 109 126" stroke="#a9582d" strokeWidth="17" strokeLinecap="round" />
        <path d="M121 25c-7 24-3 43 8 59" fill="none" stroke="#d94b39" strokeWidth="8" />
      </g>
      <path className="story-leash" d="M350 474C421 425 474 438 642 465" fill="none" stroke="#d94b39" strokeWidth="6" strokeLinecap="round" />
      <circle className="story-ball" cx="650" cy="457" r="22" fill="#f4bd2e" stroke="#172c55" strokeWidth="5" />
      <g className="story-home" transform="translate(935 290)" opacity="0">
        <path d="M0 98 107 12l109 86v155H0Z" fill="#f8f0dc" stroke="#172c55" strokeWidth="8" />
        <path d="m-12 104 120-96 121 96" fill="none" stroke="#d94b39" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="78" y="155" width="58" height="98" rx="5" fill="#154a91" />
        <circle cx="123" cy="205" r="5" fill="#f4bd2e" />
      </g>
    </svg>
  );
}
