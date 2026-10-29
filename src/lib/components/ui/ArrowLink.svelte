<script lang="ts">
	import type { Link } from '#lib/content/types.ts';
	import Icon from './Icon.svelte';

	/** Text link with an arrow and an underline that draws in on hover (transform only). */
	let {
		link,
		class: className = '',
		tone = 'ink'
	}: { link: Link; class?: string; tone?: 'ink' | 'accent' | 'on-ink' } = $props();
</script>

<a
	href={link.href}
	class="arrow-link arrow-link--{tone} {className}"
	target={link.external ? '_blank' : undefined}
	rel={link.external ? 'noopener noreferrer' : undefined}
>
	<span class="text">{link.label}</span>
	<Icon name={link.external ? 'arrow-up-right' : 'arrow'} size={18} class="arrow" />
	{#if link.external}<span class="sr-only"> (opens in a new tab)</span>{/if}
</a>

<style>
	.arrow-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-weight: 560;
		color: var(--color-ink);
	}

	.arrow-link--accent {
		color: var(--color-accent);
	}

	.arrow-link--on-ink {
		color: var(--color-on-ink);
	}

	.text {
		position: relative;
		padding-block: 0.125rem;
	}

	.text::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: currentColor;
		transform: scaleX(0.35);
		transform-origin: 0 50%;
		opacity: 0.5;
		transition:
			transform var(--dur-base) var(--ease-out),
			opacity var(--dur-base) var(--ease-out);
	}

	.arrow-link:hover .text::after,
	.arrow-link:focus-visible .text::after {
		transform: scaleX(1);
		opacity: 1;
	}

	.arrow-link :global(.arrow) {
		transition: transform var(--dur-base) var(--ease-out);
	}

	.arrow-link:hover :global(.arrow) {
		transform: translateX(4px);
	}
</style>
