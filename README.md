# Proxie Studio website 

SvelteKit 3 + Svelte 5 (runes) + TypeScript. Motion by GSAP (ScrollTrigger, SplitText, DrawSVGPlugin) and Lenis.
All pages are prerendered; old URLs are 301-redirected at runtime.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # svelte-check (types + a11y)
npm run build      # production build; prerendering fails on broken links or #anchors
npm run preview    # serve the production build (redirects work here too)
```

Node 22+ is required. `adapter-auto` picks the right adapter on Vercel, Netlify, Cloudflare and similar hosts.
The redirects in `src/hooks.server.ts` need a server runtime, which all of these provide.

## Folder structure

```
images/                     Client images (originals, never edited)
static/                     Favicons + apple-touch-icon
src/
  app.html                  Document shell (adds the `js` class used by motion CSS)
  env.ts                    Environment variables (PUBLIC_CONTACT_ENDPOINT)
  hooks.server.ts           301 redirects from the old site
  routes/                   One folder per route (see SiteContent.txt, Section 4)
    services/[pillar]/[service]   Pillar and service pages (generated from content)
    industries/[industry]         Industry pages
    +error.svelte                 Custom 404
  lib/
    assets/photos/          Stock photos (CC0 / public domain, see PHOTO-CREDITS.md)
    content/                Typed content: the ONLY place copy lives
    components/
      layout/               Header (mega menu, dropdowns), mobile menu, footer, SEO
      sections/             Page sections (hero, cards, carousel, CTA, legal layout, form…)
      art/                  Code-made artwork (abstract interface scenes per pillar/product)
      graph/                The animated launch-timeline chart
      ui/                   Button, ArrowLink, Heading, Icon, Logo, PMark, Media (photo/art frame)
    motion/                 Motion tokens, GSAP setup, Lenis, animation attachments
    contact/submit.ts       Contact form submit handler (connect your back end here)
    styles/                 tokens.css (design tokens) + global.css
