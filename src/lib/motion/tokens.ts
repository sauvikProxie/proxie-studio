/**
 * Motion tokens for GSAP. Mirrors the CSS custom properties in
 * src/lib/styles/tokens.css so CSS transitions and GSAP tweens share
 * one rhythm. Durations are in seconds (GSAP), CSS uses milliseconds.
 */

export const duration = {
	instant: 0.12,
	fast: 0.22,
	base: 0.45,
	slow: 0.8,
	slower: 1.2,
	/** SVG line drawing */
	draw: 1.6,
	drawSlow: 2.6
} as const;

export const ease = {
	/** Default for entrances; matches --ease-out cubic-bezier(0.16, 1, 0.3, 1) */
	out: 'expo.out',
	/** Softer entrance for larger elements */
	soft: 'power3.out',
	/** Matches --ease-in-out */
	inOut: 'power3.inOut',
	/** Scrubbed / scroll-linked motion */
	linear: 'none',
	/** Small overshoot for markers */
	pop: 'back.out(2.2)'
} as const;

export const stagger = {
	/** Per character (hover lift, scroll tighten) */
	char: 0.02,
	tight: 0.06,
	base: 0.1,
	loose: 0.16
} as const;

export const distance = {
	/** Vertical offset for fade-up reveals, in px */
	reveal: 28,
	/** Parallax travel, in percent of the element's height */
	parallax: 8,
	/** Masked line rise: start offset in percent of the line's height (clears the mask's 0.3em overreach) */
	rise: 140,
	/** Character/word lift on hover and pointer proximity, in percent of its height */
	lift: -12
} as const;

/** ScrollTrigger start position for reveals. */
export const revealStart = 'top 86%';

/* ------------------------------------------------------------------ */
/* Kinetic typography                                                  */
/* ------------------------------------------------------------------ */

export const kinetic = {
	/** Sweep: opacity of words not yet scrolled past */
	sweepFrom: 0.18,
	/** Tighten: weight characters start from before settling at the heading's own weight */
	weightLight: 300,
	/** Hover and proximity: extra weight at the pointer */
	weightBoost: 110,
	/** Proximity: falloff radius, in multiples of the font size */
	radius: 2.2,
	/** Velocity: degrees of skew per px/frame of scroll velocity */
	skewPerVelocity: 0.08,
	/** Velocity: maximum skew in degrees, so text never gets hard to read */
	skewMax: 4,
	/** Scrubbed effects: catch-up smoothing in seconds (ScrollTrigger scrub) */
	scrub: 0.6
} as const;

/** ScrollTrigger [start, end] for the scrubbed text effects. */
export const kineticRange = {
	sweep: ['top 82%', 'bottom 52%'],
	tighten: ['top 95%', 'top 55%']
} as const;

export type KineticScroll = 'rise' | 'sweep' | 'tighten' | 'velocity';
export type KineticPointer = 'proximity' | 'hover';

export interface KineticOptions {
	/** Scroll-driven effect(s) */
	scroll?: KineticScroll | readonly KineticScroll[];
	/** Pointer effect; only runs with a fine pointer that can hover */
	pointer?: KineticPointer;
	/** What pointer/sweep effects split into: chars for headings, words for paragraphs */
	unit?: 'chars' | 'words';
	/** Selector (matched with closest()) for the hover/proximity area; defaults to the card or parent */
	zone?: string;
}

/**
 * One place to change how each kind of text moves. Use a preset name with
 * <Heading kinetic="…"> or {@attach kinetic('…')}, or pass KineticOptions
 * for a one-off.
 */
export const kineticPresets = {
	/** H1s: heroIntro already plays the masked line rise on load */
	hero: { pointer: 'proximity' },
	/** Section H2s */
	section: { scroll: 'rise' },
	/** The closing call-to-action headline (signature moment) */
	cta: { scroll: ['rise', 'tighten'], pointer: 'proximity' },
	/** Statements and large pull quotes; split into words, never characters */
	statement: { scroll: 'sweep', pointer: 'proximity', unit: 'words' },
	/** Titles of clickable cards: the card's hover or keyboard focus lifts the letters */
	card: { pointer: 'hover', zone: 'a, button, li' },
	/** Oversized numerals */
	numeral: { scroll: 'velocity' }
} as const satisfies Record<string, KineticOptions>;

export type KineticPreset = keyof typeof kineticPresets;

/** Media queries used with gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';
export const DESKTOP = '(min-width: 64rem)';
