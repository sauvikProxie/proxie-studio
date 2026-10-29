/**
 * Svelte attachments for every animation on the site.
 *
 * Each one creates its tweens inside gsap.matchMedia(), so:
 * - with reduced motion nothing animates and final states show instantly,
 * - everything (tweens, ScrollTriggers, SplitText, inline styles) is
 *   reverted when the element is destroyed, so nothing leaks between pages.
 *
 * Usage: <section {@attach reveal({ children: '[data-reveal]' })}>
 */
import type { Attachment } from 'svelte/attachments';
import { DrawSVGPlugin, gsap, ScrollTrigger, SplitText } from './gsap';
import { getLenis } from './smooth-scroll';
import { kineticSplit } from './split';
import {
	DESKTOP,
	distance,
	duration,
	ease,
	FINE_POINTER,
	kinetic as k,
	kineticPresets,
	kineticRange,
	MOTION_OK,
	MOTION_REDUCED,
	revealStart,
	stagger,
	type KineticOptions,
	type KineticPreset,
	type KineticScroll
} from './tokens';

type Conditions = { motion: boolean; reduced: boolean };

/** Set on a title while another animation owns its split (pointer effects wait). */
const BUSY = 'data-kinetic-busy';

/** Run `setup` inside a matchMedia context that reverts on destroy. */
function withMotion(
	node: Element,
	setup: (conditions: Conditions, context: gsap.Context) => void | (() => void),
	extraQueries: Record<string, string> = {}
) {
	const mm = gsap.matchMedia();
	mm.add({ motion: MOTION_OK, reduced: MOTION_REDUCED, ...extraQueries }, (context) => {
		return setup(context.conditions as Conditions, context);
	}, node);
	return () => mm.revert();
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export interface RevealOptions {
	/** Selector for children to stagger. Omit to reveal the element itself. */
	children?: string;
	y?: number;
	delay?: number;
	stagger?: number;
	start?: string;
}

/** Subtle fade-up on scroll. Plays once. */
export function reveal(options: RevealOptions = {}): Attachment<HTMLElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			if (!motion) return;
			const targets = options.children
				? gsap.utils.toArray<HTMLElement>(options.children, node)
				: [node];
			if (!targets.length) return;

			gsap.from(targets, {
				opacity: 0,
				y: options.y ?? distance.reveal,
				duration: duration.slow,
				ease: ease.out,
				delay: options.delay ?? 0,
				stagger: options.stagger ?? stagger.base,
				scrollTrigger: { trigger: node, start: options.start ?? revealStart, once: true }
			});
		});
}

/* ------------------------------------------------------------------ */
/* Hero intro: SplitText masked line reveal                            */
/* ------------------------------------------------------------------ */

/**
 * Attach to a hero container. [data-hero-title] is split into masked lines
 * that slide up one by one. If it contains [data-line-group] children
 * (two-tone headlines), each group is split separately so the quieter line
 * keeps its colour. The subheadline/CTA ([data-hero-fade]) fade up with a CSS
 * animation that uses the same motion tokens (see global.css), so they paint
 * without waiting for JavaScript.
 */
export function heroIntro(): Attachment<HTMLElement> {
	return (node) => {
		const title = node.querySelector<HTMLElement>('[data-hero-title]');
		let split: SplitText | null = null;
		let cancelled = false;

		const cleanup = withMotion(node, ({ motion }) => {
			if (!title) return;
			// Already shown by the CSS fallback (JS arrived late): don't hide it again.
			const shownByFallback = getComputedStyle(title).visibility === 'visible';
			gsap.set(title, { visibility: 'visible' });
			if (!motion || shownByFallback) return;

			const groups = title.querySelectorAll<HTMLElement>('[data-line-group]');
			// Pointer effects on the title (kinetic) wait until the intro is done
			title.setAttribute(BUSY, '');
			// autoSplit re-splits when the webfont swaps in (or the width changes) and
			// carries the running tween over, so there's no need to wait for fonts.
			split = SplitText.create(groups.length ? groups : title, {
				type: 'lines',
				mask: 'lines',
				linesClass: 'split-line',
				tag: 'span',
				aria: 'none',
				autoSplit: true,
				onSplit: (self) =>
					gsap.from(self.lines, {
						yPercent: distance.rise,
						duration: duration.slower,
						ease: ease.out,
						stagger: stagger.base,
						delay: 0.05,
						// Restore natural text flow once revealed
						onComplete: () => {
							if (cancelled) return;
							self.revert();
							title.removeAttribute(BUSY);
						}
					})
			});

			return () => {
				split?.revert();
				split = null;
				title.removeAttribute(BUSY);
			};
		});

		return () => {
			cancelled = true;
			cleanup();
		};
	};
}

