<script lang="ts">
	import { twoWeeks } from '#lib/content/blocks.ts';
	import { chartVariants } from './launch-geometry.ts';

	/**
	 * The launch-timeline chart from images/graph.svg as an inline, animatable
	 * component. Lines, grid and marker are SVG; all labels are real text with
	 * the exact wording of the original. Two geometry variants (wide / narrow)
	 * keep labels readable at every width. The animation itself lives in the
	 * `launchGraph` attachment on the surrounding section.
	 */
	const chart = twoWeeks.chart;
</script>

<div class="chart" role="img" aria-label={chart.ariaLabel}>
	{#each chartVariants as v (v.id)}
		<div class="variant variant--{v.id}" data-chart>
			<ul class="legend" data-chart-legend>
				<li><span class="swatch swatch--proxie"></span>{chart.proxie}</li>
				<li><span class="swatch swatch--alone"></span>{chart.alone}</li>
			</ul>

			<div class="plot" style="aspect-ratio: {v.width} / {v.height}">
				<svg viewBox={v.viewBox} preserveAspectRatio="xMidYMid meet" focusable="false">
					<g class="grid" data-chart-grid>
						{#each v.grid as y (y)}
							<line x1={v.axis.x} x2="1158" y1={y} y2={y} />
						{/each}
					</g>
					<g class="axes" data-chart-grid>
						<line x1={v.axis.x} x2="1158" y1={v.axis.y2} y2={v.axis.y2} />
						<line x1={v.axis.x} x2={v.axis.x} y1={v.axis.y1} y2={v.axis.y2} />
					</g>

					<path class="line line--alone" d={v.alone} style="stroke-width: {v.stroke}" data-line="alone" />
					<path class="line line--proxie" d={v.proxie} style="stroke-width: {v.stroke}" data-line="proxie" />

					<line
						class="marker-line"
						x1={v.marker.x}
						x2={v.marker.x}
						y1={v.marker.y1}
						y2={v.marker.y2}
						style="stroke-width: {v.stroke * 0.75}; stroke-dasharray: {v.stroke * 2.5} {v.stroke * 2.5}"
						data-marker-line
					/>
					<g data-marker-dot>
						<circle class="halo" cx={v.marker.x} cy={v.marker.dotY} r={v.marker.r * 2.2} />
						<circle class="dot" cx={v.marker.x} cy={v.marker.dotY} r={v.marker.r} />
					</g>
				</svg>

				<!-- Outer spans position (CSS %), inner spans animate (GSAP) -->
				<span class="marker-value" style="left: {v.overlay.marker.left}%; top: {v.overlay.marker.top}%">
					<span class="inner" data-marker-label>{chart.marker}</span>
				</span>
				<span class="callout" style="left: {v.overlay.callout.left}%; top: {v.overlay.callout.top}%">
					<span class="callout-box" data-marker-label>
						<span>{chart.markerLabel[0]}</span>
						<span>{chart.markerLabel[1]}</span>
					</span>
				</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.chart {
		--chart-proxie: var(--color-accent);
		--chart-alone: var(--color-chart-muted);
		--chart-grid: var(--color-line);
		position: relative;
	}

	.variant--wide {
		display: none;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-6);
		list-style: none;
		padding: 0;
		margin-bottom: var(--space-10);
		font-size: var(--text-sm);
		font-weight: 560;
	}

	.legend li {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
	}

	.swatch {
		width: 1.75rem;
		height: 0.3125rem;
		border-radius: 1px;
	}

	.swatch--proxie {
		background: var(--chart-proxie);
	}

	.swatch--alone {
		background: var(--chart-alone);
	}

	.plot {
		position: relative;
		width: 100%;
	}

	svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.grid line {
		stroke: var(--chart-grid);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
		stroke-dasharray: 2 6;
	}

	.axes line {
		stroke: var(--color-line-strong);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
	}

	.line {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.line--proxie {
		stroke: var(--chart-proxie);
	}

	.line--alone {
		stroke: var(--chart-alone);
	}

	.marker-line {
		stroke: var(--color-ink);
		stroke-opacity: 0.55;
		stroke-linecap: round;
	}

	.dot {
		fill: var(--chart-proxie);
		stroke: var(--color-surface);
		stroke-width: 3;
	}

	.halo {
		fill: var(--chart-proxie);
		opacity: 0.16;
	}

	.marker-value {
		position: absolute;
		transform: translate(-50%, calc(-100% - 0.5rem));
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 620;
		letter-spacing: var(--tracking-snug);
		white-space: nowrap;
	}

	.inner {
		display: block;
	}

	.callout {
		position: absolute;
		transform: translate(calc(-100% - 0.875rem), -50%);
	}

	.callout-box {
		display: grid;
		padding: 0.5rem 0.75rem;
		border-radius: var(--radius-sm);
		background: var(--color-ink);
		color: var(--color-paper);
		font-size: var(--text-xs);
		font-weight: 560;
		line-height: 1.35;
		white-space: nowrap;
		box-shadow: var(--shadow-md);
	}

	@media (min-width: 40rem) {
		.variant--wide {
			display: block;
		}

		.variant--narrow {
			display: none;
		}

		.callout-box {
			font-size: var(--text-sm);
			padding: 0.625rem 0.875rem;
		}
	}
</style>
