<script lang="ts">
	import { pillars } from '#lib/content/services.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import Icon from '../ui/Icon.svelte';

	/** The four service pillars as large linked cards, each listing its services. */
</script>

<ul class="pillars" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.1 })}>
	{#each pillars as pillar (pillar.slug)}
		<li class="pillar" data-reveal>
			<div class="top">
				<h3 class="title"><a href={pillar.href} class="stretched">{pillar.name}</a></h3>
				<span class="arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
			</div>
			<p class="summary">{pillar.homeSummary}</p>
			<ul class="services" role="list">
				{#each pillar.services as service (service.slug)}
					<li>{service.name}</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>

<style>
	.pillars {
		display: grid;
		gap: var(--space-4);
	}

	.pillar {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		min-height: 20rem;
		padding: clamp(1.75rem, 1.2rem + 2vw, 3rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
		overflow: hidden;
		isolation: isolate;
		transition: transform var(--dur-slow) var(--ease-out);
	}

	/* Accent wash that rises on hover (transform only) */
	.pillar::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--color-accent-soft);
		transform: translateY(101%);
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.pillar:hover {
		transform: translateY(-4px);
	}

	.pillar:hover::before {
		transform: none;
	}

	.top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.title {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
		line-height: 1.05;
	}

	.stretched::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: inherit;
	}

	.stretched:focus-visible {
		outline: none;
	}

	.stretched:focus-visible::after {
		outline: 2px solid var(--color-focus);
		outline-offset: -4px;
		border-radius: var(--radius-xl);
	}

	.arrow {
		display: grid;
		place-items: center;
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
		transition:
			transform var(--dur-base) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.pillar:hover .arrow {
		transform: rotate(-45deg);
		background: var(--color-accent);
	}

	.summary {
		font-size: var(--text-md);
		color: var(--color-ink-muted);
		max-width: 34ch;
	}

	.services {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: auto;
		padding-top: var(--space-6);
	}

	.services li {
		padding: 0.375rem 0.75rem;
		border-radius: var(--radius-pill);
		background: var(--color-paper);
		box-shadow: inset 0 0 0 1px var(--color-line);
		font-size: var(--text-xs);
		font-weight: 540;
		color: var(--color-ink-muted);
	}

	@media (min-width: 48rem) {
		.pillars {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