/* ------------------------------------------------------------------ */
/* SVG line drawing (the outlined "P" mark)                           */
/* ------------------------------------------------------------------ */

export interface DrawOptions {
	/** Play on load (hero) instead of on scroll. */
	immediate?: boolean;
	delay?: number;
	duration?: number;
}

/** Draws every [data-draw] path, then fades in [data-draw-fill]. */
export function drawPaths(options: DrawOptions = {}): Attachment<SVGElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			if (!motion) return;
			const paths = gsap.utils.toArray<SVGPathElement>('[data-draw]', node);
			const fills = gsap.utils.toArray<SVGElement>('[data-draw-fill]', node);

			const tl = gsap.timeline({
				delay: options.delay ?? 0,
				scrollTrigger: options.immediate
					? undefined
					: { trigger: node, start: 'top 80%', once: true }
			});
			tl.from(paths, {
				drawSVG: '0%',
				duration: options.duration ?? duration.drawSlow,
				ease: ease.inOut,
				stagger: stagger.loose
			});
			if (fills.length) {
				tl.from(fills, { opacity: 0, duration: duration.slower, ease: ease.soft }, '-=0.8');
			}
		});
}

/* ------------------------------------------------------------------ */
/* Parallax                                                            */
/* ------------------------------------------------------------------ */

/** Gentle scroll-linked vertical drift. `amount` is in percent of height. */
export function parallax(amount: number = distance.parallax): Attachment<HTMLElement | SVGElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			if (!motion) return;
			gsap.fromTo(
				node,
				{ yPercent: -amount },
				{
					yPercent: amount,
					ease: ease.linear,
					scrollTrigger: {
						trigger: node.parentElement ?? node,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		});
}

/* ------------------------------------------------------------------ */
/* Image reveal (founders): curtain wipe + scale-down, transform only  */
/* ------------------------------------------------------------------ */

export function imageReveal(options: { delay?: number } = {}): Attachment<HTMLElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			const curtain = node.querySelector<HTMLElement>('[data-curtain]');
			const media = node.querySelector<HTMLElement>('[data-media]');
			if (!motion) {
				if (curtain) gsap.set(curtain, { scaleY: 0 });
				return;
			}
			const tl = gsap.timeline({
				delay: options.delay ?? 0,
				scrollTrigger: { trigger: node, start: 'top 82%', once: true }
			});
			if (curtain) {
				tl.fromTo(
					curtain,
					{ scaleY: 1 },
					{ scaleY: 0, transformOrigin: '50% 0%', duration: duration.slower, ease: ease.inOut }
				);
			}
			if (media) {
				tl.from(media, { scale: 1.18, duration: duration.slower + 0.4, ease: ease.out }, 0.15);
			}
		});
}

/* ------------------------------------------------------------------ */
/* Magnetic hover (buttons)                                            */
/* ------------------------------------------------------------------ */

export function magnetic(strength = 0.25): Attachment<HTMLElement> {
	return (node) =>
		withMotion(
			node,
			({ motion }, context) => {
				const conditions = context.conditions as Conditions & { finePointer: boolean };
				if (!motion || !conditions.finePointer) return;

				const xTo = gsap.quickTo(node, 'x', { duration: duration.slow, ease: 'power3' });
				const yTo = gsap.quickTo(node, 'y', { duration: duration.slow, ease: 'power3' });

				const move = (event: PointerEvent) => {
					const rect = node.getBoundingClientRect();
					xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
					yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
				};
				const leave = () => {
					xTo(0);
					yTo(0);
				};

				node.addEventListener('pointermove', move);
				node.addEventListener('pointerleave', leave);
				return () => {
					node.removeEventListener('pointermove', move);
					node.removeEventListener('pointerleave', leave);
				};
			},
			{ finePointer: FINE_POINTER }
		);
}

/* ------------------------------------------------------------------ */
/* Sticky process steps                                                */
/* ------------------------------------------------------------------ */

