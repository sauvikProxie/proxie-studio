<script lang="ts">
	import type { Link } from '#lib/content/types.ts';
	import ArrowLink from '../ui/ArrowLink.svelte';

	/** A quiet row of secondary links, e.g. "See all services →". */
	let { links }: { links: readonly Link[] } = $props();
</script>

<div class="container">
	<ul class="secondary" role="list">
		{#each links as link (link.href)}
			<li><ArrowLink {link} tone="accent" /></li>
		{/each}
	</ul>
</div>

<style>
	.secondary {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4) var(--space-8);
		padding-block: var(--space-4);
	}
</style>
