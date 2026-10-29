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

- `src/lib/motion/tokens.ts`: durations, easings, stagger and distances for GSAP (mirrors the CSS motion tokens).
- `src/lib/motion/gsap.ts`: registers plugins in the browser only.
- `src/lib/motion/smooth-scroll.ts`: Lenis, driven by the GSAP ticker and feeding ScrollTrigger.
- `src/lib/motion/attachments.ts`: every animation as a Svelte attachment (`reveal`, `heroIntro`, `drawPaths`,
  `parallax`, `imageReveal`, `magnetic`, `stepSequence`, `launchGraph`, `artReveal`, `mediaReveal`). Each runs inside `gsap.matchMedia()` and
  reverts on destroy, so nothing leaks between pages.
- Page transitions use the View Transitions API (`+layout.svelte`), with a short GSAP fade as the fallback.
- With `prefers-reduced-motion: reduce`, Lenis, scroll-triggered motion, the marquee and the page transitions are off,
  and everything shows in its final state.
- Performance trade-off: the hero headline is hidden until SplitText (JavaScript) reveals it, which makes it the
  Largest Contentful Paint. Lighthouse mobile scores about 91 for performance (desktop 100). If JS is late (more than
  1.2 s), the headline just appears. For a mobile score of 100, remove the `.js [data-hero-title]` rule in `global.css`
  so the headline paints with the page.

## Connecting the contact form

All sending logic is in `src/lib/contact/submit.ts` (`submitContactForm`). The form only needs it to resolve on
success and throw on failure. It already shows the success, error and validation messages.

- **Quickest:** set `PUBLIC_CONTACT_ENDPOINT` (declared in `src/env.ts`) in `.env` or your host's settings to a URL that
  accepts a JSON `POST` of `{ name, email, message }`, for example a form service or a serverless function. Rebuild.
- **Custom:** replace the body of `submitContactForm` with your own call, such as a `src/routes/api/contact/+server.ts`
  endpoint that sends an email.

Without an endpoint, development simulates success. Production shows the error message, which points visitors to
enquiries@weareproxie.com.
