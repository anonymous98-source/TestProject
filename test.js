<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 683" width="1024" height="683" role="img" aria-label="Purple layered waves">
  <defs>
    <!-- background gradient -->
    <linearGradient id="bgGrad" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#f6e8fb"/>
      <stop offset="60%" stop-color="#ead5fb"/>
      <stop offset="100%" stop-color="#e1cfff"/>
    </linearGradient>

    <!-- several subtle gradients for layers -->
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#e9d7fb"/>
      <stop offset="100%" stop-color="#d9bff8"/>
    </linearGradient>
    <linearGradient id="g2" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#e8d8fb"/>
      <stop offset="100%" stop-color="#cfa8f4"/>
    </linearGradient>
    <linearGradient id="g3" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#dcb7f6"/>
      <stop offset="100%" stop-color="#b98aef"/>
    </linearGradient>
    <linearGradient id="g4" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0%" stop-color="#cda2f3"/>
      <stop offset="100%" stop-color="#a270e8"/>
    </linearGradient>

    <!-- gentle blur for subtle glow (optional - preserves crisp vector shapes) -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feBlend in="SourceGraphic" in2="blur" mode="normal"/>
    </filter>
  </defs>

  <!-- background -->
  <rect width="100%" height="100%" fill="url(#bgGrad)"/>

  <!-- top-most faint large arcs (very subtle, low opacity) -->
  <path
    d="M-40 130 C150 30, 480 10, 820 90 C940 130, 1040 200, 1100 260 L1100 0 L-40 0 Z"
    fill="url(#g1)"
    opacity="0.18"
    style="paint-order: stroke fill; stroke:#efe2ff; stroke-width:1.2; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- mid faint arc -->
  <path
    d="M-20 220 C160 140, 420 120, 760 190 C920 230, 1020 300, 1100 360 L1100 0 L-20 0 Z"
    fill="url(#g1)"
    opacity="0.12"
    style="paint-order: stroke fill; stroke:#f2e8ff; stroke-width:1; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- middle layered wave (back-most wave) -->
  <path
    d="M0 330 C120 260, 300 240, 520 280 C760 325, 880 400, 1100 420 L1100 683 L0 683 Z"
    fill="url(#g2)"
    opacity="0.40"
    style="paint-order: stroke fill; stroke:#d6b6f9; stroke-width:1.6; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- soft translucent band above -->
  <path
    d="M-10 380 C160 310, 380 300, 640 340 C820 370, 980 420, 1105 450 L1105 683 L-10 683 Z"
    fill="url(#g3)"
    opacity="0.30"
    style="paint-order: stroke fill; stroke:#cda3f6; stroke-width:1.8; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- prominent dark wave (center) -->
  <path
    d="M0 440 C140 380, 340 360, 560 410 C740 450, 880 520, 1100 540 L1100 683 L0 683 Z"
    fill="url(#g4)"
    opacity="0.90"
    style="paint-order: stroke fill; stroke:#6e3bd9; stroke-width:2.6; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- thin accent ribbon on top of dark wave for that crisp overlay -->
  <path
    d="M-20 428 C140 370, 340 350, 560 390 C760 430, 900 490, 1100 510"
    fill="none"
    stroke="#7f4fe8"
    stroke-width="12"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="0.22"
    style="paint-order: stroke"
  />

  <!-- very subtle bottom-most gradient to add depth -->
  <path
    d="M0 580 C120 540, 300 520, 520 560 C740 600, 880 640, 1100 660 L1100 683 L0 683 Z"
    fill="url(#g3)"
    opacity="0.14"
    style="paint-order: stroke fill; stroke:#bfa0f3; stroke-width:1.2; stroke-linejoin:round; stroke-linecap:round"
  />

  <!-- optional glow to give a soft blended look (uncomment the filter attribute to enable) -->
  <!-- wrap a group if you want the glow applied -->
  <!-- <g filter="url(#softGlow)"> ... elements ... </g> -->

  <!-- Accessibility: hidden title/desc are above as aria-label on root -->
</svg>