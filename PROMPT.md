# Prompt: Shafiul Islam personal portfolio website

Build a fast, responsive, single-page personal portfolio for **Shafiul Islam** (Sales Officer · Marketing · Customer Service, from Jamalpur, Bangladesh). Use plain HTML, CSS and JavaScript only: no framework, no build step, deployable on Vercel as static files.

## Look and feel
- Dark theme. Background #070b13, surface #0e1522, text #f0f4fb, muted #a5b1c3, gold accent #dfc17a, blue accent #8eaaff.
- Font: Geist Sans for everything (Google Fonts with font-display: swap, system-ui fallback). Large tight headings; the name uses a white-to-gold gradient.
- Rounded cards (18px) with a thin border, a soft gradient fill and a subtle mouse-follow glow on hover.

## Layout (important)
- Every section, including Home, uses the same centered container: max-width 1160px with equal side padding. Home must NOT be wider than About.
- Sections: Home, About, Experience, Skills, Education, Contact. From About down, each has a sticky left title and a content column on the right; on screens below 900px it becomes one column.
- Home: left side has a small label, the big name, "Sales Officer | Marketing | Customer Service", a typing line ("I'm good at selling to shopkeepers / solving customer problems / handling reports and data / working under pressure"), then Download CV and My work buttons. Right side has an arch-shaped profile photo with a gold offset outline, an "Open to work" badge, and below it a curved line with WhatsApp and Email icons.
- Fixed top bar: logo, a pill navigation with a sliding active indicator, and a scroll-progress line. On mobile: a hamburger menu with a full-screen overlay with centered links that fade in one by one (no bottom tab bar).

## Content
- About: two years of experience in sales, client handling and report preparation. Counters: 2+ years, 350 litres (usually 250–300 daily), 8/12 months target achieved, 2 sales vehicles.
- Experience (expandable cards): Sales Officer at Akij Dairy Ltd. (Farm Fresh), Feb 2025 – Jan 2026; Assistant to Cutting Manager at Active Composite Mills Ltd, Dec 2023 – Jan 2025.
- Skills: Sales & Service, Office (MS Word, Excel, PowerPoint), Personal, Languages (Bangla native, English intermediate), and typing-speed bars (English 30–35 WPM, Bangla 18–22 WPM).
- Education: HSC (Science) 2020, GPA 3.17; MS Office and Typing 2018; SSC (Science) 2016, GPA 3.89.
- Contact: WhatsApp (wa.me/8801937102210), Email (shafiulislam517@gmail.com), Copy email button with a toast, Download CV. Show LinkedIn only when a URL is set.

## Animation
- Hover on the Home WhatsApp/Email icons: the icon grows and moves slightly down, its name label appears fully visible below it, a gold ring pulses outward, and the curved line turns gold with flowing dashes.
- Photo tilts slightly with the mouse on desktop only. Sections fade in once on scroll. Counters and skill bars animate once.
- Respect prefers-reduced-motion.

- Hover feedback on everything interactive: cards lift and get a gold border, experience headers slide right and turn gold, skill chips and education titles turn gold, mobile menu links turn gold on hover/press.
- A soft gold-blue light follows the mouse across the whole page on desktop.

## Performance rules (must follow)
- Animate only transform and opacity. Never animate width, height, top or left.
- Particle canvas background on desktop with a fine pointer only: at most 44 particles, links drawn in one path, paused when the tab is hidden. Nothing heavy on mobile.
- Mouse glow moves with transform on a small element. Do not set CSS variables on the root element on every mouse move.
- Scroll handlers use requestAnimationFrame, passive listeners and cached measurements (no layout reads while scrolling).
- Photo as WebP with a JPG fallback, preloaded. No backdrop-filter on large areas.
- Target 60fps on desktop and a mid-range phone, no layout shift, Lighthouse performance above 90.

## Accessibility
Skip link, visible focus outlines, aria-expanded on the menu and accordions, 44px minimum tap targets, good contrast.
