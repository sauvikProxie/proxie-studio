/**
 * Geometry for the launch-timeline chart, cleaned up from images/graph.svg.
 *
 * What the original contained (1199 × 358 viewBox):
 * - a white rounded background rect
 * - path 1: stroked #104127 curve ("With ProxieStudio"), rises from y≈292 to y≈149
 * - path 2: stroked rgba(0,0,0,.08) line ("You Build it Alone"), stays between y≈244 and y≈308
 * - two legend swatch rects + the legend labels as outlined glyph paths
 * - a dashed vertical marker at x=1080 (y 98 → 308), a dot at (1080, 157) on path 1
 * - a dark callout box with "Launched & / Onboarded Beta Users" and the "2 Weeks" label,
 *   all as outlined glyph paths
 *
 * In the component, the two data lines, grid, marker line and dot stay in SVG
 * (so DrawSVG can animate the strokes); every text label becomes real HTML text
 * so it stays readable at any width. Both line paths are strokes, not fills,
 * so DrawSVG animates them directly.
 *
 * To make the chart readable on narrow screens without distorting strokes,
 * the path data itself is stretched vertically around the baseline
 * (y' = BASE + k·(y − BASE)) rather than scaling the SVG non-uniformly.
 */

/** Original path data (unchanged). */
const PROXIE_PATH =
	'm38 292 12.44-6.85c12.44-6.85 37.33-20.54 62.22-37.99s49.78-38.64 74.67-28.71 49.78 50.98 74.67 57.61 49.78-21.17 74.67-34.35c24.89-13.19 49.78-11.77 74.67-3.41 24.89 8.35 49.78 23.64 74.67 23.87 24.89.22 49.78-14.62 74.67-27.7s49.78-24.39 74.67-31.43 49.78-9.81 74.67-3.08 49.78 22.96 74.67 24.91 49.78-10.37 74.67-13.33c24.89-2.97 49.78-26.65 74.67-32.68s49.78-24.47 74.67-28.78 49.77 5.51 74.66 8.21 49.78-1.7 62.23-3.91l12.44-2.2';
const ALONE_PATH =
	'm38 291.76 12.44-4.27c12.44-4.26 37.33-12.79 62.22-24.25s49.78-25.85 74.67-15.91 49.78 44.21 74.67 51.57 49.78-12.19 74.67-20.33c24.89-8.13 49.78-4.85 74.67 3.86s49.78 22.84 74.67 25.19 49.78-7.08 74.67-15.12c24.89-8.05 49.78-14.71 74.67-18.04s49.78-3.31 74.67 4.13 49.78 22.3 74.67 26.01c24.89 3.7 49.78-3.75 74.67-3.89s49.78 7.02 74.67 4.49c24.89-2.54 49.78-14.77 74.67-15.97 24.89-1.19 49.77-21.34 74.66-17.05s49.78 3.02 62.23 2.39l12.44-.64';

const BASE = 308; // baseline (bottom of the marker line)
const TOP = 98; // top of the marker line
const X_MIN = 14;
const X_MAX = 1186;
const AXIS_X = 38;
const MARKER = { x: 1080, y: 157 };
const GRID_STEPS = 4;

/** Scale every y coordinate of an SVG path around BASE by factor k. */
function stretchPath(d: string, k: number): string {
	const tokens = d.match(/[a-zA-Z]|-?(?:\d*\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/g) ?? [];
	const params: Record<string, number> = { m: 2, l: 2, c: 6, s: 4, q: 4, t: 2, h: 1, v: 1 };
	const out: string[] = [];
	let cmd = '';
	let index = 0;
	let first = true;

	for (const token of tokens) {
		if (/[a-zA-Z]/.test(token)) {
			cmd = token;
			index = 0;
			out.push(token);
			continue;
		}
		const lower = cmd.toLowerCase();
		const count = params[lower] ?? 2;
		// After the first pair, extra "m" pairs are implicit "l" (same relativity)
		const absolute = cmd === cmd.toUpperCase() || (first && lower === 'm' && index < 2);
		const isY = lower === 'v' || (lower !== 'h' && index % 2 === 1);
		let value = Number(token);
		if (isY) value = absolute ? BASE + k * (value - BASE) : k * value;
		out.push(String(Math.round(value * 100) / 100));
		index = (index + 1) % count;
		if (index === 0) first = false;
	}
	return out.join(' ').replace(/ ([a-zA-Z]) /g, '$1');
}

export interface ChartVariant {
	id: 'wide' | 'narrow';
	viewBox: string;
	width: number;
	height: number;
	proxie: string;
	alone: string;
	grid: number[];
	axis: { x: number; y1: number; y2: number };
	marker: { x: number; y1: number; y2: number; dotY: number; r: number };
	/** Overlay positions in % of the chart box */
	overlay: {
		marker: { left: number; top: number };
		callout: { left: number; top: number };
	};
	stroke: number;
}

function variant(id: ChartVariant['id'], k: number, stroke: number, dotR: number): ChartVariant {
	const y = (v: number) => BASE + k * (v - BASE);
	const top = y(TOP);
	const pad = { top: 14, bottom: 22 };
	const vbY = top - pad.top;
	const width = X_MAX - X_MIN;
	const height = BASE + pad.bottom - vbY;
	const pct = (vx: number, vy: number) => ({
		left: ((vx - X_MIN) / width) * 100,
		top: ((vy - vbY) / height) * 100
	});
	const grid = Array.from({ length: GRID_STEPS }, (_, i) => y(TOP + ((BASE - TOP) / GRID_STEPS) * i));

	return {
		id,
		viewBox: `${X_MIN} ${round(vbY)} ${width} ${round(height)}`,
		width,
		height: round(height),
		proxie: stretchPath(PROXIE_PATH, k),
		alone: stretchPath(ALONE_PATH, k),
		grid: grid.map(round),
		axis: { x: AXIS_X, y1: round(top), y2: BASE },
		marker: { x: MARKER.x, y1: round(top), y2: BASE, dotY: round(y(MARKER.y)), r: dotR },
		overlay: {
			marker: pct(MARKER.x, top),
			callout: pct(MARKER.x - 26 / Math.max(1, k / 2), y(MARKER.y))
		},
		stroke
	};
}

function round(v: number) {
	return Math.round(v * 100) / 100;
}

/** Wide variant for tablet/desktop, narrow (taller) variant for phones. */
export const chartVariants: readonly ChartVariant[] = [
	variant('wide', 1.55, 4, 8),
	variant('narrow', 3.6, 9, 18)
];
