<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/content/site.ts';
	import type { Seo } from '#lib/content/types.ts';

	let { seo }: { seo: Seo } = $props();

	const canonical = $derived(site.url + (page.url.pathname === '/' ? '/' : page.url.pathname));
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
</svelte:head>
