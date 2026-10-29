<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import ContentSections from '#lib/components/sections/ContentSections.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SecondaryLinks from '#lib/components/sections/SecondaryLinks.svelte';
	import { seeAllServices } from '#lib/content/blocks.ts';
	import { pillarArt } from '#lib/content/media.ts';
	import { getPillar } from '#lib/content/services.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const pillar = $derived(getPillar(data.pillar)!);
</script>

<Seo seo={pillar.seo} />

<PageHero
	hero={pillar.hero}
	crumbs={[{ label: 'Services', href: '/services' }]}
	art={pillarArt[pillar.slug]}
	seed={pillar.slug}
/>
<ContentSections sections={pillar.sections} />
<SecondaryLinks links={[seeAllServices]} />
<NextStep closing={pillar.closing} fallbackPrompt={pillar.hero.cta?.label} />
