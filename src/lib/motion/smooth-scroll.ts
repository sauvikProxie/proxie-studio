/**
 * Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger and
 * Lenis share one animation frame. Disabled entirely with reduced motion
 * (and torn down / re-created live if the preference changes).
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { MOTION_REDUCED } from './tokens';

let lenis: Lenis | null = null;

export function getLenis() {
	return lenis;
}

/** Start smooth scrolling. Returns a cleanup function. */
export function startSmoothScroll(): () => void {
	const reduced = window.matchMedia(MOTION_REDUCED);
	let tick: ((time: number) => void) | null = null;

	const create = () => {
		if (reduced.matches || lenis) return;

		lenis = new Lenis({
			autoRaf: false,
			lerp: 0.11,
			smoothWheel: true,
			// Smooth-scroll same-page anchor links, leaving room for the fixed header
			anchors: { offset: -96 }
		});
		lenis.on('scroll', ScrollTrigger.update);

		tick = (time) => lenis?.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);
	};

	const destroy = () => {
		if (tick) gsap.ticker.remove(tick);
		tick = null;
		lenis?.destroy();
		lenis = null;
		gsap.ticker.lagSmoothing(500, 33);
	};

	const onChange = () => (reduced.matches ? destroy() : create());

	create();
	reduced.addEventListener('change', onChange);

	return () => {
		reduced.removeEventListener('change', onChange);
		destroy();
	};
}
