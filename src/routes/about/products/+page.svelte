<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import ItemList from '#lib/components/sections/ItemList.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import ArrowLink from '#lib/components/ui/ArrowLink.svelte';
	import Heading from '#lib/components/ui/Heading.svelte';
	import Media from '#lib/components/ui/Media.svelte';
	import { products } from '#lib/content/company.ts';
	import { productArt } from '#lib/content/media.ts';
	import { reveal } from '#lib/motion/attachments.ts';
</script>

<Seo seo={products.seo} />

<PageHero hero={products.hero} crumbs={[{ label: 'About', href: '/about' }]} />

{#each products.items as product, i (product.id)}
	<section class="section" id={product.id} aria-labelledby="{product.id}-heading">
		<div class="container">
			<div class="product frame" class:alt={i % 2 === 1}>
				<div class="art">
					<Media art={productArt[product.id]} seed={product.id} ratio="4 / 3" class="product-media" />
				</div>
				<div class="content">
					<div class="intro" {@attach reveal({ children: '[data-reveal]' })}>
						<span class="eyebrow" data-reveal>Our Products</span>
						<div>
							<Heading text={product.name} level={2} size="xl" id="{product.id}-heading" />
						</div>
						<p class="body" data-reveal>{product.body}</p>
					</div>
					<ItemList items={product.items.map((text) => ({ text }))} variant="list" />
					<div class="privacy"><ArrowLink link={product.privacy} tone="accent" /></div>
				</div>
			</div>
		</div>
	</section>
{/each}

<NextStep closing={products.closing} />

<style>
	.product {
		display: grid;
		gap: clamp(0.5rem, 0.3rem + 0.6vw, 0.875rem);
	}

	.art :global(.product-media) {
		height: 100%;
		border-radius: var(--radius-xl);
		box-shadow: none;
	}

	.content {
		display: grid;
		gap: var(--space-8);
		align-content: start;
		padding: clamp(1.5rem, 1rem + 2.5vw, 3.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
	}

	.intro {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
	}

	.body {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
		max-width: 46ch;
	}

	@media (min-width: 64rem) {
		.product {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}

		.product.alt .art {
			order: 2;
		}

		.art {
			position: sticky;
			top: calc(var(--header-h) + var(--space-6));
			align-self: start;
		}
	}
</style>