/**
 * Highlights steps in turn while a tall wrapper scrolls past its sticky
 * inner panel (desktop + motion only). `onStep` receives the active index;
 * `onProgress` the overall progress (0–1) for a progress rail.
 */
export function stepSequence(
	count: number,
	onStep: (index: number) => void,
	onProgress?: (progress: number) => void
): Attachment<HTMLElement> {
	return (node) =>
		withMotion(
			node,
			(_, context) => {
				const conditions = context.conditions as Conditions & { desktop: boolean };
				if (!conditions.motion || !conditions.desktop) {
					onStep(-1);
					return;
				}
				onStep(0);
				const trigger = ScrollTrigger.create({
					trigger: node,
					start: 'top top+=96',
					end: 'bottom bottom',
					onUpdate: (self) => {
						onProgress?.(self.progress);
						onStep(Math.min(count - 1, Math.floor(self.progress * count)));
					}
				});
				return () => trigger.kill();
			},
			{ desktop: DESKTOP }
		);
}

/* ------------------------------------------------------------------ */
/* Launch graph sequence                                               */
/* ------------------------------------------------------------------ */

/**
 * Plays the launch-timeline chart once when it scrolls into view:
 * axes + grid fade in → "You Build it Alone" draws slowly → "With Proxie
 * Studio" draws faster and rises above it → the 2 Weeks marker pops in and
 * its label fades up. A [data-counter] digit column in the same container
 * rolls up to its value in sync (odometer style, transform only).
 */
export function launchGraph(): Attachment<HTMLElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			const counter = node.querySelector<HTMLElement>('[data-counter]');
			if (!motion) return;

			// Only the visible chart variant (wide or narrow) is animated.
			const chart = gsap.utils
				.toArray<HTMLElement>('[data-chart]', node)
				.find((el) => el.offsetParent !== null);
			if (!chart) return;

			const q = gsap.utils.selector(chart);
			const tl = gsap.timeline({
				scrollTrigger: { trigger: chart, start: 'top 78%', once: true }
			});

			tl.from(q('[data-chart-grid]'), {
				opacity: 0,
				duration: duration.slow,
				ease: ease.soft,
				stagger: stagger.tight
			})
				.from(q('[data-chart-legend] > *'), { opacity: 0, y: 10, duration: duration.base, stagger: stagger.tight }, '<0.1')
				.from(
					q('[data-line="alone"]'),
					{ drawSVG: '0%', duration: duration.drawSlow + 0.4, ease: 'power1.inOut' },
					'<0.2'
				)
				.addLabel('proxie', '<0.5')
				.from(
					q('[data-line="proxie"]'),
					{ drawSVG: '0%', duration: duration.draw, ease: ease.inOut },
					'proxie'
				)
				.from(q('[data-marker-line]'), { scaleY: 0, transformOrigin: '50% 100%', duration: duration.base, ease: ease.soft }, '-=0.35')
				.from(q('[data-marker-dot]'), { scale: 0, transformOrigin: '50% 50%', duration: duration.base, ease: ease.pop }, '-=0.15')
				.from(q('[data-marker-label]'), { opacity: 0, y: 14, duration: duration.base, ease: ease.out, stagger: stagger.base }, '-=0.2');

			if (counter) {
				// Odometer: roll the digit column from 0 up to its final value (CSS default)
				const steps = counter.children.length - 1;
				tl.fromTo(
					counter,
					{ y: 0 },
					{ y: () => -steps * counter.children[0].getBoundingClientRect().height, duration: duration.draw, ease: ease.inOut, clearProps: 'transform' },
					'proxie'
				);
			}
		});
}

export { DrawSVGPlugin };

/* ------------------------------------------------------------------ */
/* Code-made artwork build-in                                          */
/* ------------------------------------------------------------------ */

/**
 * Builds an <Art> scene in when it scrolls into view: groups fade up,
 * chart bars grow from the baseline and highlighted lines draw in.
 */
