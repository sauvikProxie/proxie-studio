<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import IndustryCards from '#lib/components/sections/IndustryCards.svelte';
	import NextStep from '#lib/components/sections/NextStep.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import { industriesOverview as page } from '#lib/content/industries.ts';
</script>

<Seo seo={page.seo} />

<PageHero hero={page.hero} />

<section class="section">
	<div class="container">
		<SectionIntro eyebrow="Industries" heading={page.listHeading} size="xl" />
		<IndustryCards />
	</div>
</section>

<NextStep closing={page.closing} />
