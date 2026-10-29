<script lang="ts">
	import type { Item, ItemStyle } from '#lib/content/types.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import Icon from '../ui/Icon.svelte';

	/** Renders a list of items in one of the shared presentations (see ItemStyle). */
	let {
		items,
		variant = 'list',
		columns = 2
	}: { items: readonly Item[]; variant?: ItemStyle; columns?: 2 | 3 } = $props();
</script>

{#if variant === 'cards'}
	<ul class="cards cards--{columns}" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.08 })}>
		{#each items as item, i (i)}
			<li class="card" class:is-link={!!item.href} data-reveal>
				<span class="card-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				{#if item.title}
					<h3 class="card-title">
						{#if item.href && !item.linkLabel}
							<a href={item.href} class="stretched">{item.title}</a>
						{:else}
							{item.title}
						{/if}
					</h3>
				{/if}
				{#if item.text}<p class="card-text">{item.text}</p>{/if}
				{#if item.href}
					<span class="card-foot">
						{#if item.linkLabel}
							<a href={item.href} class="stretched card-link">{item.linkLabel}</a>
						{/if}
						<span class="card-arrow" aria-hidden="true"><Icon name="arrow" size={18} /></span>
					</span>
				{/if}
			</li>
		{/each}
	</ul>
{:else if variant === 'inline'}
	<ol class="inline" role="list" {@attach reveal({ children: '[data-reveal]' })}>
		{#each items as item, i (i)}
			<li data-reveal>
				<span class="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
				<p>
					{#if item.title}<strong>{item.title}:</strong>{/if}
					{item.text}
				</p>
			</li>
		{/each}
	</ol>
{:else if variant === 'tags'}
	<ul class="tags" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.05, y: 12 })}>
		{#each items as item, i (i)}
			<li data-reveal>{item.title ?? item.text}</li>
		{/each}
	</ul>
{:else if variant === 'links'}
	<ul class="links" role="list" {@attach reveal({ children: '[data-reveal]' })}>
		{#each items as item, i (i)}
			<li data-reveal>
				<a href={item.href} class="link-row">
					<span>{item.title}</span>
					<Icon name="arrow" size={22} class="link-arrow" />
				</a>
			</li>
		{/each}
	</ul>
{:else}
	<ul class="checks" role="list" {@attach reveal({ children: '[data-reveal]' })}>
		{#each items as item, i (i)}
			<li data-reveal>
				<span class="check" aria-hidden="true"><Icon name="check" size={16} /></span>
				<p>
					{#if item.title}<strong>{item.title}:</strong>{/if}
					{item.text}
				</p>
			</li>
		{/each}
	</ul>
{/if}

<style>
	/* ---------- cards ---------- */
	.cards {
		display: grid;
		gap: var(--space-4);
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		box-shadow: var(--shadow-md);
		opacity: 0;
		transition: opacity var(--dur-slow) var(--ease-out);
		pointer-events: none;
	}

	.card.is-link:hover {
		transform: translateY(-4px);
	}

	.card.is-link:hover::after {
		opacity: 1;
	}

	.card-index {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		margin-bottom: var(--space-6);
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-lime);
		font-size: var(--text-xs);
		font-weight: 650;
		letter-spacing: 0.02em;
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.card.is-link:hover .card-index {
		background: var(--color-accent);
		color: #fff;
	}

	.card-title {
		font-size: var(--text-xl);
		line-height: 1.15;
	}

	.card-text {
		color: var(--color-ink-muted);
	}

	.card-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		margin-top: auto;
		padding-top: var(--space-4);
	}

	.card-link {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-accent);
	}

	.card-arrow {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		margin-left: auto;
		border-radius: 50%;
		background: var(--color-paper);
		color: var(--color-ink);
		transition:
			transform var(--dur-base) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.card.is-link:hover .card-arrow {
		background: var(--color-accent);
		color: var(--color-paper);
		transform: rotate(-45deg);
	}

	/* The whole card is clickable through the link's pseudo-element */
	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: var(--radius-lg);
		z-index: 1;
	}

	.stretched:focus-visible {
		outline: none;
	}

	.stretched:focus-visible::after {
		outline: 2px solid var(--color-focus);
		outline-offset: 3px;
	}

	/* ---------- inline (numbered "Title: text") ---------- */
	.inline {
		display: grid;
	}

	.inline li,
	.checks li {
		display: grid;
		grid-template-columns: 2.5rem 1fr;
		gap: var(--space-4);
		padding-block: var(--space-5);
		border-top: 1px solid var(--color-line);
	}

	.inline li:last-child,
	.checks li:last-child {
		border-bottom: 1px solid var(--color-line);
	}

	.num {
		font-family: var(--font-display);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-accent);
		padding-top: 0.2em;
	}

	.inline p,
	.checks p {
		font-size: var(--text-md);
		color: var(--color-ink-muted);
	}

	.inline strong,
	.checks strong {
		color: var(--color-ink);
		font-weight: 600;
	}

	/* ---------- checks ---------- */
	.checks li {
		grid-template-columns: 2rem 1fr;
		align-items: start;
	}

	.checks p {
		color: var(--color-ink);
	}

	.check {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		background: var(--color-accent-soft);
		color: var(--color-accent);
	}

	/* ---------- tags ---------- */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tags li {
		padding: 0.625rem 1.125rem;
		border-radius: var(--radius-pill);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
		font-size: var(--text-sm);
		font-weight: 540;
	}

	/* ---------- links ---------- */
	.links {
		display: grid;
	}

	.link-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding-block: var(--space-5);
		border-top: 1px solid var(--color-line);
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 540;
		letter-spacing: var(--tracking-snug);
	}

	.links li:last-child .link-row {
		border-bottom: 1px solid var(--color-line);
	}

	.link-row :global(.link-arrow) {
		color: var(--color-accent);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.link-row:hover :global(.link-arrow) {
		transform: translateX(6px);
	}

	@media (min-width: 40rem) {
		.cards--2,
		.cards--3 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.cards--3 {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
