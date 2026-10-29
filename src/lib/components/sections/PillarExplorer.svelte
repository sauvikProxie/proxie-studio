<script lang="ts">
	import { pillarArt } from '#lib/content/media.ts';
	import { pillars } from '#lib/content/services.ts';
	import { kinetic, reveal } from '#lib/motion/attachments.ts';
	import Art from '../art/Art.svelte';
	import ArrowLink from '../ui/ArrowLink.svelte';
	import Icon from '../ui/Icon.svelte';

	/**
	 * The four service pillars as an accordion (one open at a time) beside a
	 * sticky artwork panel that crossfades to the open pillar. On small screens
	 * the artwork sits inside the open item.
	 */
	const icons = ['data', 'ai', 'apps', 'experience'] as const;
	let open = $state(0);
</script>

<div class="explorer">
	<ul class="list" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.08 })}>
		{#each pillars as pillar, i (pillar.slug)}
			<li class="item" class:is-open={open === i} data-reveal>
				<h3>
					<button
						type="button"
						class="trigger"
						aria-expanded={open === i}
						aria-controls="pillar-panel-{pillar.slug}"
						id="pillar-trigger-{pillar.slug}"
						onclick={() => (open = i)}
					>
						<span class="badge" aria-hidden="true"><Icon name={icons[i]} size={20} /></span>
						<span class="name" {@attach kinetic('card')}>{pillar.name}</span>
						<span class="chev" aria-hidden="true"><Icon name="chevron" size={20} /></span>
					</button>
				</h3>
				<div
					class="panel"
					id="pillar-panel-{pillar.slug}"
					role="region"
					aria-labelledby="pillar-trigger-{pillar.slug}"
					hidden={open !== i}
				>
					<p class="summary">{pillar.homeSummary}</p>
					<ul class="services" role="list">
						{#each pillar.services as service (service.slug)}
							<li><a href={service.href}>{service.name}</a></li>
						{/each}
					</ul>
					<ArrowLink link={{ label: pillar.exploreLabel, href: pillar.href }} tone="accent" />
					{#if open === i}
						<div class="inline-art" aria-hidden="true">
							<Art kind={pillarArt[pillar.slug]} seed={pillar.slug} />
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>

	<div class="stage" aria-hidden="true">
		<div class="stage-inner">
			{#each pillars as pillar, i (pillar.slug)}
				<div class="art" class:is-active={open === i}>
					<Art kind={pillarArt[pillar.slug]} seed={pillar.slug} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.explorer {
		display: grid;
		gap: var(--space-8);
		align-items: start;
	}

	.list {
		display: grid;
		gap: var(--space-3);
	}

	.item {
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: var(--ring);
		transition: box-shadow var(--dur-base) var(--ease-out);
	}

	.item.is-open {
		box-shadow: var(--ring), var(--shadow-md);
	}

	h3 {
		font-size: inherit;
		letter-spacing: normal;
		font-weight: inherit;
	}

	.trigger {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-4) var(--space-5);
		text-align: left;
		border-radius: var(--radius-lg);
	}

	.badge {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 50%;
		background: var(--color-ink);
		color: var(--color-paper);
		transition:
			background-color var(--dur-base) var(--ease-out),
			color var(--dur-base) var(--ease-out);
	}

	.is-open .badge {
		background: var(--color-accent);
		color: #fff;
	}

	.name {
		flex: 1;
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 540;
		letter-spacing: var(--tracking-snug);
	}

	.chev {
		color: var(--color-ink-subtle);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.is-open .chev {
		transform: rotate(180deg);
	}

	.panel {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
		padding: 0 var(--space-5) var(--space-6) calc(var(--space-5) + 2.75rem + var(--space-4));
		animation: panel-in var(--dur-slow) var(--ease-out) both;
	}

	.panel[hidden] {
		display: none;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	.summary {
		font-size: var(--text-md);
		color: var(--color-ink-muted);
		max-width: 40ch;
	}

	.services {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.services a {
		display: inline-block;
		padding: 0.4375rem 0.875rem;
		border-radius: var(--radius-pill);
		background: var(--color-paper);
		box-shadow: var(--ring);
		font-size: var(--text-xs);
		font-weight: 560;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.services a:hover {
		background: var(--color-accent-soft);
		color: var(--color-accent-strong);
	}

	.inline-art {
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		border-radius: var(--radius-lg);
	}

	.stage {
		display: none;
	}

	@media (max-width: 47.99rem) {
		.panel {
			padding-left: var(--space-5);
		}
	}

	@media (min-width: 64rem) {
		.explorer {
			grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
			gap: var(--space-10);
		}

		.inline-art {
			display: none;
		}

		.stage {
			display: block;
			position: sticky;
			top: calc(var(--header-h) + var(--space-8));
		}

		.stage-inner {
			position: relative;
			aspect-ratio: 4 / 3;
			overflow: hidden;
			border-radius: var(--radius-2xl);
			box-shadow: var(--shadow-lg);
		}

		.art {
			position: absolute;
			inset: 0;
			opacity: 0;
			transform: scale(1.04);
			transition:
				opacity var(--dur-slow) var(--ease-out),
				transform var(--dur-slower) var(--ease-out);
		}

		.art.is-active {
			opacity: 1;
			transform: none;
		}
	}
</style>
