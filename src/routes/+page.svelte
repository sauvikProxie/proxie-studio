<script lang="ts">
	import Art from '#lib/components/art/Art.svelte';
	import LaunchGraph from '#lib/components/graph/LaunchGraph.svelte';
	import Seo from '#lib/components/layout/Seo.svelte';
	import CtaBlock from '#lib/components/sections/CtaBlock.svelte';
	import Founders from '#lib/components/sections/Founders.svelte';
	import HomeHero from '#lib/components/sections/HomeHero.svelte';
	import IndustryCards from '#lib/components/sections/IndustryCards.svelte';
	import PillarExplorer from '#lib/components/sections/PillarExplorer.svelte';
	import QuoteBlock from '#lib/components/sections/QuoteBlock.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import Testimonials from '#lib/components/sections/Testimonials.svelte';
	import ArrowLink from '#lib/components/ui/ArrowLink.svelte';
	import Heading from '#lib/components/ui/Heading.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import PMark from '#lib/components/ui/PMark.svelte';
	import { testimonials, twoWeeks } from '#lib/content/blocks.ts';
	import { home } from '#lib/content/home.ts';
	import { productArt } from '#lib/content/media.ts';
	import { site } from '#lib/content/site.ts';
	import { drawPaths, launchGraph, reveal } from '#lib/motion/attachments.ts';

	const whoIcons = ['layers', 'shield'] as const;
	const productIds = ['blind-companion', 'session-pilot'];
</script>

<Seo seo={home.seo} />

<HomeHero hero={home.hero} />

<!-- Who are we? (bento) -->
<section class="section" aria-labelledby="who-heading">
	<div class="container">
		<div class="bento frame" {@attach reveal({ children: '[data-reveal]', stagger: 0.08 })}>
			<article class="cell cell--intro" data-reveal>
				<h2 id="who-heading" class="eyebrow">{home.whoWeAre.heading}</h2>
				<p class="statement">{home.whoWeAre.body}</p>
			</article>

			<article class="cell cell--ink on-ink" data-reveal>
				<div class="dither" aria-hidden="true"></div>
				<div class="glow" aria-hidden="true"></div>
				<div class="cell-mark" aria-hidden="true">
					<PMark draw={drawPaths({ duration: 2.2 })} fill={false} />
				</div>
				<p class="positioning">{site.positioning}</p>
			</article>

			{#each home.whoWeAre.items as item, i (item.title)}
				<article class="cell cell--item" data-reveal>
					<span class="badge" aria-hidden="true"><Icon name={whoIcons[i]} size={20} /></span>
					<h3>{item.title}</h3>
					<p>{item.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- What we do -->
<section class="section">
	<div class="container">
		<SectionIntro eyebrow="Services" heading={home.whatWeDo.heading} body={home.whatWeDo.body} />
		<PillarExplorer />
	</div>
</section>

<!-- Meet the founders -->
<section class="section">
	<div class="container founders-grid">
		<div class="founders-copy" {@attach reveal({ children: '[data-reveal]' })}>
			<span class="eyebrow" data-reveal>About Proxie Studio</span>
			<div data-reveal>
				<Heading text={home.founders.heading} level={2} size="xl" />
			</div>
			<p class="body" data-reveal>{home.founders.body}</p>
			<div data-reveal><ArrowLink link={home.founders.link} tone="accent" /></div>
		</div>
		<Founders />
	</div>
</section>

<!-- From idea to impact -->
<section class="section impact" {@attach launchGraph()}>
	<div class="container">
		<SectionIntro
			eyebrow="From idea to impact"
			heading={home.ideaToImpact.heading}
			body={home.ideaToImpact.body}
			layout="center"
		/>

		<div class="frame impact-frame">
			<div class="impact-card">
				<div class="stat" {@attach reveal({ children: '[data-reveal]' })}>
					<p class="stat-value" data-reveal>
						<!-- Odometer: digits 0…n roll up in sync with the chart (transform only).
						     The final value is the CSS default, so it shows without JS. -->
						<span class="stat-number">
							<span class="sr-only">{twoWeeks.value}</span>
							<span class="digits" aria-hidden="true" data-counter style="--steps: {twoWeeks.value}">
								{#each Array.from({ length: twoWeeks.value + 1 }, (_, i) => i) as digit (digit)}
									<span>{digit}</span>
								{/each}
							</span>
						</span>
						<span class="stat-unit">{twoWeeks.unit}</span>
					</p>
					<p class="stat-caption" data-reveal>{twoWeeks.caption}</p>
				</div>
				<div class="graph">
					<LaunchGraph />
				</div>
			</div>

			<div class="impact-quote on-ink" data-surface="ink">
				<div class="dither" aria-hidden="true"></div>
				<QuoteBlock testimonial={testimonials.rajesh} tone="ink" />
			</div>
		</div>
	</div>
</section>

<!-- Industries we know -->
<section class="section">
	<div class="container">
		<SectionIntro eyebrow="Industries" heading={home.industries.heading} body={home.industries.body} />
		<IndustryCards />
	</div>
</section>

<!-- We build our own products, too -->
<section class="section">
	<div class="container">
		<SectionIntro
			eyebrow="Our Products"
			heading={home.products.heading}
			body={home.products.body}
			layout="center"
		/>
		<ul class="products" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.12 })}>
			{#each home.products.items as product, i (product.title)}
				<li class="product on-ink" data-reveal>
					<div class="product-art">
						<Art kind={productArt[productIds[i]]} seed={productIds[i]} />
					</div>
					<div class="product-body">
						<div>
							<h3 class="product-name">
								<a href={product.href} class="stretched">{product.title}</a>
							</h3>
							<p class="product-text">{product.text}</p>
						</div>
						<span class="product-arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>

<Testimonials eyebrow="Testimonials" heading={home.testimonials.heading} ids={['erik', 'michelle', 'kayla']} />

<CtaBlock />

<style>
	/* ---------- Who are we? (bento) ---------- */
	.bento {
		display: grid;
		gap: clamp(0.5rem, 0.3rem + 0.6vw, 0.875rem);
	}

	.cell {
		position: relative;
		overflow: hidden;
		display: grid;
		align-content: start;
		gap: var(--space-4);
		padding: clamp(1.5rem, 1rem + 2vw, 3rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
		isolation: isolate;
	}

	.cell--intro {
		justify-items: start;
		gap: var(--space-6);
	}

	.cell--intro h2.eyebrow {
		font-family: var(--font-text);
		font-size: var(--text-xs);
		line-height: 1.4;
		letter-spacing: 0.01em;
	}

	.statement {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 440;
		line-height: 1.18;
		letter-spacing: var(--tracking-snug);
		text-wrap: pretty;
	}

	.cell--ink {
		align-content: end;
		min-height: 20rem;
		background: var(--color-ink);
		color: var(--color-on-ink);
		box-shadow: none;
	}

	.cell--ink .dither {
		z-index: -1;
		--dither-mask: radial-gradient(80% 70% at 100% 0%, black, transparent 75%);
	}

	.cell--ink .glow {
		z-index: -1;
		width: 26rem;
		height: 22rem;
		right: -10rem;
		top: -10rem;
		opacity: 0.7;
	}

	.cell-mark {
		position: absolute;
		top: clamp(1.5rem, 1rem + 2vw, 3rem);
		left: clamp(1.5rem, 1rem + 2vw, 3rem);
		width: 4.5rem;
		--pmark-stroke: var(--color-lime);
		--pmark-width: 1.5;
	}

	.positioning {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 460;
		line-height: 1.25;
		letter-spacing: var(--tracking-snug);
	}

	.badge {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
	}

	.cell--item h3 {
		font-size: var(--text-xl);
		margin-top: var(--space-6);
	}

	.cell--item p {
		color: var(--color-ink-muted);
		max-width: 42ch;
	}

	/* Copy continues from a "Title: text" pair, so start the sentence with a capital */
	.cell--item p::first-letter,
	.product-text::first-letter {
		text-transform: uppercase;
	}

	/* ---------- Founders ---------- */
	.founders-grid {
		display: grid;
		gap: var(--space-12);
	}

	.founders-copy {
		display: grid;
		justify-items: start;
		align-content: start;
		gap: var(--space-6);
	}

	.body {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
		max-width: 40ch;
	}

	/* ---------- From idea to impact ---------- */
	.impact-frame {
		display: grid;
		gap: clamp(0.5rem, 0.3rem + 0.6vw, 0.875rem);
	}

	.impact-card {
		display: grid;
		gap: var(--space-10);
		padding: clamp(1.5rem, 1rem + 2.5vw, 3.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
	}

	.stat {
		display: grid;
		align-content: start;
		gap: var(--space-4);
	}

	.stat-value {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		font-family: var(--font-display);
		line-height: 0.9;
		letter-spacing: var(--tracking-tight);
	}

	.stat-number {
		display: inline-block;
		height: 1em;
		overflow: hidden;
		font-size: clamp(5rem, 3rem + 9vw, 10rem);
		font-weight: 560;
		line-height: 1;
		color: var(--color-accent);
		font-variant-numeric: tabular-nums;
	}

	.digits {
		display: grid;
		transform: translateY(calc(var(--steps) * -1em));
	}

	.digits > span {
		height: 1em;
	}

	.stat-unit {
		font-size: var(--text-3xl);
		font-weight: 520;
	}

	.stat-caption {
		color: var(--color-ink-muted);
		max-width: 28ch;
	}

	.graph {
		min-width: 0;
	}

	.impact-quote {
		position: relative;
		overflow: hidden;
		padding: clamp(1.75rem, 1rem + 3vw, 4rem);
		border-radius: var(--radius-xl);
		background: var(--color-ink);
		color: var(--color-on-ink);
		isolation: isolate;
	}

	.impact-quote .dither {
		z-index: -1;
	}

	/* ---------- Products ---------- */
	.products {
		display: grid;
		gap: var(--space-4);
	}

	.product {
		position: relative;
		display: grid;
		padding: var(--space-2);
		border-radius: var(--radius-xl);
		background: var(--color-ink);
		color: var(--color-on-ink);
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.product:hover {
		transform: translateY(-4px);
	}

	.product-art {
		aspect-ratio: 16 / 10;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - var(--space-2));
	}

	.product-body {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-6) var(--space-5) var(--space-5);
	}

	.product-name {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
		margin-bottom: var(--space-2);
	}

	.product-text {
		color: var(--color-on-ink-muted);
		max-width: 38ch;
	}

	.product-arrow {
		display: grid;
		place-items: center;
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--color-lime);
		color: var(--color-ink);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.product:hover .product-arrow {
		transform: rotate(-45deg);
	}

	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.stretched:focus-visible {
		outline: none;
	}

	.stretched:focus-visible::after {
		outline: 2px solid var(--color-lime);
		outline-offset: -4px;
		border-radius: var(--radius-xl);
	}

	@media (min-width: 48rem) {
		.products {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.cell--intro {
			grid-column: 1 / -1;
		}
	}

	@media (min-width: 64rem) {
		.bento {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.cell--intro {
			grid-column: 1 / span 2;
		}

		.cell--ink {
			grid-column: 3;
			grid-row: 1 / span 2;
		}

		.founders-grid {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
		}

		.founders-copy {
			align-self: start;
			position: sticky;
			top: calc(var(--header-h) + var(--space-10));
		}

		.impact-card {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2.6fr);
			align-items: center;
		}
	}
</style>
