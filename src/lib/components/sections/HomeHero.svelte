<script lang="ts">
	import { aboutStats, testimonials } from '#lib/content/blocks.ts';
	import type { Hero, Link } from '#lib/content/types.ts';
	import { photos } from '#lib/content/media.ts';
	import { heroIntro, parallax } from '#lib/motion/attachments.ts';
	import Button from '../ui/Button.svelte';
	import Heading from '../ui/Heading.svelte';
	import Media from '../ui/Media.svelte';
	import LogoMarquee from './LogoMarquee.svelte';

	/**
	 * Home hero: eyebrow, split-revealed headline, CTAs, light glows and
	 * floating testimonial cards (wide screens), then the client logos and a
	 * large aurora photo with key facts in a glass panel.
	 */
	let { hero }: { hero: Hero & { eyebrow: string; secondary: Link } } = $props();

	// Excerpts float around the headline; the full quotes are in the testimonials section.
	const floating = [
		{ t: testimonials.rajesh, side: 'left', top: '16%', depth: 'far' },
		{ t: testimonials.erik, side: 'left', top: '50%', depth: 'near' },
		{ t: testimonials.michelle, side: 'right', top: '12%', depth: 'near' },
		{ t: testimonials.kayla, side: 'right', top: '48%', depth: 'far' }
	] as const;

	const facts = aboutStats.filter((s) => s.value.length <= 2);
</script>

<section class="hero">
	<div class="lights" aria-hidden="true">
		<div class="glow g1"></div>
		<div class="glow glow--lime g2"></div>
		<div class="beam"></div>
	</div>

	<div class="stage container" {@attach heroIntro()}>
		<div class="quotes" aria-hidden="true">
			{#each floating as q, i (q.t.id)}
				<div class="quote quote--{q.side} quote--{q.depth}" style="top: {q.top}; --i: {3 + i}" data-hero-fade>
					<div class="float" style="animation-delay: {i * -1.7}s">
						<p>“{q.t.quote}”</p>
						<span>– {q.t.name}</span>
					</div>
				</div>
			{/each}
		</div>

		<div class="copy">
			<span class="eyebrow" data-hero-fade style="--i: 0">{hero.eyebrow}</span>
			<Heading text={hero.headline} level={1} size="hero" hero class="title" />
			{#if hero.sub}
				<p class="sub" data-hero-fade style="--i: 1">{hero.sub}</p>
			{/if}
			<div class="actions" data-hero-fade style="--i: 2">
				{#if hero.cta}<Button href={hero.cta.href} label={hero.cta.label} size="lg" />{/if}
				<Button href={hero.secondary.href} label={hero.secondary.label} size="lg" variant="light" arrow={false} />
			</div>
		</div>
	</div>

	<div class="trusted">
		<LogoMarquee />
	</div>

	<div class="container showcase">
		<Media photo={photos.home} ratio="21 / 9" class="showcase-media" sizes="(min-width: 84rem) 82rem, 96vw">
			<div class="facts" {@attach parallax(-6)}>
				{#each facts as fact (fact.label)}
					<div class="fact">
						<span class="fact-value">{fact.value}</span>
						<span class="fact-label">{fact.label}</span>
					</div>
				{/each}
			</div>
		</Media>
	</div>
</section>

<style>
	.hero {
		position: relative;
		padding-top: calc(var(--header-h) + clamp(2.5rem, 1rem + 6vw, 6.5rem));
		overflow: hidden;
	}

	/* ---------- Light ---------- */
	.lights {
		position: absolute;
		inset: 0 0 auto;
		height: min(70rem, 120vh);
		pointer-events: none;
	}

	.g1 {
		width: 60rem;
		height: 42rem;
		left: -18rem;
		top: -16rem;
		opacity: 0.55;
	}

	.g2 {
		width: 46rem;
		height: 34rem;
		right: -16rem;
		top: 4rem;
		opacity: 0.55;
	}

	.beam {
		position: absolute;
		left: 18%;
		top: -20%;
		width: 26rem;
		height: 140%;
		background: linear-gradient(180deg, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0));
		transform: rotate(32deg);
		filter: blur(40px);
		opacity: 0.7;
	}

	/* ---------- Copy ---------- */
	.stage {
		position: relative;
	}

	.copy {
		position: relative;
		z-index: 1;
		display: grid;
		justify-items: center;
		gap: var(--space-6);
		text-align: center;
		padding-bottom: clamp(3rem, 2rem + 4vw, 5rem);
	}

	.copy :global(.title) {
		max-width: 13ch;
	}

	.sub {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
		max-width: 36ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-3);
		margin-top: var(--space-2);
	}

	/* ---------- Floating quotes ---------- */
	.quotes {
		display: none;
	}

	.quote {
		position: absolute;
		width: 15rem;
	}

	.quote > div {
		padding: var(--space-4) var(--space-5);
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.85);
		box-shadow: var(--ring), var(--shadow-md);
	}

	.quote p {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: var(--text-xs);
		line-height: 1.45;
		color: var(--color-ink);
	}

	.quote span {
		display: block;
		margin-top: var(--space-2);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-ink-subtle);
	}

	.quote--left {
		left: var(--gutter);
	}

	.quote--right {
		right: var(--gutter);
	}

	.quote--far {
		opacity: 0.5;
		filter: blur(1.5px);
	}

	.quote--left.quote--far {
		left: calc(var(--gutter) - 2.5rem);
	}

	.quote--right.quote--far {
		right: calc(var(--gutter) - 2.5rem);
	}

	@media (min-width: 80rem) {
		.quotes {
			display: block;
		}
	}

	/* ---------- Trusted by + showcase ---------- */
	.trusted :global(.trusted) {
		padding-block: 0 var(--space-12);
	}

	.trusted :global(.label) {
		text-align: center;
	}

	.showcase :global(.showcase-media) {
		min-height: 22rem;
	}

	.facts {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-2);
		border-radius: var(--radius-lg);
		background: rgb(10 15 12 / 0.35);
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.18);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
	}

	.fact {
		display: grid;
		gap: 0.125rem;
		min-width: 7.5rem;
		padding: var(--space-3) var(--space-5);
		border-radius: var(--radius-md);
		background: rgb(255 255 255 / 0.08);
		color: #fff;
	}

	.fact-value {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 560;
		line-height: 1;
		color: var(--color-lime);
	}

	.fact-label {
		font-size: var(--text-sm);
		font-weight: 560;
	}

	@media (max-width: 47.99rem) {
		.showcase :global(.showcase-media) {
			aspect-ratio: 4 / 5 !important;
		}

		.fact {
			min-width: 0;
			padding: var(--space-3) var(--space-4);
		}
	}
</style>
