/* ============================================
   VEXDYN Learn — CSS Course (24 Lessons)
   Progress: localStorage key vexdyn-learn-css
   All lessons unlocked (no VEXDYN+ yet)
   ============================================ */
(function () {
  "use strict";

  const STORAGE_KEY = "vexdyn-learn-css";
  const TOTAL = 24;
  const ACCENT = "#1572b6";

  const LESSONS = [
    {
      id: 1,
      title: "ENTER THE STYLE SYSTEM",
      description: "Learn how CSS transforms HTML structure into a visual interface.",
      mission: "Turn basic HTML into a styled interface.",
      definitions: [
        "CSS (Cascading Style Sheets) is the language used to control the visual presentation of HTML documents — colors, typography, spacing, layout and effects.",
        "A CSS rule consists of a selector (what to style) and a declaration block of properties and values (how to style it)."
      ],
      explanation: "HTML defines structure and meaning — headings, paragraphs, links, and forms. CSS defines appearance — color, type, space, layout, and motion. Without CSS, browsers render plain default text with almost no visual hierarchy. With CSS, the same markup becomes a product interface.\n\nA CSS rule has three parts: a selector (what to style), properties (what to change), and values (how to change them). Example: h1 { color: #fff; font-size: 2rem; } targets every h1 and sets color and size.\n\nThink of HTML as the skeleton and CSS as the skin, clothing, and lighting. VEXDYN interfaces always separate structure from style so the design system can evolve without rewriting content.",
      exampleTitle: "VEXDYN-style hero block",
      example: `/* style.css */
.hero {
  padding: 64px 24px;
  text-align: center;
  background: #0b0b12;
  color: #f4f4f8;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.hero p {
  color: #a0a0b0;
  max-width: 420px;
  margin: 0 auto 24px;
}

.btn {
  display: inline-block;
  padding: 12px 22px;
  background: #7c5cff;
  color: #fff;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}`,
      breakdown: "• body — sets page background and default text color\n• .hero — centers content and adds vertical padding for breathing room\n• h1 — large, heavy type for the brand statement\n• p — secondary text with muted color and readable line-height\n• .btn — padding, radius, and accent background create a tappable control\n\nEach selector targets a specific layer of the interface. Changing one rule updates every matching element.",
      application: "VEXDYN hero sections, buttons, and cards are pure HTML structure first. CSS then applies the glass surfaces, violet accents, and typography scale. Never mix presentation into HTML attributes when a stylesheet can own it.",
      challenge: "Create a simple hero with a heading, paragraph and button. Style background, text colors, spacing and button appearance using external CSS."
    },
    {
      id: 2,
      title: "CONNECT CSS TO HTML",
      description: "Link stylesheets the professional way and organize project files.",
      mission: "Create index.html and style.css and connect them correctly.",
      definitions: [
        "External CSS lives in a separate .css file and is linked from HTML with a <link> element — preferred for real projects.",
        "Inline styles use the style attribute on one element; internal CSS uses a <style> block in the document head."
      ],
      explanation: "There are three ways to apply CSS.\n\n1) Inline — style=\"color:red\" on an element. Quick for experiments, terrible for maintenance.\n2) Internal — a <style> block inside <head>. Fine for tiny demos and single-file prototypes.\n3) External — a separate .css file linked with <link rel=\"stylesheet\" href=\"style.css\">. This is the professional standard.\n\nExternal CSS keeps design tokens, layout, and components in one place. Multiple pages share one stylesheet. Caching improves performance. Teams can work on structure and style in parallel.\n\nFile organization tip: keep index.html for structure and style.css for all visual rules. Avoid scattering styles across many internal blocks.",
      exampleTitle: "Correct external link",
      example: `<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VEXDYN Interface</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <a href="/" class="logo">VEXDYN</a>
  </header>
</body>
</html>

/* style.css */
.site-header {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.logo {
  font-weight: 700;
  letter-spacing: 0.12em;
}`,
      breakdown: "• <link> in <head> loads style.css before body paints\n• body rule sets global background and text\n• .nav styles the top bar as a flex row\n• .logo and links inherit the design language\n\nThe HTML file contains zero visual rules — only structure and the link to CSS.",
      application: "Every VEXDYN page links the same style.css. Theme variables, components, and responsive rules live in one system. That is why Obsidian, Aurora, and Ice can switch without rewriting HTML.",
      challenge: "Create index.html and style.css. Link them correctly. Style a header with a logo and confirm the styles load in the browser."
    },
    {
      id: 3,
      title: "SPEAKING TO ELEMENTS",
      description: "Master selectors so you can target any part of an interface precisely.",
      mission: "Create a multi-component interface and target each component correctly.",
      definitions: [
        "A selector tells the browser which elements a rule applies to — by tag, class, id, relationship or attribute.",
        "Classes are reusable labels (e.g. .card). IDs are unique labels (e.g. #hero). Prefer classes for styling systems."
      ],
      explanation: "Selectors decide which elements receive styles.\n\n• Element selectors (h1, p, a) style all matching tags — useful for base typography.\n• Class selectors (.btn, .card) are the backbone of design systems — reusable and semantic.\n• ID selectors (#hero) target one unique element — use sparingly.\n• Universal selector (*) styles everything — often used for box-sizing resets.\n• Group selectors (h1, h2, h3) share the same rules.\n• Descendant selectors (.card p) style elements inside a parent.\n\nPrefer classes for components. IDs raise specificity and make overrides harder. Build a vocabulary of class names that describe role, not appearance alone.",
      exampleTitle: "Targeting a card system",
      example: `/* Element */
h2 { font-size: 1.4rem; }

/* Class */
.card {
  padding: 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
}

/* ID — use sparingly */
#featured {
  border-color: #7c5cff;
}

/* Group */
h1, h2, h3 {
  letter-spacing: -0.02em;
}

/* Descendant */
.card p {
  color: #a0a0b0;
  font-size: 0.95rem;
}

/* Multiple classes */
.btn.btn-primary {
  background: #7c5cff;
}`,
      breakdown: "• .card — component root\n• .card-title — typed hierarchy inside the card\n• .card-body — content area with muted color\n• .card .btn — descendant targets the button only inside cards\n\nClasses compose. You can add .card--featured later without rewriting HTML structure.",
      application: "VEXDYN components (.v-card, .btn, .section-title) are class-driven. The same HTML pattern appears across pages; CSS classes define the visual system.",
      challenge: "Build a page with a header, two cards and a button. Style each using element, class and descendant selectors — no inline styles."
    },
    {
      id: 4,
      title: "THE CSS COMMAND SYSTEM",
      description: "Understand cascade, specificity and why styles override each other.",
      mission: "Understand and solve conflicting CSS rules.",
      definitions: [
        "The cascade is the algorithm that decides which CSS rule wins when multiple rules target the same element.",
        "Specificity measures how precise a selector is — IDs beat classes, classes beat elements. Equal specificity: last source wins."
      ],
      explanation: "When two rules target the same element, the cascade decides the winner. Browsers compare:\n\n1) Importance (!important — avoid)\n2) Specificity (ID > class > element)\n3) Source order (later wins when specificity ties)\n\nSpecificity is scored roughly as (inline, IDs, classes, elements). #nav .link scores higher than .link. An element selector never beats a class without !important.\n\nGood architecture keeps specificity low and consistent. Prefer a single class on the element over deep descendant chains. Avoid !important except for rare utility overrides.\n\nUnderstanding the cascade prevents the classic trap: piling on stronger selectors until the stylesheet becomes unmanageable.",
      exampleTitle: "Conflict resolution",
      example: `/* Specificity examples */
p { color: #888; }           /* element: 0,0,1 */
.text { color: #ccc; }       /* class:   0,1,0 */
#intro { color: #fff; }      /* id:      1,0,0 */

/* Source order — same specificity */
.btn { background: #333; }
.btn { background: #7c5cff; } /* wins */

/* Prefer clear structure over !important */
.card .title {
  font-size: 1.2rem;
}

/* Avoid */
.title {
  font-size: 2rem !important;
}`,
      breakdown: "• Base .btn sets default look\n• .btn-primary increases specificity with an extra class for the filled variant\n• Order matters when two classes share the same weight\n\nResist fixing conflicts with !important. Adjust selector strength or source order instead.",
      application: "VEXDYN buttons use .btn + .btn-primary / .btn-secondary. Variants extend the base without fighting it. Theme overrides flow through CSS variables, not heavier selectors.",
      challenge: "Create two conflicting rules for the same button. Predict which wins, then fix the conflict without using !important."
    },
    {
      id: 5,
      title: "THE BOX MODEL",
      description: "Understand content, padding, border and margin.",
      mission: "Build cards with predictable dimensions and spacing.",
      definitions: [
        "The CSS box model describes an element as content surrounded by padding, border and margin.",
        "box-sizing: border-box makes declared width and height include padding and border."
      ],
      explanation: "Every element is a box. Content is the inside. Padding creates space inside the border. Border surrounds the padding. Margin creates space outside the element. With box-sizing:border-box, width includes padding and border — the predictable default for modern interfaces.\n\nThe box model explains why a 300px card can unexpectedly become 340px wide: padding and borders are added under content-box. Set * { box-sizing: border-box; } so dimensions include internal spacing. Use margin for external rhythm and padding for internal rhythm.",
      exampleTitle: "Predictable cards",
      example: `* {
  box-sizing: border-box;
}

.card {
  width: 320px;
  padding: 24px;
  border: 1px solid rgba(255,255,255,0.1);
  margin: 16px;
  border-radius: 16px;
  background: #111118;
}

.card h3 {
  margin: 0 0 8px;
}

.card p {
  margin: 0;
  color: #999;
}`,
      breakdown: "• box-sizing — width includes padding + border\n• width — card's outer content box target\n• padding — internal breathing room\n• border — visual edge\n• margin — spacing between cards",
      application: "VEXDYN's cards rely on border-box sizing so grid and flex layouts stay predictable at every breakpoint.",
      challenge: "Create two 320px cards with padding, border and margin. Add box-sizing and verify the measured outer width."
    },
    {
      id: 6,
      title: "COLORS THAT SPEAK",
      description: "Build a deliberate color system instead of random hex values.",
      mission: "Create a five-token color palette.",
      definitions: [
        "A color token is a named variable representing a reusable color role such as background, text or accent.",
        "Contrast is the difference in perceived luminance between foreground and background — critical for readable interfaces."
      ],
      explanation: "Good interfaces use roles: background, surface, text, muted text, accent. Define them once and reuse them. For dark VEXDYN-style systems, near-black backgrounds plus controlled violet/blue accents create depth without visual noise. Always check contrast for body text and controls.\n\nAvoid picking colors per component. Create semantic roles like --bg, --surface, --text, --muted, --accent. This lets a theme change globally. Keep primary text high contrast; muted text should still be readable.",
      exampleTitle: "Five-token palette",
      example: `:root {
  --bg: #07070c;
  --surface: #111118;
  --text: #f4f4f8;
  --muted: #9999a8;
  --accent: #7c5cff;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--surface);
}

.card p {
  color: var(--muted);
}

.btn {
  background: var(--accent);
}`,
      breakdown: "• semantic names — describe role, not color name\n• one source of truth — change accent once\n• muted text — secondary but readable\n• surface — separates cards from page background",
      application: "VEXDYN themes use variables so Obsidian, Aurora and Ice can swap visual identities without rewriting components.",
      challenge: "Create a five-token palette and use variables for page background, cards, body text, muted text and primary button."
    },
    {
      id: 7,
      title: "TYPOGRAPHY SYSTEM",
      description: "Control font families, size, weight, line-height and letter spacing.",
      mission: "Build a readable type scale.",
      definitions: [
        "Typography is the system of choices that controls how written content looks and reads.",
        "Line-height controls vertical space between lines; letter-spacing adjusts spacing between characters."
      ],
      explanation: "Typography is hierarchy. Establish body text first, then headings. A practical scale might use 1rem body, 1.25rem small heading, 1.5rem section heading, 2.5rem hero. Use line-height around 1.5 for paragraphs and tighter values for large headings. Letter-spacing can improve uppercase labels.\n\nUse font-weight to create hierarchy instead of relying only on size. Keep paragraphs at comfortable measure (roughly 45–75 characters per line). For display headings, negative letter-spacing can tighten large type; uppercase labels often need positive spacing.",
      exampleTitle: "Readable type scale",
      example: `body {
  font-family: Inter, system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 800;
}

h2 {
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.05;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
}`,
      breakdown: "• body — comfortable reading rhythm\n• h1 — fluid display size\n• h2 — strong section hierarchy\n• eyebrow — small uppercase navigation cue",
      application: "VEXDYN uses a tight display hierarchy with muted supporting text and tracked uppercase micro-labels.",
      challenge: "Create body, h1, h2 and label styles. Make the heading fluid with clamp() and keep paragraphs readable."
    },
    {
      id: 8,
      title: "SPACING & RHYTHM",
      description: "Use consistent spacing instead of arbitrary margins.",
      mission: "Build a spacing scale and apply it across a section.",
      definitions: [
        "A spacing scale is a small set of repeatable values used for padding, margin and gaps.",
        "Consistent rhythm makes layouts feel intentional and easier to maintain."
      ],
      explanation: "Instead of 13px here and 27px there, define a rhythm: 4, 8, 12, 16, 24, 32, 48, 64. Use gap in flex/grid where possible. Larger sections get larger spacing; related elements stay close. This creates visual grouping without borders everywhere.\n\nSpacing is hierarchy. Small gaps bind related items; large gaps separate sections. A token scale reduces decision fatigue and makes responsive adjustments predictable.",
      exampleTitle: "Spacing tokens",
      example: `:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
}

.section {
  padding: var(--space-8) var(--space-4);
}

.card-grid {
  gap: var(--space-5);
}

.card h3 {
  margin-bottom: var(--space-2);
}`,
      breakdown: "• tokens — one rhythm across product\n• section padding — large vertical separation\n• grid gap — consistent card gutters\n• heading margin — tight internal grouping",
      application: "VEXDYN pages use a spacing rhythm to keep hero, cards, and system sections visually related.",
      challenge: "Define at least six spacing tokens. Rebuild a section using only those values."
    },
    {
      id: 9,
      title: "UNITS THAT SCALE",
      description: "Choose px, %, rem, em, vh and vw deliberately.",
      mission: "Build a fluid section that scales with the viewport.",
      definitions: [
        "Absolute units like px are fixed; relative units like rem, %, vh and vw respond to context or viewport.",
        "rem scales from the root font size; em scales from the element's inherited font size."
      ],
      explanation: "Use px for crisp borders and tiny details. Use rem for typography and spacing that should respect user font settings. Use % for container widths. vh/vw describe viewport size. clamp() can combine min, preferred and max values for fluid type and spacing.\n\nA professional interface mixes units. Borders often stay 1px. Type and spacing can use rem/clamp. Containers use max-width with percentages. Viewport units are useful for hero composition but should be bounded so content remains usable.",
      exampleTitle: "Fluid hero sizing",
      example: `.hero {
  min-height: 80vh;
  padding: clamp(48px, 8vw, 96px) 5%;
}

.hero h1 {
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  max-width: 900px;
}

.hero p {
  max-width: 620px;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
}`,
      breakdown: "• 80vh — hero fills most of viewport\n• clamp padding — fluid but bounded\n• clamp heading — scales between readable minimum and maximum\n• max-width — prevents text from becoming too wide",
      application: "VEXDYN hero layouts use constrained containers and fluid type so desktop feels composed, not stretched.",
      challenge: "Build a hero using only relative/fluid units for padding, title size and container width. Test at 375px and 1440px."
    },
    {
      id: 10,
      title: "THE LAYOUT FOUNDATION",
      description: "Control containers, width and flow before using advanced layout.",
      mission: "Build a centered content system that works at every width.",
      definitions: [
        "A container limits content width so long lines remain readable and layouts do not stretch indefinitely.",
        "max-width sets an upper boundary while width:100% allows content to shrink on smaller screens."
      ],
      explanation: "Most professional pages use a centered container with width:100%, a max-width, and horizontal padding. This gives content a stable reading measure while remaining fluid. Combine with margin-inline:auto for centering.\n\nThe container is the invisible skeleton of a page. Keep it consistent across sections so headings and cards align. Add internal padding to prevent edge collisions on mobile.",
      exampleTitle: "Responsive container",
      example: `.container {
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 20px;
}

.section {
  padding-block: clamp(56px, 8vw, 96px);
}`,
         breakdown: "• width:100% — fluid base\n• max-width — prevents stretched layouts\n• margin-inline:auto — centers content\n• padding-inline — protects mobile edges",
      application: "VEXDYN's major sections share constrained content widths so the interface feels deliberate across devices.",
      challenge: "Create a reusable container and use it across three sections. Verify alignment at mobile and desktop widths."
    },
    {
      id: 11,
      title: "CONTROL THE FLOW",
      description: "Use display values to control how elements participate in layout.",
      mission: "Build a navigation system.",
      definitions: [
        "display controls an element’s outer box type: block, inline, inline-block, flex, grid, none.",
        "Normal document flow stacks block elements vertically and places inline elements along the line."
      ],
      explanation: "Block elements (div, section, p) take full width and stack. Inline elements (span, a) sit within text. inline-block allows width/height while staying in line — useful for nav links. display: none removes an element from layout entirely. Modern nav often upgrades to flex once basics are clear.\n\ndisplay controls participation in flow. block stacks vertically, inline runs within text, inline-block mixes both, none removes from layout. Flex and grid (later lessons) override default flow for alignment. Navigation bars, chips, and media objects all start with the right display value.",
      exampleTitle: "Simple navigation flow",
      example: `.nav {
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.nav a {
  display: inline-block;
  padding: 8px 14px;
  margin-right: 4px;
  color: #c8c8d4;
  text-decoration: none;
  border-radius: 8px;
}

.nav a:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}

.nav a.active {
  color: #fff;
  background: rgba(124, 92, 255, 0.18);
}`,
      breakdown: "• inline-block links — padding works, items share a row\n• margin-right — gap between items\n• hover/active — clear interactive states\n• block-level .nav — full-width bar",
      application: "Understanding flow is the foundation before Flexbox-powered VEXDYN navigation.",
      challenge: "Build a horizontal nav with four links using inline-block. Add hover and active states without Flexbox yet."
    },
    {
      id: 12,
      title: "POSITION SYSTEM",
      description: "Layer and place elements with relative, absolute, fixed and sticky.",
      mission: "Build a card with floating elements/badges.",
      definitions: [
        "position changes how an element is placed: static (default), relative, absolute, fixed, sticky.",
        "Absolutely positioned elements offset from their nearest positioned ancestor; z-index controls stacking order."
      ],
      explanation: "relative keeps an element in flow but allows offset and becomes a positioning anchor. absolute removes from flow and places against that anchor — perfect for badges. fixed pins to the viewport (e.g. WhatsApp button). sticky toggles between relative and fixed within a container — useful for section labels.\n\nposition removes or offsets elements from normal flow. relative is an anchor; absolute places inside the nearest positioned ancestor; fixed pins to the viewport; sticky toggles between relative and fixed at a scroll threshold. z-index only applies to positioned elements — use a small, documented scale.",
      exampleTitle: "Card with floating badge",
      example: `.feature-card {
  position: relative;
  padding: 28px 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}

.feature-card .badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 10px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 999px;
  background: rgba(124, 92, 255, 0.2);
  color: #b9a8ff;
}

.floating-help {
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 100;
}`,
      breakdown: "• relative card — positioning context\n• absolute badge — pinned to top-right\n• fixed help — stays on screen while scrolling\n• z-index — keeps floating UI above content",
      application: "VEXDYN course badges and the WhatsApp float use the same positioning patterns.",
      challenge: "Create a card with an absolute status badge and a fixed corner button. Ensure stacking order is correct."
    },
    {
      id: 13,
      title: "FLEXBOX — THE ALIGNMENT ENGINE",
      description: "Align and distribute items on one axis with Flexbox.",
      mission: "Build a responsive navigation using Flexbox.",
      definitions: [
        "Flexbox is a one-dimensional layout model: display:flex creates a flex container; children become flex items.",
        "justify-content distributes along the main axis; align-items aligns on the cross axis; gap sets consistent spacing."
      ],
      explanation: "Flexbox solved years of float hacks. Set display:flex on a container, then choose direction (row/column), alignment and gap. Nav bars, toolbars and centered heroes become straightforward. Main axis follows flex-direction; cross axis is perpendicular. Start simple: space-between for nav, center for hero stacks.\n\nFlexbox is one-dimensional alignment. Set display:flex, choose direction, then distribute space with justify-content (main axis) and align-items (cross axis). gap replaces margin hacks. Flex turns nav bars, toolbars, and card footers into predictable systems.",
      exampleTitle: "Flex navigation",
      example: `.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links a {
  padding: 8px 12px;
  border-radius: 8px;
  color: #c8c8d4;
  text-decoration: none;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
    gap: 10px;
}

.nav-actions .btn {
  white-space: nowrap;
}`,
      breakdown: "• display:flex — activates Flexbox\n• align-items:center — vertical alignment\n• justify-content:space-between — pushes logo and links apart\n• gap — consistent spacing between flex items",
      application: "VEXDYN navigation, toolbars and action groups use Flexbox for reliable alignment.",
      challenge: "Build a navigation bar with a logo, three links and a CTA using Flexbox. Make sure everything aligns vertically."
    },
    {
      id: 14,
      title: "FLEXBOX — RESPONSIVE CONTROL",
      description: "Wrap and reorder flex items to create adaptable interfaces.",
      mission: "Build a responsive feature row that becomes a stack.",
      definitions: [
        "flex-wrap allows flex items to move onto additional lines when space is limited.",
        "flex properties such as flex, flex-grow, flex-shrink and flex-basis control how items consume available space."
      ],
      explanation: "Flexbox becomes powerful when you control how children grow and shrink. flex: 1 lets items share available space. flex-wrap: wrap lets rows continue when the viewport becomes narrow. flex-direction: column creates a vertical stack.\n\nUse min-width: 0 on flexible children when long content might overflow. Combine wrapping with gap for clean responsive rows. Media queries can switch direction when a stacked mobile layout is more appropriate.",
      exampleTitle: "Responsive feature row",
      example: `.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.feature {
  flex: 1 1 260px;
  min-width: 0;
  padding: 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
}

@media (max-width: 640px) {
  .features {
    flex-direction: column;
  }
}`,
      breakdown: "• flex-wrap — allows items to move to another row\n• flex: 1 1 260px — grow, shrink, start around 260px\n• min-width: 0 — prevents content overflow\n• mobile media query — forces a clean vertical stack",
      application: "VEXDYN feature sections can remain flexible on tablets while becoming deliberate single-column compositions on phones.",
      challenge: "Create four feature cards using flex-wrap. Make each card flexible and switch to a column under 640px."
    },
    {
      id: 15,
      title: "GRID — THE STRUCTURE ENGINE",
      description: "Build two-dimensional layouts with CSS Grid.",
      mission: "Build a six-card technology dashboard.",
      definitions: [
        "CSS Grid is a two-dimensional layout system with rows and columns defined on a grid container.",
        "fr units distribute free space; repeat() reduces repetition; gap sets row and column gutters."
      ],
      explanation: "Grid shines when layout is both rows and columns — dashboards, galleries, page shells. Define columns with grid-template-columns, place items automatically or explicitly. Unlike Flexbox, Grid controls both axes at once. Start with equal columns: repeat(3, 1fr).\n\nGrid is two-dimensional. grid-template-columns with fr units divides space proportionally. repeat() and gap keep rules short. Grid shines for dashboards, galleries, and page shells where rows and columns both matter.",
      exampleTitle: "Six-card dashboard",
      example: `.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.dash-card {
  padding: 20px;
  border-radius: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}

.dash-card .metric {
  font-size: 1.6rem;
  font-weight: 750;
}

.dash-card .label {
  font-size: 0.78rem;
  color: #8b8b9a;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 700px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}`,
      breakdown: "• repeat(3, 1fr) — three equal columns\n• gap — row and column spacing\n• mobile media query — single column stack\n• cards auto-place in source order",
      application: "VEXDYN ecosystem and course grids use Grid for intentional multi-column compositions on desktop.",
      challenge: "Build a six-card dashboard in a 3-column grid. Collapse to one column under 700px."
    },
    {
      id: 16,
      title: "GRID ADVANCED",
      description: "Create fluid responsive grids with auto-fit and minmax.",
      mission: "Build an automatically responsive service grid.",
      definitions: [
        "auto-fit and auto-fill expand grid tracks to fit the container; minmax() sets flexible track sizes.",
        "A common pattern: repeat(auto-fit, minmax(240px, 1fr)) for cards that reflow without many breakpoints."
      ],
      explanation: "Instead of hard breakpoints for 1/2/3 columns, auto-fit + minmax lets the browser pack as many tracks as fit. When space is tight, tracks shrink to the min and wrap. This is ideal for course cards, product grids and galleries. Combine with gap for consistent rhythm.\n\nauto-fit, auto-fill, and minmax() create grids that add/remove columns as space allows. A single rule can replace a stack of breakpoints for card layouts. Fluid grids are the modern default for product marketing sections.",
      exampleTitle: "Auto-fit card grid",
      example: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.card-grid .card {
  padding: 24px;
  border-radius: 16px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  min-height: 160px;
}`,
      breakdown: "• minmax(240px, 1fr) — no card narrower than 240px\n• auto-fit — collapses empty tracks\n• gap — uniform spacing\n• often no extra breakpoints required",
      application: "Learn course grids can use this pattern so 2 or 4 columns appear based on viewport, not only fixed media queries.",
      challenge: "Replace a fixed 3-column grid with auto-fit + minmax. Resize the browser and watch columns adapt."
    },
    {
      id: 17,
      title: "BUILD FOR EVERY SCREEN",
      description: "Design responsive layouts with mobile-first media queries.",
      mission: "Create a website that works properly across mobile and desktop.",
      definitions: [
        "Responsive design ensures interfaces adapt across viewport sizes — not only by scaling, but by reflowing layout.",
        "Mobile-first media queries add complexity as the screen grows: @media (min-width: …)."
      ],
      explanation: "Start with a solid single-column mobile layout. Add columns, spacing and type scale at 768px, 1024px and 1440px as needed. Prevent overflow with max-width: 100% on media and min-width: 0 on flex children. Test real widths: 375, 768, 1024, 1440. Responsive is a system, not one breakpoint.\n\nResponsive design is constraint design. Mobile-first means base styles fit small screens; min-width media queries enhance larger ones. Prevent overflow with min-width:0 on flex children, max-width:100% on media, and realistic breakpoints (375, 768, 1024, 1440).",
      exampleTitle: "Mobile-first section",
      example: `.features {
  display: grid;
  gap: 16px;
  padding: 48px 20px;
}

@media (min-width: 768px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 64px 32px;
  }
}

@media (min-width: 1024px) {
  .features {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
  }
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}`,
      breakdown: "• Base — one column, comfortable padding\n• 768px — two columns\n• 1024px — three columns + max width\n• images — never overflow",
      application: "VEXDYN desktop optimization uses additive min-width queries so mobile remains the stable baseline.",
      challenge: "Build a features section that is 1 column on mobile, 2 on tablet, 3 on desktop. Verify at 375, 768, 1024 and 1440."
    },
    {
      id: 18,
      title: "TRANSITION SYSTEM",
      description: "Add smooth hover and state changes with transitions.",
      mission: "Create premium buttons and cards with smooth interactions.",
      definitions: [
        "A transition interpolates property changes over time when an element’s state changes (e.g. :hover).",
        "Duration, timing-function and property list control how polished the motion feels."
      ],
      explanation: "Instant state changes feel harsh. Short transitions (150–300ms) on transform, opacity and color feel premium. Prefer transform and opacity for performance. Avoid transitioning layout properties like width/height when possible. Consistent easing across a product builds trust.\n\nTransitions interpolate property changes over time. Specify which properties, duration, and easing. Hover and focus states should move 150–300ms with ease or a custom cubic-bezier. Transition opacity and transform for performance; avoid animating width/height when possible.",
      exampleTitle: "Interactive button and card",
      example: `.btn-primary {
  background: #7c5cff;
  color: #fff;
  padding: 12px 22px;
  border-radius: 999px;
  border: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.25s ease,
    background 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(124, 92, 255, 0.35);
  background: #8b6fff;
}

.card {
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: rgba(124, 92, 255, 0.4);
}`,
      breakdown: "• Only GPU-friendly props where possible\n• 0.2–0.28s — quick but visible\n• hover lift — subtle, not bouncy\n• matching shadow reinforces elevation",
      application: "VEXDYN buttons, lesson cards and glass cards all use restrained transitions for a cinematic feel.",
      challenge: "Add transitions to a button and card. Hover should feel smooth — not instant and not sluggish."
    },
    {
      id: 19,
      title: "TRANSFORM ENGINE",
      description: "Move, scale and rotate elements without breaking layout flow.",
      mission: "Create cards that subtly move and scale on interaction.",
      definitions: [
        "transform applies translate, scale, rotate and skew without reflowing surrounding document layout.",
        "Transforms are composited efficiently by the browser — ideal for interaction feedback."
      ],
      explanation: "translateY on hover lifts a card. scale(1.02) adds presence. rotate is powerful but easy to overuse. Combine transforms in one property. transform-origin controls the pivot point. Pair with transitions for polish. Keep motion subtle in product UI.\n\nTransforms move, scale, and rotate without reflow when composited. translateY on hover lifts cards; scale emphasizes focus. Combine transforms in one property. Prefer transform + opacity for smooth 60fps interaction on mobile.",
      exampleTitle: "Card transform interactions",
      example: `.tilt-card {
  transform: translateY(0) scale(1);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tilt-card:hover {
  transform: translateY(-4px) scale(1.015);
}

.icon-spin:hover {
  transform: rotate(8deg) scale(1.08);
  transition: transform 0.25s ease;
}

.badge-pop {
  transform-origin: center;
}

.badge-pop:active {
  transform: scale(0.96);
}`,
      breakdown: "• translateY + scale — premium hover lift\n• cubic-bezier — refined easing curve\n• active scale-down — tactile press\n• transform-origin — controls rotation/scale pivot",
      application: "Lesson cards and ecosystem cards in VEXDYN use small translate/scale transforms on interaction.",
      challenge: "Create three cards with hover translate and scale. Add a pressed state on the CTA using scale."
    },
    {
      id: 20,
      title: "ANIMATION ENGINE",
      description: "Orchestrate motion with @keyframes and animation properties.",
      mission: "Create a cinematic hero reveal sequence.",
      definitions: [
        "@keyframes defines named animation sequences; the animation property applies them to elements.",
        "Duration, delay, timing-function and iteration-count choreograph multi-step reveals."
      ],
      explanation: "Transitions react to state changes. Animations can run automatically through a sequence defined with @keyframes. Use them for entrances, ambient effects and controlled loops. Keep motion purposeful and respect prefers-reduced-motion.\n\nA keyframe animation defines points in time. animation-name connects the element to the keyframes; animation-duration controls speed; animation-delay sequences multiple elements; animation-fill-mode:both keeps the start/end states. Use one-shot reveals rather than constant movement for content-heavy screens.",
      exampleTitle: "Cinematic reveal",
      example: `@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  animation: reveal-up 0.8s ease both;
}

.hero-copy {
  animation: reveal-up 0.8s 0.12s ease both;
}

.hero-cta {
  animation: reveal-up 0.8s 0.24s ease both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-title,
  .hero-copy,
  .hero-cta {
    animation: none;
  }
}`,
      breakdown: "• keyframes — defines start/end states\n• staggered delays — creates sequence\n• both — preserves useful start/end state\n• reduced-motion — respects accessibility preferences",
      application: "VEXDYN uses restrained reveal animations to introduce hero and system content without distracting from the interface.",
      challenge: "Create a three-element reveal sequence with 100ms delays between each element. Add a reduced-motion fallback."
       }
         {
      id: 21,
      title: "GLASS & DEPTH",
      description: "Create layered surfaces with transparency, borders and blur.",
      mission: "Build a premium glass card.",
      definitions: [
        "rgba() and hex alpha values allow partially transparent colors.",
        "backdrop-filter: blur() applies blur to content behind a translucent element."
      ],
      explanation: "Glassmorphism is not just opacity. Combine a translucent surface, a subtle border, backdrop blur, and controlled shadow. The background behind the card must have enough contrast for the effect to read. Use blur sparingly — it is visual depth, not decoration everywhere.\n\nThe recipe is: rgba background + 1px border + backdrop-filter + soft shadow. Always provide a solid-ish fallback for browsers without backdrop-filter. Keep contrast high enough for text.",
      exampleTitle: "Premium glass card",
      example: `.glass-card {
  background: rgba(255,255,255,0.055);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  padding: 28px;
}

.glass-card h3 {
  color: #fff;
}

.glass-card p {
  color: rgba(255,255,255,0.65);
}`,
      breakdown: "• translucent background — lets environment show through\n• border — defines edge\n• backdrop-filter — softens background\n• shadow — adds separation from the page",
      application: "VEXDYN's System and Learn surfaces use controlled glass layers over dark backgrounds.",
      challenge: "Build a glass card over a gradient or image. Make sure text remains readable."
    },
    {
      id: 22,
      title: "VISUAL EFFECTS",
      description: "Use gradients, shadows and pseudo-elements to create atmosphere.",
      mission: "Create a subtle futuristic background treatment.",
      definitions: [
        "A gradient creates a smooth transition between colors.",
        "Pseudo-elements ::before and ::after create generated visual layers without extra HTML elements."
      ],
      explanation: "Modern interfaces can create complex visuals with CSS alone. radial-gradient can create glows, linear-gradient can create surfaces, and pseudo-elements can add overlays. Keep effects subordinate to content. Avoid adding visual noise just because CSS allows it.\n\nUse gradients as atmosphere. A radial glow behind a hero title can establish focus. ::before and ::after can create overlays while keeping markup clean. Always check the effect at mobile sizes and under reduced-motion preferences.",
      exampleTitle: "Ambient glow",
      example: `.hero {
  position: relative;
  overflow: hidden;
  background: #07070c;
}

.hero::before {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  top: -220px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(
    circle,
    rgba(124,92,255,0.22),
    transparent 68%
  );
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}`,
      breakdown: "• position:relative — creates anchor\n• ::before — visual layer without markup\n• radial-gradient — soft atmospheric glow\n• pointer-events:none — effect never blocks interaction\n• z-index — content remains above glow",
      application: "VEXDYN's dark interface uses controlled ambient lighting rather than heavy decorative effects.",
      challenge: "Create a hero with a pseudo-element glow. Make sure the glow never blocks buttons or links."
    },
    {
      id: 23,
      title: "MOTION WITH PURPOSE",
      description: "Combine transitions, transforms and keyframes into a cohesive interaction system.",
      mission: "Build a polished interactive component with accessible motion.",
      definitions: [
        "Interaction design uses motion to communicate state, feedback and hierarchy.",
        "prefers-reduced-motion lets users reduce non-essential animation."
      ],
      explanation: "Motion should communicate. Hover can lift a card. Focus can reveal a ring. Loading can use a small pulse. Entrance animation can establish hierarchy. Avoid perpetual motion that competes with reading. Always give users who prefer reduced motion a calmer experience.\n\nThe most professional motion is often barely noticed. Keep durations short for direct interactions and slower for atmospheric entrances. Never hide essential content behind animation.",
      exampleTitle: "Accessible interaction system",
      example: `.interactive {
  transition:
    transform 0.22s ease,
    opacity 0.22s ease,
    border-color 0.22s ease;
}

.interactive:hover {
  transform: translateY(-3px);
}

.interactive:focus-visible {
  outline: 2px solid #7c5cff;
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .interactive {
    transition: none;
  }

  .interactive:hover {
    transform: none;
  }
}`,
      breakdown: "• hover — communicates elevation\n• focus-visible — keyboard users get a clear state\n• reduced-motion — removes non-essential movement\n• transform — avoids layout reflow",
      application: "VEXDYN interactions use subtle motion while keeping keyboard and reduced-motion users fully supported.",
      challenge: "Create a card with hover and focus states. Add a prefers-reduced-motion fallback."
    },
    {
      id: 24,
      title: "CSS SYSTEM COMPLETE",
      description: "Combine the complete CSS foundation into a responsive interface.",
      mission: "Build a polished VEXDYN-style page using the system you have learned.",
      definitions: [
        "A CSS design system combines reusable tokens, components, layout rules, responsive behavior, and interaction states.",
        "Maintainable CSS favors clear class names, predictable specificity, reusable values, and deliberate responsive rules."
      ],
      explanation: "You now have the complete CSS foundation: selectors, cascade, box model, colors, typography, spacing, units, containers, display, positioning, Flexbox, Grid, responsiveness, transitions, transforms, animations, glass surfaces, and visual effects.\n\nThe final step is systems thinking. Don't style one element at a time forever. Create reusable patterns: buttons, cards, containers, headings, navigation, grids. Store repeated values in custom properties. Keep selectors shallow. Test mobile, tablet, desktop, keyboard navigation, and reduced motion.\n\nA strong CSS system disappears into the experience. Users notice the product, not the stylesheet.",
      exampleTitle: "Complete VEXDYN-style system",
      example: `:root {
  --bg: #07070c;
  --surface: rgba(255,255,255,0.05);
  --text: #f4f4f8;
  --muted: #9999a8;
  --accent: #7c5cff;
  --border: rgba(255,255,255,0.1);
  --radius: 18px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(240px, 1fr)
  );
  gap: 20px;
}

.card {
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: rgba(124,92,255,0.4);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }

  .card:hover {
    transform: none;
  }
}`,
      breakdown: "• variables — centralized design tokens\n• border-box — predictable dimensions\n• container — consistent page alignment\n• auto-fit grid — responsive cards\n• glass card — layered visual depth\n• transition — restrained interaction\n• reduced motion — accessible fallback",
      application: "This is the mindset behind the VEXDYN interface: reusable rules, controlled visual hierarchy, responsive behavior, and purposeful interaction.",
      challenge: "Build your final VEXDYN-inspired landing page. Use a semantic HTML structure and apply the complete CSS system: variables, typography, spacing, responsive Grid/Flexbox, cards, buttons, and accessible motion."
    }
  ];

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completed: [] };
      const parsed = JSON.parse(raw);
      const completed = Array.isArray(parsed.completed)
        ? parsed.completed
            .map(Number)
            .filter((id) => Number.isInteger(id) && id >= 1 && id <= TOTAL)
        : [];
      return { completed: [...new Set(completed)].sort((a, b) => a - b) };
    } catch (error) {
      console.warn("VEXDYN Learn CSS progress could not be loaded.", error);
      return { completed: [] };
    }
  }

  function saveProgress(completed) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          completed: [...new Set(completed)].sort((a, b) => a - b)
        })
      );
      return true;
    } catch (error) {
      console.warn("VEXDYN Learn CSS progress could not be saved.", error);
      return false;
    }
  }

  function getPercent(completed) {
    return Math.round((completed.length / TOTAL) * 100);
  }

  function isComplete(id, completed) {
    return completed.includes(id);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function animatePercent(el, from, to) {
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = Math.round(to) + "%";
      return;
    }

    const delta = Math.abs(to - from);
    const duration = delta <= 10 ? 900 : delta <= 50 ? 1200 : 1500;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);

      el.textContent =
        Math.round(from + (to - from) * eased) + "%";

      if (t < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
       }
