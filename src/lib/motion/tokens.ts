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
	tight: 0.06,
	base: 0.1,
	loose: 0.16
} as const;

export const distance = {
	/** Vertical offset for fade-up reveals, in px */
	reveal: 28,
	/** Parallax travel, in percent of the element's height */
	parallax: 8
} as const;

/** ScrollTrigger start position for reveals. */
export const revealStart = 'top 86%';

/** Media queries used with gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';
export const DESKTOP = '(min-width: 64rem)';