```

## Where content lives

Everything visible comes from `src/lib/content/`, transcribed from `SiteContent.txt`:

| File            | Contents                                                          |
| --------------- | ----------------------------------------------------------------- |
| `site.ts`       | Company name, email, offices, social links, copyright             |
| `navigation.ts` | Header, mobile menu, footer and legal navigation                  |
| `home.ts`       | Home page                                                         |
| `services.ts`   | Services overview, 4 pillars and 18 service pages                 |
| `industries.ts` | Industries overview and 4 industry pages                          |
| `company.ts`    | About, Our Products, Sustainability, Careers, Contact, 404        |
| `legal.ts`      | Privacy Policy, Terms, Blind Companion and Session Pilot policies |
| `blocks.ts`     | Reusable blocks: testimonials, logos, stats, process, CTA, founders |
| `images.ts`     | Image imports (processed by `@sveltejs/enhanced-img`)             |
| `media.ts`      | Which photo or artwork goes where, with alt text                  |
| `redirects.ts`  | Old → new route map used by `hooks.server.ts`                     |

Two-tone headlines are written as `['lead line', 'quieter line']`; joined with a space they match the copy exactly.
To add a service, add it to its pillar in `services.ts`. The route, menus, footer and related links pick it up automatically.

## Imagery

- **Client images** (`images/`): founders, client logos and testimonial avatars.
  `images/testimonials/Type-1a.png` and `Type-1b.png` are intentionally unused: they contain names and job titles
  that are not in `SiteContent.txt`.
- **Stock photos** (`src/lib/assets/photos/`): CC0 or public-domain photos from Wikimedia Commons, used as atmosphere
  for the Home hero, industries, About, offices, Services, Sustainability and Careers. They never depict Proxie's people,
  offices or projects. Sources and photographers are listed in `PHOTO-CREDITS.md`. To swap a photo, replace the file
  and update its alt text in `src/lib/content/media.ts`.
- **Code-made artwork** (`src/lib/components/art/Art.svelte`): abstract interface scenes for the four pillars (data,
  AI, business apps, digital experience) and the two products (vision, voice). Every service page gets its own
  variation, seeded by its slug. The scenes contain no text or numbers, so they add no claims.

## Design tokens

`src/lib/styles/tokens.css` holds every design decision as CSS custom properties:
colour (cool light-grey base with white cards, green-black ink, emerald accent, plus lime and bright-green
glows, gradients and a dither-dot texture used decoratively), typography (Bricolage Grotesque for display, Instrument Sans for text,
self-hosted via Fontsource), the fluid type scale, spacing, radius, shadow, motion durations and easings, and z-index layers.
Shared visual utilities (eyebrow pill, nested frame, dither texture, glows, float) are in `src/lib/styles/global.css`.

## Motion

- `src/lib/motion/tokens.ts`: durations, easings, stagger and distances for GSAP (mirrors the CSS motion tokens), plus
  the kinetic typography tokens and presets.
- `src/lib/motion/gsap.ts`: registers plugins in the browser only.
- `src/lib/motion/smooth-scroll.ts`: Lenis, driven by the GSAP ticker and feeding ScrollTrigger.
- `src/lib/motion/attachments.ts`: every animation as a Svelte attachment (`reveal`, `heroIntro`, `drawPaths`,
  `parallax`, `imageReveal`, `magnetic`, `stepSequence`, `launchGraph`, `artReveal`, `mediaReveal`, `kinetic`). Each runs inside `gsap.matchMedia()` and
  reverts on destroy, so nothing leaks between pages.
- `src/lib/motion/split.ts`: the SplitText wrapper used by `kinetic` and `heroIntro` (see below).
- Page transitions use the View Transitions API (`+layout.svelte`), with a short GSAP fade as the fallback.
- With `prefers-reduced-motion: reduce`, Lenis, scroll-triggered motion, the marquee, kinetic typography and the page
  transitions are off (nothing is split), and everything shows in its final state.
- Performance trade-off: the hero headline is hidden until JavaScript reveals it (`.js [data-hero-title]` in
  `global.css`), which makes it the Largest Contentful Paint. Lighthouse mobile scores about 91 for performance
  (desktop 100). If JS is late (more than 1.2 s), the headline just appears. For a mobile score of 100, remove that rule
  so the headline paints with the page.

### Kinetic typography

Headings and a few prominent texts move with scroll and with the pointer. Each element gets one preset from
`kineticPresets` in `motion/tokens.ts`:

| Preset      | Used for                                              | Scroll                       | Pointer (mouse/trackpad only) |
| ----------- | ----------------------------------------------------- | ---------------------------- | ----------------------------- |
| `hero`      | Every H1 (after `heroIntro`)                          | none                         | proximity                     |
| `section`   | Section H2s                                           | rise                         | none                          |
| `cta`       | The closing call to action                            | rise + tighten               | proximity                     |
| `statement` | Home "Who are we?" statement, large pull quotes       | sweep (words)                | proximity (words)             |
| `card`      | Titles of clickable cards and the pillar explorer     | none                         | hover (also keyboard focus)   |
| `numeral`   | Process step numbers, About stats                     | velocity                     | none                          |

- **rise**: lines rise out of a mask, once. Two-tone lines rise in turn.
- **sweep**: words go from faint to full opacity in reading order as you scroll.
- **tighten**: letters go from a light weight to the text's own weight as it scrolls in.
- **velocity**: skews slightly with scroll speed (at most 4°) and settles back.
- **proximity**: letters near the pointer get heavier and lift.
- **hover**: the card's hover or keyboard focus lifts its title's letters in a quick stagger.

**Changing an effect:**

- **All elements of a kind:** edit the preset in `kineticPresets`. Every heading using it changes.
- **One heading:** `<Heading kinetic="cta" …>`, `<Heading kinetic={{ scroll: 'rise', pointer: 'proximity' }} …>`
  or `<Heading kinetic={false} …>`. Without the prop, H1s get `hero`, H2s get `section`, and other levels get nothing.
- **Any other element:** `{@attach kinetic('statement')}`, or pass options. `unit: 'words'` is for paragraphs; long
  text is never split into characters.
- **Strength and timing:** `kinetic`, `kineticRange`, `kineticPrepare`, `distance.rise`, `distance.lift` and
  `stagger.char` in `tokens.ts`, mirrored as `--kinetic-*` in `tokens.css`.

**Hero intro:** `heroIntroStyle` in `tokens.ts`.

- `'fade'` (default): the title's lines fade and rise on the real text, so the LCP is unchanged.
- `'mask'`: the masked SplitText line rise. The headline is only fully painted when the split reverts, about 1.3 s
  later. On pages where the H1 is the LCP element (most inner pages), Lighthouse mobile measures LCP about 0.1 s later
  and field LCP is about 1.3 s later.

**What `split.ts` guarantees:**

- **Same space.** Each character is locked to its measured, kerned width, so split text sits exactly where the plain
  text did and a weight change never moves its neighbours. A split heading keeps its unsplit width. Text re-splits
  when the font loads or the viewport resizes (SplitText `autoSplit`, debounced).
- **Same reading.** Headings get their full text as `aria-label` with the pieces hidden from screen readers. Links and
  buttons keep their original accessible name. Paragraphs are split at word boundaries only.
- **Svelte-safe.** SplitText works on a copy, and Svelte's own text nodes wait in a fragment until the split is undone.
  So navigating between two pages of the same route (e.g. one industry to another) updates the headline correctly.
- **Light on load.** Scroll effects split their text half a viewport before it scrolls into view. Pointer effects
  split on first use, and touch devices never split for them.
- **Only cheap properties.** Effects animate `transform`, `opacity` and `font-weight` (variable axis), and
  `will-change` is never set.
- **Fonts.** The display face (`@fontsource-variable/bricolage-grotesque/opsz.css`) has `wght` 200–800 and `opsz`.
  The `wdth` axis is only in the 55 KB larger `standard.css` file, so it isn't used.

## Connecting the contact form

All sending logic is in `src/lib/contact/submit.ts` (`submitContactForm`). The form only needs it to resolve on
success and throw on failure. It already shows the success, error and validation messages.

- **Quickest:** set `PUBLIC_CONTACT_ENDPOINT` (declared in `src/env.ts`) in `.env` or your host's settings to a URL that
  accepts a JSON `POST` of `{ name, email, message }`, for example a form service or a serverless function. Rebuild.
- **Custom:** replace the body of `submitContactForm` with your own call, such as a `src/routes/api/contact/+server.ts`
  endpoint that sends an email.

Without an endpoint, development simulates success. Production shows the error message, which points visitors to
enquiries@weareproxie.com.
