<script lang="ts">
	import type { Stat } from '#lib/content/types.ts';
	import { reveal } from '#lib/motion/attachments.ts';

	/** Compact stat blocks ([REUSE: Stats – About facts]). */
	let { stats }: { stats: readonly Stat[] } = $props();
</script>

<dl class="stats" {@attach reveal({ children: '[data-reveal]', stagger: 0.08 })}>
	{#each stats as stat (stat.label)}
		<div class="stat" data-reveal>
			<dt>
				<span class="value" class:value--word={stat.value.length > 3}>{stat.value}</span>
				<span class="label">{stat.label}</span>
			</dt>
			<dd>{stat.text}</dd>
		</div>
	{/each}
</dl>

<style>
	.stats {
		display: grid;
		gap: var(--space-3);
	}

	.stat {
		display: grid;
		align-content: space-between;
		gap: var(--space-8);
		min-height: 11rem;
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
	}

	dt {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: var(--space-2);
	}

	.value {
		font-family: var(--font-display);
		font-size: var(--text-3xl);
		font-weight: 560;
		letter-spacing: var(--tracking-tight);
		line-height: 1;
		color: var(--color-accent);
	}

	/* Word values ("End-to-end") use a smaller size so they stay on one line */
	.value--word {
		font-size: var(--text-xl);
		white-space: nowrap;
	}

	.label {
		font-weight: 600;
	}

	dd {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-ink-muted);
	}

	@media (min-width: 40rem) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 64rem) {
		.stats {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
