<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import CtaBlock from '#lib/components/sections/CtaBlock.svelte';
	import Founders from '#lib/components/sections/Founders.svelte';
	import ItemList from '#lib/components/sections/ItemList.svelte';
	import LogoMarquee from '#lib/components/sections/LogoMarquee.svelte';
	import OfficeCards from '#lib/components/sections/OfficeCards.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import ProcessSteps from '#lib/components/sections/ProcessSteps.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import StatGrid from '#lib/components/sections/StatGrid.svelte';
	import Heading from '#lib/components/ui/Heading.svelte';
	import { aboutStats, values } from '#lib/content/blocks.ts';
	import { about } from '#lib/content/company.ts';
	import { photos } from '#lib/content/media.ts';
	import { reveal } from '#lib/motion/attachments.ts';
</script>

<Seo seo={about.seo} />

<PageHero hero={about.hero} photo={photos.about} />

<!-- Key facts -->
<section class="facts">
	<div class="container">
		<StatGrid stats={aboutStats} />
	</div>
</section>

<LogoMarquee />

<!-- Our story -->
<section class="section">
	<div class="container story" {@attach reveal({ children: '[data-reveal]' })}>
		<div>
			<Heading text={about.story.heading} level={2} size="lg" />
		</div>
		<p class="story-text" data-reveal>{about.story.body}</p>
	</div>
</section>

<!-- Our vision and mission -->
<section class="section">
	<div class="container">
		<div class="vision on-ink" data-surface="ink">
			<div class="vision-head" {@attach reveal({ children: '[data-reveal]' })}>
				<div>
					<Heading text={about.visionMission.heading} level={2} size="xl" />
				</div>
				<p class="vision-text" data-reveal>
					<strong>{about.visionMission.visionLabel}:</strong>
					{about.visionMission.vision}
				</p>
			</div>
			<ol class="mission" role="list" {@attach reveal({ children: '[data-reveal]' })}>
				{#each about.visionMission.mission as item, i (i)}
					<li data-reveal>
						<span class="mission-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
						<p>{item}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<!-- The people behind Proxie -->
<section class="section">
	<div class="container people">
		<div class="people-copy" {@attach reveal({ children: '[data-reveal]' })}>
			<div>
				<Heading text={about.people.heading} level={2} size="xl" />
			</div>
			<p data-reveal>{about.people.body}</p>
		</div>
		<Founders />
	</div>
</section>

<!-- What we stand for -->
<section class="section">
	<div class="container">
		<SectionIntro heading={values.heading} body={values.body} size="xl" />
		<ItemList items={values.items} variant="cards" />
	</div>
</section>

<!-- How we work -->
<section class="section" id={about.howWeWork.id}>
	<div class="container">
		<SectionIntro heading={about.howWeWork.heading} body={about.howWeWork.body} size="xl" />
		<ProcessSteps />

		<div class="agile">
			<div {@attach reveal({ children: '[data-reveal]' })}>
				<h3 class="agile-heading" data-reveal>{about.howWeWork.agile.heading}</h3>
				<p class="agile-body" data-reveal>{about.howWeWork.agile.body}</p>
			</div>
			<ItemList items={about.howWeWork.agile.items} variant="inline" />
		</div>
	</div>
</section>

<!-- Two offices, one team -->
<section class="section">
	<div class="container">
		<SectionIntro heading={about.offices.heading} body={about.offices.body} size="xl" />
		<OfficeCards />
	</div>
</section>

<!-- More about Proxie -->
<section class="section">
	<div class="container more">
		<div>
			<Heading text={about.more.heading} level={2} size="lg" />
		</div>
		<ItemList
			items={about.more.links.map((l) => ({ title: l.label, href: l.href }))}
			variant="links"
		/>
	</div>
</section>

<CtaBlock />

<style>
	.facts {
		padding-bottom: var(--space-4);
	}

	.story {
		display: grid;
		gap: var(--space-6);
		padding-top: var(--space-8);
		border-top: 1px solid var(--color-line);
	}

	.story-text {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 420;
		line-height: 1.4;
		letter-spacing: -0.01em;
		max-width: 52ch;
	}

	.vision {
		display: grid;
		gap: var(--space-12);
		padding: clamp(2rem, 1.2rem + 4vw, 5.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-ink);
		color: var(--color-on-ink);
	}

	.vision-head {
		display: grid;
		gap: var(--space-6);
	}

	.vision-text {
		font-size: var(--text-lg);
		color: var(--color-on-ink-muted);
		max-width: 50ch;
	}

	.vision-text strong {
		color: var(--color-accent-on-ink);
		font-weight: 600;
	}

	.mission {
		display: grid;
	}

	.mission li {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-4);
		padding-block: var(--space-6);
		border-top: 1px solid var(--color-line-on-ink);
	}

	.mission-num {
		font-weight: 600;
		color: var(--color-accent-on-ink);
	}

	.mission p {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 450;
		line-height: 1.25;
		letter-spacing: var(--tracking-snug);
	}

	.people {
		display: grid;
		gap: var(--space-12);
	}

	.people-copy {
		display: grid;
		align-content: start;
		gap: var(--space-6);
	}

	.people-copy p {
		font-size: var(--text-md);
		color: var(--color-ink-muted);
		max-width: 46ch;
	}

	.agile {
		display: grid;
		gap: var(--space-8);
		margin-top: var(--space-16);
		padding: clamp(1.75rem, 1.2rem + 2vw, 3.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
	}

	.agile-heading {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
		margin-bottom: var(--space-4);
	}

	.agile-body {
		color: var(--color-ink-muted);
		max-width: 52ch;
	}

	.more {
		display: grid;
		gap: var(--space-8);
	}

	@media (min-width: 64rem) {
		.story {
			grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
			gap: var(--space-8);
		}

		.vision {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: var(--space-16);
		}

		.people {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
		}

		.people-copy {
			position: sticky;
			top: calc(var(--header-h) + var(--space-10));
			align-self: start;
		}

		.agile {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
		}

		.more {
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
		}
	}
</style>
