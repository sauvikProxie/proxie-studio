<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import ContentSections from '#lib/components/sections/ContentSections.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SecondaryLinks from '#lib/components/sections/SecondaryLinks.svelte';
	import { seeAllServices } from '#lib/content/blocks.ts';
	import { getIndustry } from '#lib/content/industries.ts';
	import { industryPhotos } from '#lib/content/media.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const industry = $derived(getIndustry(data.industry)!);
</script>

<Seo seo={industry.seo} />

<PageHero
	hero={industry.hero}
	crumbs={[{ label: 'Industries', href: '/industries' }]}
	photo={industryPhotos[industry.slug]}
/>
<ContentSections sections={industry.sections} />
<SecondaryLinks links={[seeAllServices]} />
<NextStep closing={industry.closing} />