export function artReveal(): Attachment<SVGElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			// Skip scenes that aren't rendered (inside display: none): a run-once
			// trigger on them would fire and kill itself during ScrollTrigger's refresh.
			if (!motion || node.getClientRects().length === 0) return;
			const groups = gsap.utils.toArray<SVGElement>('[data-art-in]', node);
			const bars = gsap.utils.toArray<SVGElement>('[data-art-bar]', node);
			const draws = gsap.utils.toArray<SVGElement>('[data-art-draw]', node);
			const tl = gsap.timeline({ scrollTrigger: { trigger: node, start: 'top 85%', once: true } });
			if (groups.length)
				tl.from(groups, { opacity: 0, y: 24, duration: duration.slow, ease: ease.out, stagger: stagger.base });
			if (bars.length)
				tl.from(bars, { scaleY: 0, transformOrigin: '50% 100%', duration: duration.slow, ease: ease.out, stagger: 0.03 }, 0.15);
			if (draws.length)
				tl.from(draws, { drawSVG: '0%', duration: duration.draw, ease: ease.inOut, stagger: 0.04 }, 0.3);
		});
}

/* ------------------------------------------------------------------ */
/* Media frame: scale-in on scroll + inner parallax                    */
/* ------------------------------------------------------------------ */

/**
 * For large rounded photo/art frames: the frame eases from slightly smaller
 * (and rounder) to full size as it enters, while the inner media drifts.
 * [data-media-inner] is the element that drifts.
 */
export function mediaReveal(options: { parallax?: number } = {}): Attachment<HTMLElement> {
	return (node) =>
		withMotion(node, ({ motion }) => {
			if (!motion) return;
			const inner = node.querySelector<HTMLElement>('[data-media-inner]');
			gsap.fromTo(
				node,
				{ scale: 0.94 },
				{
					scale: 1,
					ease: ease.linear,
					scrollTrigger: { trigger: node, start: 'top 95%', end: 'top 45%', scrub: 0.6 }
				}
			);
			if (inner) {
				const amount = options.parallax ?? distance.parallax;
				gsap.fromTo(
					inner,
					{ yPercent: -amount },
					{
						yPercent: amount,
						ease: ease.linear,
						scrollTrigger: { trigger: node, start: 'top bottom', end: 'bottom top', scrub: true }
					}
				);
			}
		});
}

/* ------------------------------------------------------------------ */
/* Kinetic typography                                                  */
/* ------------------------------------------------------------------ */

/** A preset name from kineticPresets (motion/tokens.ts), one-off options, or false for none. */
export type KineticEffect = KineticPreset | KineticOptions | false;

function resolveKinetic(effect: KineticEffect) {
	if (!effect) return null;
	const options: KineticOptions = typeof effect === 'string' ? kineticPresets[effect] : effect;
	const scroll = new Set<KineticScroll>(
		options.scroll === undefined ? [] : typeof options.scroll === 'string' ? [options.scroll] : options.scroll
	);
	return { ...options, scroll };
}

/* Scroll velocity: one GSAP ticker callback shared by every subscriber, reading
   Lenis (which already drives ScrollTrigger), so no extra scroll listener. */
const velocitySubscribers = new Set<(skew: number) => void>();
let currentSkew = 0;

function velocityTick() {
	const velocity = getLenis()?.velocity ?? 0;
	const skew = gsap.utils.clamp(-k.skewMax, k.skewMax, -velocity * k.skewPerVelocity);
	// Skip negligible changes, but always deliver the exact return to rest
	if (skew === currentSkew || (skew !== 0 && Math.abs(skew - currentSkew) < 0.01)) return;
	currentSkew = skew;
	velocitySubscribers.forEach((set) => set(skew));
}

function onVelocity(set: (skew: number) => void) {
	if (!velocitySubscribers.size) gsap.ticker.add(velocityTick);
	velocitySubscribers.add(set);
	return () => {
		velocitySubscribers.delete(set);
		if (velocitySubscribers.size) return;
		gsap.ticker.remove(velocityTick);
		currentSkew = 0;
	};
}

type SplitItems = () => HTMLElement[] | null;

