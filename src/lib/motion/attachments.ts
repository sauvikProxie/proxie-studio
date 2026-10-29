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
import {
	DESKTOP,
	distance,
	duration,
	ease,
	FINE_POINTER,
	MOTION_OK,
	MOTION_REDUCED,
	revealStart,
	stagger
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
