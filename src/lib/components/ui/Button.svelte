<script lang="ts">
	import type { Snippet } from 'svelte';
	import { magnetic } from '#lib/motion/attachments.ts';
	import Icon from './Icon.svelte';

	/**
	 * Pill button (link or <button>). The arrow chip slides on hover:
	 * one arrow exits right while a second enters from the left (transform only).
	 */
	interface Props {
		href?: string;
		label?: string;
		children?: Snippet;
		/** primary: emerald · dark: ink · lime: for dark panels · light: white · outline */
		variant?: 'primary' | 'accent' | 'dark' | 'lime' | 'light' | 'outline';
		size?: 'md' | 'lg';
		arrow?: boolean;
		external?: boolean;
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		[key: string]: unknown;
	}

	let {
		href,
		label,
		children,
		variant = 'primary',
		size = 'md',
		arrow = true,
		external = false,
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		...rest
	}: Props = $props();

	const icon = $derived(external ? 'arrow-up-right' : 'arrow');
</script>

{#snippet content()}
	<span class="label">
		{#if children}{@render children()}{:else}{label}{/if}
		{#if external}<span class="sr-only"> (opens in a new tab)</span>{/if}
	</span>
	{#if arrow}
		<span class="chip" aria-hidden="true">
			<span class="chip-track">
				<Icon name={icon} size={16} />
				<Icon name={icon} size={16} />
			</span>
		</span>
	{/if}
{/snippet}

{#if href}
	<a
		{href}
		class="btn btn--{variant} btn--{size} {className}"
		class:has-arrow={arrow}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		{onclick}
		{...rest}
		{@attach magnetic(0.18)}
	>
		{@render content()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		class="btn btn--{variant} btn--{size} {className}"
		class:has-arrow={arrow}
		{onclick}
		{...rest}
		{@attach magnetic(0.18)}
	>
		{@render content()}
	</button>
{/if}

<style>
	.btn {
		--btn-bg: var(--color-accent);
		--btn-bg-hover: var(--color-accent-strong);
		--btn-fg: #fff;
		--chip-bg: #fff;
		--chip-fg: var(--color-accent);
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		min-height: 3rem;
		padding: 0.375rem 1.375rem;
		border-radius: var(--radius-pill);
		background: var(--btn-bg);
		color: var(--btn-fg);
		font-weight: 580;
		font-size: var(--text-sm);
		letter-spacing: 0.005em;
		line-height: 1.2;
		max-width: 100%;
		isolation: isolate;
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), 0 1px 2px rgb(21 16 14 / 0.12);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-base) var(--ease-out);
	}

	.btn:hover {
		background: var(--btn-bg-hover);
	}

	.btn--primary:hover,
	.btn--accent:hover {
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.18), var(--shadow-glow);
	}

	.btn.has-arrow {
		padding-right: 0.375rem;
	}

	.btn--lg {
		min-height: 3.5rem;
		font-size: var(--text-base);
		padding-left: 1.75rem;
	}

	.btn--dark {
		--btn-bg: var(--color-ink);
		--btn-bg-hover: var(--color-ink-2);
		--btn-fg: var(--color-on-ink);
		--chip-bg: var(--color-lime);
		--chip-fg: var(--color-ink);
	}

	.btn--lime {
		--btn-bg: var(--color-lime);
		--btn-bg-hover: #ffc6a8;
		--btn-fg: var(--color-ink);
		--chip-bg: var(--color-ink);
		--chip-fg: var(--color-lime);
		box-shadow: 0 0 0 0 rgb(255 179 138 / 0);
	}

	.btn--lime:hover {
		box-shadow: 0 16px 40px -12px rgb(255 179 138 / 0.6);
	}

	.btn--light {
		--btn-bg: var(--color-surface);
		--btn-bg-hover: var(--color-surface);
		--btn-fg: var(--color-ink);
		--chip-bg: var(--color-accent);
		--chip-fg: #fff;
		box-shadow: var(--ring), var(--shadow-sm);
	}

	.btn--outline {
		--btn-bg: transparent;
		--btn-bg-hover: var(--color-surface);
		--btn-fg: var(--color-ink);
		--chip-bg: var(--color-ink);
		--chip-fg: var(--color-paper);
		box-shadow: inset 0 0 0 1px var(--color-line-strong);
	}

	.btn:disabled {
		opacity: 0.6;
		cursor: progress;
	}

	/* Long CTA labels may wrap on narrow screens instead of overflowing */
	.label {
		position: relative;
		text-wrap: balance;
	}

	.chip {
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: var(--chip-bg);
		color: var(--chip-fg);
		overflow: hidden;
		flex: none;
	}

	.btn--lg .chip {
		width: 2.75rem;
		height: 2.75rem;
	}

	/* Two 16px arrows with a 20px gap, centred in the chip. At rest the second
	   arrow is centred; on hover the track slides right so it exits and the
	   first arrow enters from the left. */
	.chip-track {
		display: flex;
		gap: 1.25rem;
		transform: translateX(-18px);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.btn:hover .chip-track,
	.btn:focus-visible .chip-track {
		transform: translateX(18px);
	}
</style>