/** Lift (and, for locked characters, swell) every item; the card's hover or keyboard focus drives it. */
function hoverEffect(zone: HTMLElement, ensureSplit: SplitItems) {
	let items: HTMLElement[] | null = null;
	const enter = () => {
		items = ensureSplit();
		if (!items) return;
		gsap.to(items, {
			yPercent: distance.lift,
			'--kb': k.weightBoost,
			duration: duration.base,
			ease: ease.out,
			stagger: stagger.char,
			overwrite: true
		});
	};
	const leave = () => {
		if (!items) return;
		gsap.to(items, {
			yPercent: 0,
			'--kb': 0,
			duration: duration.base,
			ease: ease.out,
			stagger: { each: stagger.char, from: 'end' },
			overwrite: true
		});
	};
	const focusIn = (event: FocusEvent) => (event.target as Element).matches(':focus-visible') && enter();

	zone.addEventListener('pointerenter', enter);
	zone.addEventListener('pointerleave', leave);
	zone.addEventListener('focusin', focusIn);
	zone.addEventListener('focusout', leave);
	return () => {
		zone.removeEventListener('pointerenter', enter);
		zone.removeEventListener('pointerleave', leave);
		zone.removeEventListener('focusin', focusIn);
		zone.removeEventListener('focusout', leave);
		if (items) gsap.killTweensOf(items);
	};
}

interface ProximityPoint {
	x: number;
	y: number;
	f: number;
	boost: gsap.QuickToFunc;
	lift: gsap.QuickToFunc;
}

/**
 * Items near the pointer swell and lift, falling off with distance. One
 * pointermove listener stores the position; a GSAP ticker callback applies it
 * with quickTo. Positions are measured once when the pointer enters (page
 * coordinates, so scrolling doesn't invalidate them): no layout reads per frame.
 */
function proximityEffect(
	node: HTMLElement,
	zone: HTMLElement,
	ensureSplit: SplitItems,
	onResplit: (reset: () => void) => void
) {
	let points: ProximityPoint[] | null = null;
	let radius = 1;
	let x = 0;
	let y = 0;
	let dirty = false;

	const measure = () => {
		const items = ensureSplit();
		if (!items) return;
		radius = k.radius * (parseFloat(getComputedStyle(node).fontSize) || 16);
		const quick = { duration: duration.base, ease: 'power3' };
		points = items.map((item) => {
			const rect = item.getBoundingClientRect();
			return {
				x: rect.left + rect.width / 2 + window.scrollX,
				y: rect.top + rect.height / 2 + window.scrollY,
				f: 0,
				boost: gsap.quickTo(item, '--kb', quick),
				lift: gsap.quickTo(item, 'yPercent', quick)
			};
		});
	};

	const tick = () => {
		if (!dirty || !points) return;
		dirty = false;
		for (const point of points) {
			const distanceTo = Math.hypot(x - point.x, y - point.y);
			const linear = Math.max(0, 1 - distanceTo / radius);
			const f = linear * linear * (3 - 2 * linear); // smoothstep falloff
			if (f === point.f) continue;
			point.f = f;
			point.boost(k.weightBoost * f);
			point.lift(distance.lift * f);
		}
	};

	const rest = () => {
		points?.forEach((point) => {
			point.f = 0;
			point.boost(0);
			point.lift(0);
		});
		points = null;
	};

	const move = (event: PointerEvent) => {
		x = event.pageX;
		y = event.pageY;
		dirty = true;
		if (!points) measure(); // first move, or after a re-split
	};
	const enter = (event: PointerEvent) => {
		move(event);
		gsap.ticker.add(tick);
	};
	const leave = () => {
		gsap.ticker.remove(tick);
		rest();
	};

	onResplit(() => (points = null));
	zone.addEventListener('pointerenter', enter);
	zone.addEventListener('pointermove', move);
	zone.addEventListener('pointerleave', leave);
	return () => {
		zone.removeEventListener('pointerenter', enter);
		zone.removeEventListener('pointermove', move);
		zone.removeEventListener('pointerleave', leave);
		gsap.ticker.remove(tick);
		points = null;
	};
}

/**
 * Kinetic typography for headings and prominent text. Pick a preset from
 * kineticPresets (motion/tokens.ts) or pass options:
 *
 *   <h2 {@attach kinetic('section')}>      or  <Heading kinetic="cta" …>
 *   <p {@attach kinetic({ scroll: 'sweep', unit: 'words' })}>
 *
 * Scroll effects:
 * - rise: lines rise out of a mask, once (two-tone lines rise in turn)
 * - sweep: words go from faint to full opacity in reading order, scrubbed
 * - tighten: characters scrub from a light weight to the text's own weight
 * - velocity: skews with scroll speed, clamped, easing back to rest
 * Pointer effects (fine pointer only; keyboard focus triggers hover too):
 * - proximity: characters near the pointer swell in weight and lift
 * - hover: the card's hover/focus lifts the characters in a quick stagger
 *
 * With reduced motion nothing is split and the text shows as is. Everything
 * (SplitText, tweens, triggers, listeners, labels) reverts on destroy.
 */
