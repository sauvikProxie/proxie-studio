<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Heading as HeadingText } from '#lib/content/types.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import Heading from '../ui/Heading.svelte';

	/**
	 * Standard section opener: optional eyebrow pill, heading, body and action.
	 * `split`: heading left, body right on wide screens (editorial).
	 * `center`: everything centred (statement sections).
	 */
	let {
		heading,
		body,
		eyebrow,
		id,
		size = 'xl',
		layout = 'split',
		action
	}: {
		heading: HeadingText;
		body?: string;
		eyebrow?: string;
		id?: string;
		size?: '2xl' | 'xl' | 'lg';
		layout?: 'split' | 'center';
		action?: Snippet;
	} = $props();
</script>

<div class="intro intro--{layout}" {@attach reveal({ children: '[data-reveal]' })}>
	<div class="heading" data-reveal>
		{#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
		<Heading text={heading} level={2} {size} {id} />
	</div>
	{#if body || action}
		<div class="aside" data-reveal>
			{#if body}<p class="body">{body}</p>{/if}
			{#if action}{@render action()}{/if}
		</div>
	{/if}
</div>

<style>
	.intro {
		display: grid;
		gap: var(--space-6);
		margin-bottom: clamp(2.5rem, 2rem + 2.5vw, 4.5rem);
	}

	.heading {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
	}

	.aside {
		display: grid;
		justify-items: start;
		gap: var(--space-6);
		align-content: end;
	}

	.body {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
		max-width: 42ch;
	}

	.intro--center {
		justify-items: center;
		text-align: center;
	}

	.intro--center .heading,
	.intro--center .aside {
		justify-items: center;
	}

	.intro--center .heading :global(h2) {
		max-width: 20ch;
	}

	@media (min-width: 64rem) {
		.intro--split {
			grid-template-columns: repeat(12, minmax(0, 1fr));
			column-gap: var(--space-8);
			align-items: end;
		}

		.intro--split .heading {
			grid-column: 1 / span 7;
		}

		.intro--split .aside {
			grid-column: 8 / -1;
		}
	}
</style>
