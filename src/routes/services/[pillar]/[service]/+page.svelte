<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import ContentSections from '#lib/components/sections/ContentSections.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import { pillarArt } from '#lib/content/media.ts';
	import { getPillar, getService } from '#lib/content/services.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const pillar = $derived(getPillar(data.pillar)!);
	const service = $derived(getService(data.pillar, data.service)!);
</script>

<Seo seo={service.seo} />

<PageHero
	hero={service.hero}
	crumbs={[
		{ label: 'Services', href: '/services' },
		{ label: pillar.name, href: pillar.href }
	]}
	art={pillarArt[pillar.slug]}
	seed={service.slug}
/>
<ContentSections sections={service.sections} />
<NextStep closing={service.closing} fallbackPrompt={service.hero.cta?.label} />
