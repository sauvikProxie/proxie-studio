<script lang="ts">
	import { industries } from '#lib/content/industries.ts';
	import { industryPhotos } from '#lib/content/media.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import Icon from '../ui/Icon.svelte';

	/** The four industries as photo cards with name, summary and arrow. */
	let { headingLevel = 3 }: { headingLevel?: 2 | 3 } = $props();
</script>

<ul class="cards" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.1 })}>
	{#each industries as industry, i (industry.slug)}
		{@const photo = industryPhotos[industry.slug]}
		<li class="card" class:card--wide={i === 0 || i === 3} data-reveal>
			<div class="photo">
				<enhanced:img
					src={photo.image}
					alt={photo.alt}
					sizes="(min-width: 64rem) 50vw, 96vw"
					loading="lazy"
					style="object-position: {photo.position ?? '50% 50%'}"
				/>
			</div>
			<div class="body">
				<div class="text">
					<svelte:element this={`h${headingLevel}`} class="name">
						<a href={industry.href} class="stretched">{industry.name}</a>
					</svelte:element>
					<p class="summary">{industry.summary}</p>
				</div>
				<span class="arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
			</div>
		</li>
	{/each}
</ul>

<style>
	.cards {
		display: grid;
		gap: var(--space-4);
	}

	.card {
		position: relative;
		display: grid;
		grid-template-rows: auto 1fr;
		padding: var(--space-2);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
		transition:
			transform var(--dur-slow) var(--ease-out),
			box-shadow var(--dur-slow) var(--ease-out);
	}

	.card:hover {
		transform: translateY(-4px);
		box-shadow: var(--ring), var(--shadow-lg);
	}

	.photo {
		position: relative;
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - var(--space-2));
		background: var(--color-paper-sunken);
	}

	.photo :global(picture) {
		display: contents;
	}

	.photo :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transform: scale(1.02);
		transition: transform var(--dur-slower) var(--ease-out);
	}

	.card:hover .photo :global(img) {
		transform: scale(1.07);
	}

	.body {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5) var(--space-4) var(--space-4);
	}

	.text {
		display: grid;
		gap: var(--space-2);
	}

	.name {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
		line-height: 1.05;
	}

	.summary {
		color: var(--color-ink-muted);
		max-width: 44ch;
	}

	.arrow {
		display: grid;
		place-items: center;
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
		transition:
			transform var(--dur-base) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.card:hover .arrow {
		background: var(--color-accent);
		transform: rotate(-45deg);
	}

	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: var(--radius-xl);
	}

	.stretched:focus-visible {
		outline: none;
	}

	.stretched:focus-visible::after {
		outline: 2px solid var(--color-focus);
		outline-offset: 3px;
	}

	@media (min-width: 48rem) {
		.cards {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.cards {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}

		.card {
			grid-column: span 5;
		}

		.card--wide {
			grid-column: span 7;
		}

		.card--wide .photo,
		.card:not(.card--wide) .photo {
			aspect-ratio: auto;
			height: clamp(16rem, 12rem + 10vw, 24rem);
		}
	}
</style>
