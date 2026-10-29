<script lang="ts">
	import { LOGO_VIEWBOX, MARK_PATH, WORDMARK_PATH } from './logo-paths';

	/** The ProxieStudio logo (images/logo/logo.svg), inlined so it inherits currentColor. */
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg class="logo {className}" viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
	<path d={MARK_PATH} fill="currentColor" />
	<path d={WORDMARK_PATH} fill="currentColor" />
</svg>

<style>
	.logo {
		height: 1.375rem;
		width: auto;
		aspect-ratio: 2585 / 348;
	}
</style>
