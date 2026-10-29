<script lang="ts">
	import { testimonials } from '#lib/content/blocks.ts';
	import type { Heading as HeadingText, TestimonialId } from '#lib/content/types.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import { MOTION_REDUCED } from '#lib/motion/tokens.ts';
	import Heading from '../ui/Heading.svelte';
	import Icon from '../ui/Icon.svelte';

	/**
	 * Swipeable testimonial carousel built on native scroll-snap (touch and
	 * trackpad swipe for free), with Previous/Next buttons, slide dots and
	 * arrow-key support when the track has focus.
	 */
	let {
		heading,
		ids,
		eyebrow
	}: { heading: HeadingText; ids: readonly TestimonialId[]; eyebrow?: string } = $props();

	const items = $derived(ids.map((id) => testimonials[id]));
	let track: HTMLElement | undefined = $state();
	let active = $state(0);
	let atStart = $state(true);
	let atEnd = $state(false);

	function slides() {
		return Array.from(track?.children ?? []) as HTMLElement[];
	}

	function goTo(index: number) {
		const slide = slides()[Math.max(0, Math.min(items.length - 1, index))];
		if (!slide || !track) return;
		const reduced = window.matchMedia(MOTION_REDUCED).matches;
		track.scrollTo({
			left: slide.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft),
			behavior: reduced ? 'auto' : 'smooth'
		});
	}

	function onScroll() {
		if (!track) return;
		const max = track.scrollWidth - track.clientWidth;
		atStart = track.scrollLeft <= 4;
		atEnd = track.scrollLeft >= max - 4;
		// The active slide is the one whose left edge is nearest the track's scroll position
		// (the track is position: relative, so slide offsets are measured from it)
		const left = track.scrollLeft + parseFloat(getComputedStyle(track).paddingLeft);
		let best = 0;
		slides().forEach((s, i) => {
			if (Math.abs(s.offsetLeft - left) < Math.abs(slides()[best].offsetLeft - left)) best = i;
		});
		active = atEnd ? items.length - 1 : best;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			goTo(active + 1);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goTo(active - 1);
		} else if (event.key === 'Home') {
			event.preventDefault();
			goTo(0);
		} else if (event.key === 'End') {
			event.preventDefault();
			goTo(items.length - 1);
		}
	}

	$effect(() => {
		onScroll();
		const ro = new ResizeObserver(onScroll);
		if (track) ro.observe(track);
		return () => ro.disconnect();
	});
</script>

<section class="section testimonials" aria-labelledby="testimonials-heading">
	<div class="container">
		<div class="head" {@attach reveal({ children: '[data-reveal]' })}>
			<div class="title">
				{#if eyebrow}<span class="eyebrow" data-reveal>{eyebrow}</span>{/if}
				<Heading text={heading} level={2} size="xl" id="testimonials-heading" />
			</div>
			<div class="controls" data-reveal>
				<button
					type="button"
					class="control"
					onclick={() => goTo(active - 1)}
					disabled={atStart}
					aria-controls="testimonial-track"
				>
					<Icon name="arrow-left" size={20} />
					<span class="sr-only">Previous</span>
				</button>
				<button
					type="button"
					class="control"
					onclick={() => goTo(active + 1)}
					disabled={atEnd}
					aria-controls="testimonial-track"
				>
					<Icon name="arrow" size={20} />
					<span class="sr-only">Next</span>
				</button>
			</div>
		</div>
	</div>

	<!-- A scrollable region must be focusable so keyboard users can scroll it (WCAG 2.1.1);
	     arrow keys then move between slides. -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
	<div
		id="testimonial-track"
		class="track"
		bind:this={track}
		onscroll={onScroll}
		onkeydown={onKeydown}
		tabindex="0"
		role="region"
		aria-roledescription="carousel"
		aria-labelledby="testimonials-heading"
		{@attach reveal({ children: '[data-reveal]', stagger: 0.12 })}
	>
		{#each items as t, i (t.id)}
			<div
				class="slide"
				class:is-active={i === active}
				role="group"
				aria-roledescription="slide"
				aria-label="{i + 1} / {items.length}"
				data-reveal
			>
				<figure class="card">
					<span class="mark" aria-hidden="true">“</span>
					<blockquote><p>{t.quote}</p></blockquote>
					<figcaption>
						{#if t.photo}
							<enhanced:img src={t.photo} alt={t.name} sizes="56px" loading="lazy" class="avatar" />
						{/if}
						<span class="who">
							<span class="name">{t.name}</span>
							<span class="org">{t.role ? `${t.role}, ${t.company}` : t.company}</span>
						</span>
					</figcaption>
				</figure>
			</div>
		{/each}
	</div>

	<div class="container">
		<div class="dots">
			{#each items as t, i (t.id)}
				<button
					type="button"
					class="dot"
					class:is-active={i === active}
					aria-current={i === active ? 'true' : undefined}
					onclick={() => goTo(i)}
				>
					<span class="sr-only">{i + 1} / {items.length}</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<style>
	.head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: var(--space-6);
		margin-bottom: var(--space-10);
	}

	.title {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
	}

	.controls {
		display: flex;
		gap: var(--space-2);
	}

	.control {
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			opacity var(--dur-fast) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}

	.control:hover:not(:disabled) {
		background: var(--color-accent);
		transform: scale(1.06);
	}

	.control:disabled {
		opacity: 0.25;
		cursor: default;
	}

	.track {
		position: relative;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(86%, 34rem);
		gap: var(--space-4);
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scroll-padding-inline: max(var(--gutter), calc((100vw - var(--container)) / 2));
		padding-inline: max(var(--gutter), calc((100vw - var(--container)) / 2));
		padding-block: var(--space-2) var(--space-6);
		scrollbar-width: none;
	}

	.track::-webkit-scrollbar {
		display: none;
	}

	.track:focus-visible {
		outline-offset: -2px;
		border-radius: var(--radius-lg);
	}

	.slide {
		scroll-snap-align: start;
		display: flex;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		width: 100%;
		padding: clamp(1.75rem, 1.2rem + 2vw, 3rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring), var(--shadow-sm);
		transition:
			transform var(--dur-slow) var(--ease-out),
			opacity var(--dur-slow) var(--ease-out);
	}

	.slide:not(.is-active) .card {
		opacity: 0.72;
		transform: scale(0.985);
	}

	.mark {
		display: block;
		height: 0.45em;
		font-family: var(--font-display);
		font-size: 4.5rem;
		line-height: 1;
		color: var(--color-accent);
	}

	blockquote {
		flex: 1;
	}

	blockquote p {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 450;
		line-height: 1.3;
		letter-spacing: var(--tracking-snug);
	}

	figcaption {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-line);
	}

	.avatar {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		object-fit: cover;
	}

	.who {
		display: grid;
	}

	.name {
		font-weight: 600;
	}

	.org {
		font-size: var(--text-sm);
		color: var(--color-ink-muted);
	}

	.dots {
		display: flex;
		gap: var(--space-2);
		margin-top: var(--space-2);
	}

	.dot {
		position: relative;
		width: 2.75rem;
		height: 1.5rem;
	}

	.dot::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 3px;
		border-radius: 2px;
		background: var(--color-line-strong);
		transform-origin: 0 50%;
	}

	.dot::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 3px;
		border-radius: 2px;
		background: var(--color-accent);
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.dot.is-active::after {
		transform: scaleX(1);
	}

	@media (min-width: 64rem) {
		.track {
			grid-auto-columns: calc((min(100vw, var(--container)) - 2 * var(--gutter) - var(--space-4)) / 2.15);
		}
	}
</style>
