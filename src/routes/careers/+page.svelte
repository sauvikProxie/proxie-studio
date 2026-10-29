<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import CtaBlock from '#lib/components/sections/CtaBlock.svelte';
	import ItemList from '#lib/components/sections/ItemList.svelte';
	import OfficeCards from '#lib/components/sections/OfficeCards.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import ArrowLink from '#lib/components/ui/ArrowLink.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import { careers } from '#lib/content/company.ts';
	import { photos } from '#lib/content/media.ts';
	import { site } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/attachments.ts';

	const { positions } = careers;
</script>

<Seo seo={careers.seo} />

<PageHero hero={careers.hero} photo={photos.careers} />

<!-- Open positions -->
<section class="section" id={positions.id}>
	<div class="container">
		<SectionIntro heading={positions.heading} size="xl" />
		{#if positions.roles.length}
			<ul class="roles" role="list" {@attach reveal({ children: '[data-reveal]' })}>
				{#each positions.roles as role (role.title)}
					<li class="role" data-reveal>
						<h3 class="role-title">{role.title}</h3>
						<Button
							href={role.apply.href}
							label={role.apply.label}
							external={role.apply.external}
							variant="accent"
						/>
					</li>
				{/each}
			</ul>
		{:else}
			<div class="empty" {@attach reveal()}>
				<p>{positions.empty.text}</p>
				<ArrowLink link={positions.empty.link} tone="accent" />
			</div>
		{/if}
	</div>
</section>

<!-- Why work with us -->
<section class="section">
	<div class="container">
		<SectionIntro heading={careers.why.heading} size="xl" />
		<ItemList items={careers.why.items.map((text) => ({ text }))} variant="list" />
	</div>
</section>

<!-- Where we work -->
<section class="section">
	<div class="container">
		<SectionIntro heading={careers.locations.heading} size="xl" />
		<OfficeCards short />
	</div>
</section>

{#snippet contactLine()}
	<p class="closing-line">
		{careers.closing.emailLead}
		<a class="ink-link" href="mailto:{site.email}">{site.email}</a>
		{careers.closing.formLead}
		<a class="ink-link" href={careers.closing.formLink.href}>{careers.closing.formLink.label}</a>
	</p>
{/snippet}

<CtaBlock heading={careers.closing.prompt} body="" extra={contactLine} />

<style>
	.roles {
		display: grid;
		gap: var(--space-3);
	}

	.role {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		padding: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
	}

	.role-title {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
	}

	.empty {
		display: grid;
		justify-items: start;
		gap: var(--space-4);
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
	}

	.closing-line {
		font-size: var(--text-lg);
	}

	.ink-link {
		color: var(--color-on-ink);
		text-decoration: underline;
		text-decoration-color: var(--color-accent-on-ink);
		text-underline-offset: 0.2em;
		text-decoration-thickness: 1px;
	}

	.ink-link:hover {
		color: var(--color-accent-on-ink);
	}
</style>
