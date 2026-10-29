<script lang="ts">
	import { testimonials } from '#lib/content/blocks.ts';
	import type { Section } from '#lib/content/types.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import ArrowLink from '../ui/ArrowLink.svelte';
	import Heading from '../ui/Heading.svelte';
	import ItemList from './ItemList.svelte';
	import QuoteBlock from './QuoteBlock.svelte';

	/**
	 * Renders a page's content sections (pillar, service and industry pages).
	 * Card grids get a stacked layout; everything else sits beside its heading.
	 */
	let { sections }: { sections: readonly Section[] } = $props();
</script>

{#each sections as section, i (i)}
	{@const stacked = section.itemStyle === 'cards' || !!section.quote}
	<section class="section content" id={section.id}>
		<div class="container">
			<div class="grid" class:stacked>
				<div class="head" {@attach reveal()}>
					{#if section.heading}
						<Heading text={section.heading} level={2} size="lg" />
					{/if}
				</div>
				<div class="body">
					{#if section.body}
						<p class="lead" {@attach reveal()}>{section.body}</p>
					{/if}
					{#if section.items && !stacked}
						<ItemList items={section.items} variant={section.itemStyle} />
					{/if}
					{#if section.link}
						<div {@attach reveal()}><ArrowLink link={section.link} tone="accent" /></div>
					{/if}
				</div>
			</div>

			{#if section.items && stacked}
				<div class="full frame">
					<ItemList
						items={section.items}
						variant={section.itemStyle}
						columns={section.items.length % 3 === 0 && section.items.length > 4 ? 3 : 2}
					/>
				</div>
			{/if}

			{#if section.quote}
				<div class="quote on-ink" data-surface="ink">
					<div class="dither" aria-hidden="true"></div>
					<QuoteBlock testimonial={testimonials[section.quote]} tone="ink" />
				</div>
			{/if}
		</div>
	</section>
{/each}

<style>
	.grid {
		display: grid;
		gap: var(--space-6) var(--space-8);
		padding-top: var(--space-8);
		border-top: 1px solid var(--color-line);
	}

	.body {
		display: grid;
		gap: var(--space-8);
		align-content: start;
	}

	.lead {
		font-size: var(--text-lg);
		line-height: 1.55;
		max-width: var(--measure);
	}

	.full {
		margin-top: var(--space-10);
	}

	.quote {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		margin-top: var(--space-12);
		padding: clamp(1.75rem, 1rem + 3vw, 4rem);
		border-radius: var(--radius-2xl);
		background: var(--color-ink);
		color: var(--color-on-ink);
	}

	.quote .dither {
		z-index: -1;
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: repeat(12, minmax(0, 1fr));
		}

		.head {
			grid-column: 1 / span 5;
		}

		.body {
			grid-column: 6 / -1;
		}

		/* Long single-column sections keep their heading in view */
		.grid:not(.stacked) .head {
			position: sticky;
			top: calc(var(--header-h) + var(--space-8));
			align-self: start;
		}
	}
</style>
