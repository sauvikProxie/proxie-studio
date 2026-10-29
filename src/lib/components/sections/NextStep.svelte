<script lang="ts">
	import { contactLink } from '#lib/content/blocks.ts';
	import { findByHref } from '#lib/content/services.ts';
	import type { Closing, Link } from '#lib/content/types.ts';
	import { kinetic, reveal } from '#lib/motion/attachments.ts';
	import ArrowLink from '../ui/ArrowLink.svelte';
	import Icon from '../ui/Icon.svelte';
	import CtaBlock from './CtaBlock.svelte';

	/**
	 * The "next step" every page ends with: related services (as listed in
	 * SiteContent.txt), cross-links, and a closing CTA panel. If a page has no
	 * closing prompt of its own, the panel uses the page's hero CTA label.
	 */
	let { closing, fallbackPrompt }: { closing: Closing; fallbackPrompt?: string } = $props();

	const related = $derived(
		(closing.related ?? []).map((href) => findByHref(href)).filter((r) => r !== undefined)
	);
	const prompt = $derived(closing.prompt ?? fallbackPrompt);
	const button: Link = $derived(closing.button ?? contactLink);
</script>

{#if related.length}
	<section class="section related" aria-labelledby="related-heading">
		<div class="container">
			<h2 id="related-heading" class="label">{closing.relatedLabel ?? 'Related'}</h2>
			<ul class="grid" role="list" {@attach reveal({ children: '[data-reveal]' })}>
				{#each related as item (item.href)}
					<li data-reveal>
						<a href={item.href} class="related-card">
							{#if item.parent}<span class="parent">{item.parent}</span>{/if}
							<span class="name" {@attach kinetic('card')}>{item.name}</span>
							<span class="summary">{item.summary}</span>
							<span class="arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

{#snippet crossLinks()}
	{#if closing.links?.length}
		<ul class="cross" role="list">
			{#each closing.links as item (item.link.href)}
				<li>
					{#if item.lead}<span>{item.lead}</span>{/if}
					<ArrowLink link={item.link} tone="on-ink" />
				</li>
			{/each}
		</ul>
	{/if}
{/snippet}

{#if closing.reuseCta}
	<CtaBlock extra={closing.links?.length ? crossLinks : undefined} />
{:else if prompt}
	<CtaBlock heading={prompt} body="" {button} extra={closing.links?.length ? crossLinks : undefined} />
{/if}

<style>
	.label {
		font-family: var(--font-text);
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--color-ink-subtle);
		padding-top: var(--space-6);
		border-top: 1px solid var(--color-line);
		margin-bottom: var(--space-6);
	}

	.grid {
		display: grid;
		gap: var(--space-4);
	}

	.related-card {
		position: relative;
		display: grid;
		gap: var(--space-2);
		height: 100%;
		padding: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
		padding-right: 5rem;
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.related-card:hover {
		transform: translateY(-4px);
	}

	.parent {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--color-accent);
	}

	.name {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 560;
		letter-spacing: var(--tracking-snug);
		line-height: 1.15;
	}

	.summary {
		color: var(--color-ink-muted);
	}

	.arrow {
		position: absolute;
		top: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
		right: clamp(1.5rem, 1.2rem + 1vw, 2.25rem);
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
		transition:
			transform var(--dur-base) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.related-card:hover .arrow {
		transform: rotate(-45deg);
		background: var(--color-accent);
	}

	.cross {
		display: grid;
		gap: var(--space-3);
	}

	.cross li {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	@media (min-width: 48rem) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
