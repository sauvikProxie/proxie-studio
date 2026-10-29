<script lang="ts">
	/** Small decorative UI glyphs. Always aria-hidden; pair with visible or sr-only text. */
	type Name =
		| 'arrow'
		| 'arrow-left'
		| 'arrow-up-right'
		| 'chevron'
		| 'check'
		| 'menu'
		| 'close'
		| 'plus'
		| 'data'
		| 'ai'
		| 'apps'
		| 'experience'
		| 'layers'
		| 'shield'
		| 'leaf'
		| 'globe'
		| 'spark';
	let { name, size = 18, class: className = '' }: { name: Name; size?: number; class?: string } =
		$props();
</script>

<svg
	class="icon {className}"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.75"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'arrow'}
		<path d="M4 12h15M13 6l6 6-6 6" />
	{:else if name === 'arrow-left'}
		<path d="M20 12H5M11 6l-6 6 6 6" />
	{:else if name === 'arrow-up-right'}
		<path d="M7 17 17 7M8 7h9v9" />
	{:else if name === 'chevron'}
		<path d="m6 9 6 6 6-6" />
	{:else if name === 'check'}
		<path d="m5 12.5 4.5 4.5L19 7.5" />
	{:else if name === 'menu'}
		<path d="M4 8h16M4 16h16" />
	{:else if name === 'close'}
		<path d="M6 6l12 12M18 6 6 18" />
	{:else if name === 'plus'}
		<path d="M12 5v14M5 12h14" />
	{:else if name === 'data'}
		<path d="M4 20h16M7 16v-5M12 16V6M17 16v-8" />
	{:else if name === 'ai'}
		<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
	{:else if name === 'apps'}
		<rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="3.5" />
	{:else if name === 'experience'}
		<rect x="3" y="4" width="18" height="13" rx="2.5" /><path d="M8 21h8M12 17v4M7 9h6M7 12h4" />
	{:else if name === 'layers'}
		<path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" />
	{:else if name === 'shield'}
		<path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6z" /><path d="m9 12 2 2 4-4" />
	{:else if name === 'leaf'}
		<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15" /><path d="M5 19 13 11" />
	{:else if name === 'globe'}
		<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
	{:else if name === 'spark'}
		<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
	{/if}
</svg>

<style>
	.icon {
		flex: none;
	}
</style>
