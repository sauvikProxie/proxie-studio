<script lang="ts">
	import '@fontsource-variable/bricolage-grotesque/opsz.css';
	import '@fontsource-variable/instrument-sans/wght.css';
	import '#lib/styles/global.css';
	import displayFont from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2?url';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import Footer from '#lib/components/layout/Footer.svelte';
	import Header from '#lib/components/layout/Header.svelte';
	import { ui } from '#lib/components/layout/ui-state.svelte.ts';
	import { gsap, ScrollTrigger } from '#lib/motion/gsap.ts';
	import { getLenis, startSmoothScroll } from '#lib/motion/smooth-scroll.ts';
	import { duration, ease, MOTION_REDUCED } from '#lib/motion/tokens.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let main: HTMLElement | undefined = $state();

	const reducedMotion = () => window.matchMedia(MOTION_REDUCED).matches;

	// Lenis smooth scrolling, driving ScrollTrigger (disabled with reduced motion)
	$effect(() => startSmoothScroll());

	// Page transitions: View Transitions API where supported...
	onNavigate((navigation) => {
		if (!document.startViewTransition || reducedMotion()) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	afterNavigate((navigation) => {
		const lenis = getLenis();
		if (navigation.from && navigation.from.url.pathname !== navigation.to?.url.pathname) {
			// SvelteKit has already scrolled to the top (or to the #anchor); sync Lenis to it
			lenis?.scrollTo(window.scrollY, { immediate: true, force: true });
			// ...and a short fade as the fallback when it isn't
			if (!document.startViewTransition && !reducedMotion() && main) {
				gsap.fromTo(
					main,
					{ opacity: 0, y: 16 },
					{ opacity: 1, y: 0, duration: duration.base, ease: ease.out, clearProps: 'all' }
				);
			}
		}
		lenis?.resize();
		// Recalculate trigger positions once the new page has laid out
		requestAnimationFrame(() => ScrollTrigger.refresh());
	});
</script>

<svelte:head>
	<!-- Preload the display face only: it renders the hero headline (the LCP element) -->
	<link rel="preload" href={displayFont} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<a class="skip-link" href="#main">Skip to content</a>

<Header />

<div class="page" inert={ui.mobileOpen}>
	<main id="main" tabindex="-1" bind:this={main}>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.skip-link {
		position: fixed;
		top: var(--space-3);
		left: var(--space-3);
		z-index: var(--z-skip);
		padding: var(--space-3) var(--space-5);
		border-radius: var(--radius-pill);
		background: var(--color-ink);
		color: var(--color-paper);
		font-weight: 600;
		transform: translateY(-200%);
		transition: transform var(--dur-fast) var(--ease-out);
	}

	.skip-link:focus-visible {
		transform: none;
	}

	main {
		display: block;
		outline: none;
	}
</style>
