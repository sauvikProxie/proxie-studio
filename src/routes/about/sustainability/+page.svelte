<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import CtaBlock from '#lib/components/sections/CtaBlock.svelte';
	import ItemList from '#lib/components/sections/ItemList.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import SectionIntro from '#lib/components/sections/SectionIntro.svelte';
	import { sustainability } from '#lib/content/company.ts';
	import { photos } from '#lib/content/media.ts';
</script>

<Seo seo={sustainability.seo} />

<PageHero
	hero={sustainability.hero}
	crumbs={[{ label: 'About', href: '/about' }]}
	photo={photos.sustainability}
/>

<section class="section">
	<div class="container">
		<SectionIntro
			heading={sustainability.priorities.heading}
			body={sustainability.priorities.body}
			size="xl"
		/>
		<ItemList items={sustainability.priorities.items} variant="cards" columns={3} />
	</div>
</section>

<CtaBlock />
