<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ArtKind } from '../art/Art.svelte';
	import type { Hero, Link } from '#lib/content/types.ts';
	import type { Photo } from '#lib/content/media.ts';
	import { heroIntro } from '#lib/motion/attachments.ts';
	import Button from '../ui/Button.svelte';
	import Heading from '../ui/Heading.svelte';
	import Media from '../ui/Media.svelte';

	/**
	 * Hero for inner pages: soft light, breadcrumb pill, a large split-revealed
	 * headline, subheadline and CTA, then an optional full-width photo or
	 * code-made artwork.
	 */
	let {
		hero,
		crumbs = [],
		photo,
		art,
		seed,
		aside
	}: {
		hero: Hero;
		crumbs?: readonly Link[];
		photo?: Photo;
		art?: ArtKind;
		seed?: string;
		aside?: Snippet;
	} = $props();
</script>

<section class="hero">
	<div class="lights" aria-hidden="true">
		<div class="glow g1"></div>
		<div class="glow glow--lime g2"></div>
	</div>

	<div class="container" {@attach heroIntro()}>
		{#if crumbs.length}
			<nav class="crumbs eyebrow" aria-label="Breadcrumb" data-hero-fade style="--i: 0">
				<ol role="list">
					{#each crumbs as crumb (crumb.href)}
						<li><a href={crumb.href}>{crumb.label}</a></li>
					{/each}
				</ol>
			</nav>
		{/if}

		<Heading text={hero.headline} level={1} size="2xl" hero class="title" />

		{#if hero.sub || hero.cta || aside}
			<div class="meta">
				{#if hero.sub}
					<p class="sub" data-hero-fade style="--i: 1">{hero.sub}</p>
				{/if}
				{#if hero.cta}
					<div class="cta" data-hero-fade style="--i: 2">
						<Button href={hero.cta.href} label={hero.cta.label} size="lg" />
					</div>
				{/if}
				{#if aside}
					<div data-hero-fade style="--i: 3">{@render aside()}</div>
				{/if}
			</div>
		{/if}
	</div>

	{#if photo || art}
		<div class="container media" data-hero-fade style="--i: 3">
			<Media {photo} {art} {seed} ratio="21 / 9" priority={!!photo} reveal={false} class="hero-media" />
		</div>
	{/if}
</section>

<style>
	.hero {
		position: relative;
		padding-top: calc(var(--header-h) + clamp(3rem, 2rem + 5vw, 7rem));
		padding-bottom: clamp(3rem, 2rem + 4vw, 6rem);
		overflow: hidden;
	}

	.lights {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.g1 {
		width: 48rem;
		height: 34rem;
		left: -16rem;
		top: -14rem;
		opacity: 0.45;
	}

	.g2 {
		width: 36rem;
		height: 28rem;
		right: -14rem;
		top: 2rem;
		opacity: 0.4;
	}

	.container {
		position: relative;
	}

	.crumbs {
		margin-bottom: var(--space-8);
		white-space: normal;
	}

	.crumbs ol {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.crumbs li:not(:last-child)::after {
		content: '/';
		margin-left: var(--space-2);
		color: var(--color-ink-subtle);
	}

	.crumbs a {
		transition: color var(--dur-fast) var(--ease-out);
	}

	.crumbs a:hover {
		color: var(--color-accent);
	}

	.hero :global(.title) {
		max-width: 16ch;
	}

	.meta {
		display: grid;
		gap: var(--space-8);
		margin-top: clamp(2rem, 1.5rem + 2vw, 3.5rem);
	}

	.sub {
		font-size: var(--text-lg);
		line-height: var(--leading-normal);
		color: var(--color-ink-muted);
		max-width: 46ch;
	}

	.media {
		margin-top: clamp(2.5rem, 2rem + 3vw, 5rem);
	}

	.media :global(.hero-media) {
		min-height: 18rem;
	}

	@media (max-width: 47.99rem) {
		.media :global(.hero-media) {
			aspect-ratio: 4 / 3 !important;
		}
	}

	@media (min-width: 64rem) {
		.meta {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--space-8);
			align-items: end;
		}

		.meta > :global(*) {
			grid-column: 6 / -1;
		}
	}
</style>
