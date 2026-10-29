<script lang="ts">
	import { processSteps } from '#lib/content/blocks.ts';
	import { kinetic, reveal, stepSequence } from '#lib/motion/attachments.ts';

	/**
	 * [REUSE: Process – How we work], full version.
	 * Desktop + motion: a tall wrapper scrolls past a sticky panel and steps
	 * 01–04 are highlighted in turn; only the active step's description is open,
	 * expanding smoothly as it becomes active. Mobile / reduced motion: a simple
	 * vertical list with every description visible. All step text is always in
	 * the DOM (collapsed, never display: none), so screen readers read it all.
	 */
	let active = $state(-1);
	let progress = $state(0);
	const sequenced = $derived(active >= 0);
</script>

<div
	class="process"
	class:sequenced
	style="--count: {processSteps.length}"
	{@attach stepSequence(processSteps.length, (i) => (active = i), (p) => (progress = p))}
>
	<div class="sticky">
		<div class="panel">
			<div class="big" aria-hidden="true" {@attach kinetic('numeral')}>
				{#each processSteps as step, i (step.number)}
					<span class="big-number" class:is-active={i === Math.max(active, 0)}>{step.number}</span>
				{/each}
				<span class="rail"><span class="rail-fill" style="transform: scaleY({progress})"></span></span>
			</div>

			<ol class="steps" role="list" {@attach reveal({ children: '[data-reveal]' })}>
				{#each processSteps as step, i (step.number)}
					<li
						class="step"
						class:is-active={!sequenced || i === active}
						class:is-done={sequenced && i < active}
						data-reveal
					>
						<span class="number">{step.number}</span>
						<div class="copy">
							<h3 class="title">{step.title}</h3>
							<div class="text-wrap">
								<div class="text-inner">
									<p class="text">{step.text}</p>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</div>

<style>
	.panel {
		display: grid;
		gap: var(--space-8);
	}

	.big {
		display: none;
	}

	.steps {
		display: grid;
		gap: var(--space-3);
	}

	.step {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-4);
		padding: clamp(1.25rem, 1rem + 1vw, 2rem);
		border-radius: var(--radius-lg);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
	}

	.number {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 600;
		line-height: 1;
		padding-top: 0.35em;
		color: var(--color-accent);
	}

	/* Headings: uppercase display caps */
	.title {
		font-size: var(--text-2xl);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.01em;
		text-transform: uppercase;
	}

	.text {
		padding-top: var(--space-3);
		color: var(--color-ink-muted);
		max-width: 46ch;
	}

	/* ---------- Desktop sticky sequence ----------
	   Layout comes from CSS (JS available, wide screen, motion allowed) so the
	   section has its final height before ScrollTrigger measures it. */
	@media (min-width: 64rem) and (prefers-reduced-motion: no-preference) {
		:global(.js) .process {
			height: calc(var(--count) * 55vh + 70vh);
		}

		:global(.js) .process .sticky {
			position: sticky;
			top: calc(var(--header-h) + var(--space-6));
			min-height: min(70vh, 40rem);
			display: flex;
			align-items: center;
		}

		:global(.js) .process .panel {
			width: 100%;
			grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
			gap: var(--space-16);
			align-items: center;
		}

		:global(.js) .process .big {
			position: relative;
			display: grid;
			align-items: center;
			height: 100%;
			min-height: 22rem;
			padding-left: var(--space-8);
		}

		.big-number {
			grid-area: 1 / 1;
			font-family: var(--font-display);
			font-size: clamp(9rem, 6rem + 9vw, 16rem);
			font-weight: 560;
			line-height: 0.8;
			letter-spacing: -0.05em;
			color: var(--color-accent);
			opacity: 0;
			transform: translateY(24%);
			transition:
				opacity var(--dur-base) var(--ease-out),
				transform var(--dur-slow) var(--ease-out);
		}

		.big-number.is-active {
			opacity: 1;
			transform: none;
		}

		.rail {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			width: 2px;
			background: var(--color-line);
			border-radius: 2px;
			overflow: hidden;
		}

		.rail-fill {
			position: absolute;
			inset: 0;
			background: var(--color-accent);
			transform-origin: 50% 0;
		}

		.sequenced .step {
			align-items: start;
			background: transparent;
			box-shadow: none;
			border-radius: 0;
			border-top: 1px solid var(--color-line);
			padding-inline: 0;
			transition: transform var(--dur-slow) var(--ease-out);
		}

		.sequenced .title {
			font-size: var(--text-3xl);
		}

		.sequenced .number {
			font-size: var(--text-xl);
			padding-top: 0.45em;
		}

		/* Description: collapsed until its step is active. The row height eases
		   open first, then the text fades and rises into place; leaving steps
		   fold away in reverse. */
		.sequenced .text-wrap {
			display: grid;
			grid-template-rows: 0fr;
			transition: grid-template-rows var(--dur-slow) var(--ease-out);
		}

		.sequenced .text-inner {
			min-height: 0;
			overflow: hidden;
		}

		.sequenced .text {
			font-size: var(--text-lg);
			line-height: 1.5;
			opacity: 0;
			transform: translateY(14px);
			transition:
				opacity var(--dur-base) var(--ease-out),
				transform var(--dur-slow) var(--ease-out);
		}

		.sequenced .step.is-active .text-wrap {
			grid-template-rows: 1fr;
		}

		.sequenced .step.is-active .text {
			opacity: 1;
			transform: none;
			transition-delay: 160ms;
		}

		.sequenced .step .title,
		.sequenced .step .number {
			color: var(--color-ink-subtle);
			transition: color var(--dur-base) var(--ease-out);
		}

		.sequenced .step.is-done .number {
			color: var(--color-accent);
		}

		.sequenced .step.is-active {
			transform: translateX(var(--space-4));
		}

		.sequenced .step.is-active .title {
			color: var(--color-ink);
		}

		.sequenced .step.is-active .number {
			color: var(--color-accent);
		}
	}
</style>
