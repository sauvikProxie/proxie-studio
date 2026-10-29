<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ArtKind } from '../art/Art.svelte';
	import Art from '../art/Art.svelte';
	import type { Photo } from '#lib/content/media.ts';
	import { mediaReveal } from '#lib/motion/attachments.ts';

	/**
	 * Large rounded media frame for a stock photo or code-made artwork.
	 * Scales in on scroll with a gentle inner parallax (transform only).
	 * `priority` loads the photo eagerly (above-the-fold heroes).
	 */
	let {
		photo,
		art,
		seed,
		ratio = '16 / 9',
		sizes = '(min-width: 84rem) 82rem, 96vw',
		priority = false,
		reveal = true,
		class: className = '',
		children
	}: {
		photo?: Photo;
		art?: ArtKind;
		seed?: string;
		ratio?: string;
		sizes?: string;
		priority?: boolean;
		reveal?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<figure class="media {className}" style="aspect-ratio: {ratio}" {@attach reveal && mediaReveal()}>
	<div class="inner" data-media-inner>
		{#if photo}
			<enhanced:img
				src={photo.image}
				alt={photo.alt}
				{sizes}
				loading={priority ? 'eager' : 'lazy'}
				fetchpriority={priority ? 'high' : undefined}
				style="object-position: {photo.position ?? '50% 50%'}"
				class="photo"
			/>
		{:else if art}
			<Art kind={art} {seed} />
		{/if}
	</div>
	{#if photo}<div class="tint" aria-hidden="true"></div>{/if}
	{#if children}
		<div class="overlay">{@render children()}</div>
	{/if}
</figure>

<style>
	.media {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		background: var(--color-ink);
		isolation: isolate;
		box-shadow: var(--shadow-lg);
	}

	.inner {
		position: absolute;
		inset: -8% 0;
	}

	.inner :global(picture) {
		display: contents;
	}

	.photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* A whisper of brand green in the shadows keeps every photo in one family */
	.tint {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgb(10 15 12 / 0) 50%, rgb(10 15 12 / 0.45) 100%),
			linear-gradient(0deg, rgb(11 122 69 / 0.12), rgb(11 122 69 / 0.12));
		mix-blend-mode: multiply;
		pointer-events: none;
	}

	.overlay {
		position: absolute;
		inset: auto 0 0 0;
		z-index: 1;
		padding: clamp(1rem, 0.6rem + 1.6vw, 2rem);
	}
</style>
