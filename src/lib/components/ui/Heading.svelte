<script lang="ts">
	import type { Heading } from '#lib/content/types.ts';
	import { kinetic as kineticText, type KineticEffect } from '#lib/motion/attachments.ts';

	/**
	 * Renders a Heading. A [lead, quiet] pair becomes two lines with the second
	 * in a quieter tone; screen readers read it as one sentence.
	 * `hero` marks it for the SplitText line reveal.
	 * `kinetic` picks its kinetic typography (a preset from motion/tokens.ts,
	 * options, or false). Default: H1 'hero', H2 'section', otherwise none.
	 */
	let {
		text,
		level = 2,
		size = 'xl',
		hero = false,
		kinetic,
		id,
		class: className = ''
	}: {
		text: Heading;
		level?: 1 | 2 | 3;
		size?: 'hero' | '2xl' | 'xl' | 'lg' | 'md';
		hero?: boolean;
		kinetic?: KineticEffect;
		id?: string;
		class?: string;
	} = $props();

	const tag = $derived(`h${level}`);
	const pair = $derived(typeof text === 'string' ? null : text);
	const effect = $derived<KineticEffect>(kinetic ?? (level === 1 ? 'hero' : level === 2 ? 'section' : false));
</script>

<svelte:element
	this={tag}
	{id}
	class="heading heading--{size} {className}"
	data-hero-title={hero || undefined}
	{@attach kineticText(effect)}
>
	{#if pair}
		<span class="line" data-line-group>{pair[0]}</span>{' '}<span
			class="line quiet"
			data-line-group>{pair[1]}</span
		>
	{:else}
		{text}
	{/if}
</svelte:element>

<style>
	.heading {
		font-family: var(--font-display);
		font-weight: 560;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
	}

	.heading--hero {
		font-size: var(--text-5xl);
		font-weight: 540;
		line-height: 0.98;
	}

	.heading--2xl {
		font-size: var(--text-4xl);
	}

	.heading--xl {
		font-size: var(--text-3xl);
		line-height: 1.04;
	}

	.heading--lg {
		font-size: var(--text-2xl);
		line-height: 1.08;
		letter-spacing: var(--tracking-snug);
	}

	.heading--md {
		font-size: var(--text-xl);
		line-height: var(--leading-snug);
		letter-spacing: var(--tracking-snug);
	}

	.line {
		display: block;
	}
</style>