export function kinetic(effect: KineticEffect = 'section'): Attachment<HTMLElement> {
	return (node) => {
		const options = resolveKinetic(effect);
		if (!options) return;
		let alive = true;

		const cleanup = withMotion(
			node,
			(conditions, context) => {
				const { motion, finePointer } = conditions as Conditions & { finePointer: boolean };
				if (!motion) return;

				const { scroll } = options;
				const pointer = finePointer ? options.pointer : undefined;
				const words = options.unit === 'words';
				const rise = scroll.has('rise');
				const needsUnit = scroll.has('sweep') || scroll.has('tighten') || !!pointer;
				const unit = needsUnit ? (words ? 'words' : 'chars') : undefined;
				const restWeight = Number(getComputedStyle(node).fontWeight) || 400;
				const disposers: (() => void)[] = [];

				if (scroll.has('velocity')) {
					const skewTo = gsap.quickTo(node, 'skewY', { duration: duration.slow, ease: 'power3' });
					disposers.push(onVelocity(skewTo));
				}

				let split: SplitText | null = null;
				let risen = false;
				// Scrubbed tweens belong to one split; killed before a re-split
				let scrubbed: gsap.core.Tween[] = [];
				const killScrubbed = () => {
					scrubbed.forEach((tween) => {
						tween.scrollTrigger?.kill();
						tween.kill();
					});
					scrubbed = [];
				};

				const unclip = (self: SplitText) => gsap.set(self.masks, { overflow: 'visible' });
				// Pointer effects drop their cached positions when the text is re-split
				let onResplit = () => {};

				const create = () =>
					context.add(() => {
						split = kineticSplit(node, {
							lines: rise || unit === 'chars',
							mask: rise,
							unit,
							inlineWords: words && !pointer,
							alive: () => alive,
							onSplit(self, weighted) {
								onResplit();
								if (scroll.has('sweep')) {
									const [start, end] = kineticRange.sweep;
									scrubbed.push(
										gsap.fromTo(
											self.words,
											{ opacity: k.sweepFrom },
											{
												opacity: 1,
												ease: ease.linear,
												stagger: stagger.base,
												scrollTrigger: { trigger: node, start, end, scrub: k.scrub }
											}
										)
									);
								}
								if (scroll.has('tighten') && weighted) {
									const [start, end] = kineticRange.tighten;
									scrubbed.push(
										gsap.fromTo(
											self.chars,
											{ '--kw': k.weightLight },
											{
												'--kw': restWeight,
												ease: ease.linear,
												stagger: stagger.char,
												scrollTrigger: { trigger: node, start, end, scrub: k.scrub }
											}
										)
									);
								}
								if (!rise) return;
								if (risen) {
									unclip(self);
									return;
								}
								// Returned so autoSplit carries its progress over a re-split
								return gsap.from(self.lines, {
									yPercent: distance.rise,
									duration: duration.slower,
									ease: ease.out,
									stagger: stagger.base,
									scrollTrigger: { trigger: node, start: revealStart, once: true },
									onComplete: () => {
										risen = true;
										if (!alive) return;
										// Rise only: back to plain text. Otherwise keep the split, unmasked.
										if (unit) unclip(self);
										else self.revert();
									}
								});
							},
							onRevert: killScrubbed
						});
					});

				// Scroll effects split up front; pointer-only effects split on first use
				if (rise || scroll.has('sweep') || scroll.has('tighten')) create();

				if (pointer) {
					const zone = (options.zone && node.closest<HTMLElement>(options.zone)) || node.parentElement || node;
					const ensureSplit = () => {
						if (node.hasAttribute(BUSY)) return null; // the hero intro still owns the text
						if (!split) create();
						return split ? ((words ? split.words : split.chars) as HTMLElement[]) : null;
					};
					disposers.push(
						pointer === 'hover' ? hoverEffect(zone, ensureSplit) : proximityEffect(node, zone, ensureSplit, (reset) => (onResplit = reset))
					);
				}

				return () => {
					disposers.forEach((dispose) => dispose());
					killScrubbed();
					split?.revert();
					split = null;
				};
			},
			{ finePointer: FINE_POINTER }
		);

		return () => {
			alive = false;
			cleanup();
		};
	};
}
