<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { MARK_PATH, MARK_VIEWBOX } from './logo-paths';

	/**
	 * The outline "P" from the logo, used as Proxie's graphic motif.
	 * Decorative only. The stroke is drawn with DrawSVG through the `draw`
	 * attachment, then a soft fill fades in behind it.
	 */
	let {
		class: className = '',
		draw,
		fill = true
	}: { class?: string; draw?: Attachment<SVGElement>; fill?: boolean } = $props();
</script>

<svg class="pmark {className}" viewBox={MARK_VIEWBOX} aria-hidden="true" focusable="false" {@attach draw}>
	{#if fill}
		<path class="pmark-fill" d={MARK_PATH} data-draw-fill />
	{/if}
	<path class="pmark-stroke" d={MARK_PATH} data-draw />
</svg>

<style>
	.pmark {
		overflow: visible;
		width: 100%;
		height: auto;
	}

	.pmark-fill {
		fill: var(--pmark-fill, var(--color-accent-soft));
	}

	.pmark-stroke {
		fill: none;
		stroke: var(--pmark-stroke, var(--color-accent));
		stroke-width: var(--pmark-width, 1.4);
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}
</style>
