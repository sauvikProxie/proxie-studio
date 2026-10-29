/**
 * Single entry point for GSAP. Plugins are registered in the browser only,
 * never during SSR. Import gsap and plugins from here, not from 'gsap'.
 */
import { browser } from '$app/env';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (browser) {
	gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
	gsap.defaults({ overwrite: 'auto' });
	// Lenis drives scrolling; ScrollTrigger should not fight it on mobile resize.
	ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin };
