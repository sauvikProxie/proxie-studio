<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import ArrowLink from '#lib/components/ui/ArrowLink.svelte';
	import Heading from '#lib/components/ui/Heading.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import { processSteps } from '#lib/content/blocks.ts';
	import Media from '#lib/components/ui/Media.svelte';
	import { photos, pillarArt } from '#lib/content/media.ts';
	import { pillars, servicesOverview as page } from '#lib/content/services.ts';
	import { reveal } from '#lib/motion/attachments.ts';
</script>

<Seo seo={page.seo} />

<PageHero hero={page.hero} photo={photos.services} />

{#each pillars as pillar, i (pillar.slug)}
	<section class="section pillar" aria-labelledby="pillar-{pillar.slug}">
		<div class="container">
			<div class="pillar-grid">
				<div class="pillar-head" {@attach reveal({ children: '[data-reveal]' })}>
					<span class="index" aria-hidden="true" data-reveal>{String(i + 1).padStart(2, '0')}</span>
					<div data-reveal>
						<Heading text={pillar.name} level={2} size="xl" id="pillar-{pillar.slug}" />
					</div>
					<p class="body" data-reveal>{pillar.overviewBody}</p>
					<div data-reveal>
						<ArrowLink link={{ label: pillar.exploreLabel, href: pillar.href }} tone="accent" />
					</div>
					<div class="pillar-art">
						<Media art={pillarArt[pillar.slug]} seed={pillar.slug} ratio="4 / 3" />
					</div>
				</div>
				<ul class="services" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.06 })}>
					{#each pillar.services as service (service.slug)}
						<li data-reveal>
							<a href={service.href} class="service">
								<span>{service.name}</span>
								<Icon name="arrow" size={20} class="service-arrow" />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
{/each}

<!-- How we work (short version: step titles only) -->
<section class="section">
	<div class="container">
		<SectionIntro heading={page.howWeWork.heading} body={page.howWeWork.body} size="xl">
			{#snippet action()}
				<ArrowLink link={page.howWeWork.link} tone="accent" />
			{/snippet}
		</SectionIntro>
		<ol class="steps" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.08 })}>
			{#each processSteps as step (step.number)}
				<li class="step" data-reveal>
					<span class="step-number">{step.number}</span>
					<span class="step-title">{step.title}</span>
				</li>
			{/each}
		</ol>
	</div>
</section>

<NextStep closing={page.closing} />

<style>
	.pillar-grid {
		display: grid;
		gap: var(--space-8);
		padding-top: var(--space-8);
		border-top: 1px solid var(--color-line);
	}

	.pillar-head {
		display: grid;
		justify-items: start;
		align-content: start;
		gap: var(--space-5);
	}

	.pillar-art {
		width: 100%;
		margin-top: var(--space-4);
	}

	.index {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-accent);
	}

	.body {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
		max-width: 38ch;
	}

	.services {
		display: grid;
		align-content: start;
	}

	.service {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5) var(--space-2);
		border-bottom: 1px solid var(--color-line);
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 520;
		letter-spacing: var(--tracking-snug);
		transition:
			color var(--dur-fast) var(--ease-out),
			padding var(--dur-base) var(--ease-out);
	}

	.services li:first-child .service {
		border-top: 1px solid var(--color-line);
	}

	.service:hover {
		color: var(--color-accent);
	}

	.service :global(.service-arrow) {
		flex: none;
		transition: transform var(--dur-base) var(--ease-out);
	}

	.service:hover :global(.service-arrow) {
		transform: translateX(6px);
	}

	.steps {
		display: grid;
		gap: var(--space-3);
	}

	.step {
		display: grid;
		gap: var(--space-10);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
	}

	.step-number {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-accent);
	}

	.step-title {
		font-family: var(--font-display);
		font-size: var(--text-2xl);
		font-weight: 540;
		letter-spacing: var(--tracking-tight);
	}

	@media (min-width: 40rem) {
		.steps {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.pillar-grid {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
		}

		.pillar-head {
			position: sticky;
			top: calc(var(--header-h) + var(--space-8));
			align-self: start;
		}

		.steps {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
