<script lang="ts" module>
	export type ArtKind = 'data' | 'ai' | 'apps' | 'experience' | 'vision' | 'voice';

	/** Deterministic pseudo-random numbers from a string seed (mulberry32). */
	function rng(seed: string) {
		let h = 1779033703 ^ seed.length;
		for (let i = 0; i < seed.length; i++) {
			h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
			h = (h << 13) | (h >>> 19);
		}
		let a = h >>> 0;
		return () => {
			a |= 0;
			a = (a + 0x6d2b79f5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	/** Smooth path (Catmull-Rom → cubic Bézier) through points. */
	function smooth(points: [number, number][]) {
		let d = `M${points[0][0]} ${points[0][1]}`;
		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i - 1] ?? points[i];
			const p1 = points[i];
			const p2 = points[i + 1];
			const p3 = points[i + 2] ?? p2;
			const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
			const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
			d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1].toFixed(1)}`;
		}
		return d;
	}
</script>

<script lang="ts">
	import { artReveal } from '#lib/motion/attachments.ts';

	/**
	 * Code-made artwork: abstract interface scenes in the brand palette.
	 * Decorative only (aria-hidden). No text or figures are drawn, so the art
	 * never adds claims. `seed` varies the composition per page.
	 */
	let {
		kind,
		seed = kind,
		class: className = ''
	}: { kind: ArtKind; seed?: string; class?: string } = $props();

	const uid = $derived(`art-${kind}-${seed.replace(/[^a-z0-9]/gi, '')}`);
	// Shared randomness, computed once per instance
	const bars = $derived.by(() => {
		const rand = rng(seed + 'bars');
		return Array.from({ length: 9 }, () => 0.28 + rand() * 0.72);
	});
	const linePoints = $derived.by(() => {
		const rand = rng(seed + 'line');
		return Array.from({ length: 8 }, (_, i) => [78 + i * 46, 220 - (i * 12 + rand() * 70)] as [number, number]);
	});
	const highlight = $derived(Math.floor(rng(seed + 'hl')() * 9));
	const donut = $derived(0.45 + rng(seed + 'donut')() * 0.45);
	const wave = $derived.by(() => {
		const rand = rng(seed + 'wave');
		return Array.from({ length: 28 }, (_, i) => 0.2 + Math.abs(Math.sin(i * 0.55 + rand() * 2)) * 0.8);
	});
	const net = $derived.by(() => {
		const rand = rng(seed + 'net');
		const layers = [4, 5, 5, 3];
		const nodes = layers.map((n, li) =>
			Array.from({ length: n }, (_, i) => [130 + li * 125, 240 - ((n - 1) * 62) / 2 + i * 62] as [number, number])
		);
		const edges: { a: [number, number]; b: [number, number]; hot: boolean }[] = [];
		for (let li = 0; li < nodes.length - 1; li++)
			for (const a of nodes[li]) for (const b of nodes[li + 1]) edges.push({ a, b, hot: rand() > 0.82 });
		return { nodes, edges };
	});
</script>

<svg
	class="art art--{kind} {className}"
	viewBox="0 0 640 480"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
	focusable="false"
	{@attach artReveal()}
>
	<defs>
		<radialGradient id="{uid}-glow" cx="78%" cy="18%" r="62%">
			<stop offset="0" stop-color="#e2574c" stop-opacity="0.55" />
			<stop offset="0.55" stop-color="#e2574c" stop-opacity="0.08" />
			<stop offset="1" stop-color="#e2574c" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="{uid}-glow2" cx="10%" cy="100%" r="55%">
			<stop offset="0" stop-color="#ffb38a" stop-opacity="0.28" />
			<stop offset="1" stop-color="#ffb38a" stop-opacity="0" />
		</radialGradient>
		<linearGradient id="{uid}-bar" x1="0" y1="1" x2="0" y2="0">
			<stop offset="0" stop-color="#b8392e" />
			<stop offset="1" stop-color="#ffb38a" />
		</linearGradient>
		<linearGradient id="{uid}-sheen" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#ffffff" stop-opacity="0.09" />
			<stop offset="1" stop-color="#ffffff" stop-opacity="0.02" />
		</linearGradient>
		<pattern id="{uid}-dots" width="9" height="9" patternUnits="userSpaceOnUse">
			<circle cx="4.5" cy="4.5" r="1" fill="#e2574c" opacity="0.5" />
		</pattern>
		<radialGradient id="{uid}-dotmask-g" cx="0%" cy="100%" r="70%">
			<stop offset="0" stop-color="#fff" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</radialGradient>
		<mask id="{uid}-dotmask"><rect width="640" height="480" fill="url(#{uid}-dotmask-g)" /></mask>
		<filter id="{uid}-blur" x="-20%" y="-20%" width="140%" height="140%">
			<feGaussianBlur stdDeviation="6" />
		</filter>
	</defs>

	<!-- Backdrop: ink, glows, dither -->
	<rect width="640" height="480" fill="#15100e" />
	<rect width="640" height="480" fill="url(#{uid}-glow)" />
	<rect width="640" height="480" fill="url(#{uid}-glow2)" />
	<rect width="640" height="480" fill="url(#{uid}-dots)" mask="url(#{uid}-dotmask)" />

	{#if kind === 'data'}
		<g class="panel" data-art-in>
			<rect x="40" y="70" width="400" height="330" rx="20" class="card" />
			<rect x="64" y="96" width="92" height="9" rx="4.5" class="sk sk--strong" />
			<rect x="64" y="114" width="56" height="7" rx="3.5" class="sk" />
			<rect x="356" y="94" width="60" height="24" rx="12" class="pill" />
			{#each bars as h, i (i)}
				<rect
					data-art-bar
					x={70 + i * 39}
					y={372 - h * 190}
					width="22"
					height={h * 190}
					rx="6"
					fill={i === highlight ? `url(#${uid}-bar)` : 'rgb(226 87 76 / 0.22)'}
				/>
			{/each}
			<path d={smooth(linePoints)} class="line-glow" filter="url(#{uid}-blur)" />
			<path d={smooth(linePoints)} class="line" data-art-draw />
			{#each linePoints as p, i (i)}
				{#if i === linePoints.length - 1}
					<circle cx={p[0]} cy={p[1]} r="6" class="dot" />
				{/if}
			{/each}
		</g>
		<g data-art-in>
			<rect x="460" y="100" width="150" height="160" rx="20" class="card" />
			<circle cx="535" cy="180" r="44" class="ring-bg" />
			<circle
				cx="535"
				cy="180"
				r="44"
				class="ring"
				stroke="url(#{uid}-bar)"
				stroke-dasharray="{donut * 276.5} 276.5"
				transform="rotate(-90 535 180)"
				data-art-draw
			/>
			<circle cx="535" cy="180" r="5" class="dot" />
		</g>
		<g data-art-in>
			<rect x="460" y="276" width="150" height="124" rx="20" class="card" />
			{#each [0, 1, 2] as i (i)}
				<circle cx="484" cy={308 + i * 32} r="6" fill={i === 0 ? '#ffb38a' : 'rgb(226 87 76 / 0.4)'} />
				<rect x="498" y={304 + i * 32} width={70 - i * 14} height="8" rx="4" class="sk" />
			{/each}
		</g>
		<g class="chip float" data-art-in>
			<rect x="300" y="34" width="168" height="48" rx="24" class="glass" />
			<circle cx="326" cy="58" r="8" fill="#e2574c" />
			<rect x="344" y="51" width="96" height="8" rx="4" class="sk sk--strong" />
			<rect x="344" y="63" width="60" height="6" rx="3" class="sk" />
		</g>
	{:else if kind === 'ai'}
		<circle cx="320" cy="240" r="150" fill="url(#{uid}-glow)" opacity="0.7" />
		<g data-art-in>
			{#each net.edges as e, i (i)}
				<line x1={e.a[0]} y1={e.a[1]} x2={e.b[0]} y2={e.b[1]} class={e.hot ? 'edge edge--hot' : 'edge'} data-art-draw={e.hot || undefined} />
			{/each}
		</g>
		<g data-art-in>
			{#each net.nodes as layer, li (li)}
				{#each layer as n, ni (ni)}
					<circle cx={n[0]} cy={n[1]} r={li === 3 ? 13 : 9} class="node" class:node--hot={(li + ni) % 3 === 0} />
					{#if (li + ni) % 3 === 0}
						<circle cx={n[0]} cy={n[1]} r="20" class="pulse" style="animation-delay: {(li * 0.4 + ni * 0.25).toFixed(2)}s" />
					{/if}
				{/each}
			{/each}
		</g>
		<g class="chip float" data-art-in>
			<rect x="430" y="44" width="176" height="52" rx="26" class="glass" />
			<path d="M458 70 l6 -12 l6 12 l-6 12 z" fill="#ffb38a" />
			<rect x="482" y="62" width="100" height="8" rx="4" class="sk sk--strong" />
			<rect x="482" y="74" width="64" height="6" rx="3" class="sk" />
		</g>
		<g class="chip float" style="animation-delay: -3s" data-art-in>
			<rect x="40" y="390" width="190" height="52" rx="26" class="glass" />
			<circle cx="66" cy="416" r="9" class="ring-bg" />
			<path d="M61 416 l4 4 l8 -9" class="tick" />
			<rect x="86" y="408" width="118" height="8" rx="4" class="sk sk--strong" />
			<rect x="86" y="420" width="70" height="6" rx="3" class="sk" />
		</g>
	{:else if kind === 'apps'}
		<g data-art-in>
			<rect x="44" y="56" width="552" height="372" rx="22" class="card" />
			<circle cx="70" cy="80" r="5" fill="#ffb38a" />
			<circle cx="86" cy="80" r="5" class="sk" />
			<circle cx="102" cy="80" r="5" class="sk" />
			<line x1="44" y1="102" x2="596" y2="102" class="divider" />
			<!-- sidebar -->
			{#each [0, 1, 2, 3, 4] as i (i)}
				<rect x="64" y={124 + i * 34} width="104" height="24" rx="8" class={i === highlight % 5 ? 'pill' : 'sk-row'} />
			{/each}
			<line x1="188" y1="102" x2="188" y2="428" class="divider" />
			<!-- kanban -->
			{#each [0, 1, 2] as c (c)}
				<rect x={206 + c * 126} y="122" width="70" height="8" rx="4" class="sk sk--strong" />
				{#each Array.from({ length: 3 - (c === 1 ? 1 : 0) + (c === 2 ? 0 : 0) }, (_, k) => k) as k (k)}
					<g data-art-in>
						<rect x={206 + c * 126} y={144 + k * 84} width="112" height="72" rx="12" class="tile" />
						<rect x={218 + c * 126} y={158 + k * 84} width={62 + ((c + k) % 3) * 12} height="7" rx="3.5" class="sk sk--strong" />
						<rect x={218 + c * 126} y={172 + k * 84} width="48" height="6" rx="3" class="sk" />
						<rect
							x={218 + c * 126}
							y={192 + k * 84}
							width="36"
							height="14"
							rx="7"
							fill={(c + k + highlight) % 3 === 0 ? '#ffb38a' : 'rgb(226 87 76 / 0.35)'}
						/>
					</g>
				{/each}
			{/each}
		</g>
		<g class="chip float" data-art-in>
			<rect x="410" y="300" width="200" height="120" rx="20" class="glass" />
			{#each [0, 1, 2] as i (i)}
				<circle cx="436" cy={328 + i * 30} r="9" class={i < 2 ? 'check-on' : 'ring-bg'} />
				{#if i < 2}<path d="M431 {328 + i * 30} l4 4 l8 -9" class="tick tick--ink" />{/if}
				<rect x="454" y={324 + i * 30} width={110 - i * 20} height="8" rx="4" class="sk sk--strong" />
			{/each}
		</g>
		<g class="float" style="animation-delay: -2s" data-art-in>
			<rect x="470" y="40" width="74" height="38" rx="19" fill="#e2574c" />
			<circle cx="525" cy="59" r="14" fill="#15100e" />
		</g>
	{:else if kind === 'experience'}
		<g data-art-in>
			<rect x="36" y="58" width="450" height="352" rx="22" class="card" />
			<circle cx="60" cy="82" r="5" fill="#ffb38a" />
			<circle cx="76" cy="82" r="5" class="sk" />
			<circle cx="92" cy="82" r="5" class="sk" />
			<rect x="180" y="74" width="180" height="16" rx="8" class="sk-row" />
			<line x1="36" y1="104" x2="486" y2="104" class="divider" />
			<rect x="64" y="134" width="230" height="20" rx="10" class="sk sk--strong" />
			<rect x="64" y="164" width="170" height="20" rx="10" class="sk sk--strong" />
			<rect x="64" y="200" width="200" height="8" rx="4" class="sk" />
			<rect x="64" y="216" width="150" height="8" rx="4" class="sk" />
			<rect x="64" y="240" width="98" height="30" rx="15" fill="#ffb38a" />
			<rect x="310" y="128" width="150" height="148" rx="16" fill="url(#{uid}-bar)" opacity="0.9" />
			<circle cx="385" cy="202" r="40" fill="#15100e" opacity="0.25" />
			{#each [0, 1, 2] as i (i)}
				<rect x={64 + i * 134} y="298" width="122" height="86" rx="14" class="tile" />
				<rect x={78 + i * 134} y="314" width="60" height="7" rx="3.5" class="sk sk--strong" />
				<rect x={78 + i * 134} y="328" width="80" height="6" rx="3" class="sk" />
			{/each}
		</g>
		<g class="float" data-art-in>
			<rect x="452" y="128" width="152" height="300" rx="28" class="phone" />
			<rect x="504" y="142" width="48" height="8" rx="4" fill="#15100e" />
			<rect x="468" y="166" width="120" height="96" rx="14" fill="url(#{uid}-bar)" />
			<rect x="468" y="276" width="96" height="10" rx="5" class="sk sk--strong" />
			<rect x="468" y="294" width="72" height="7" rx="3.5" class="sk" />
			<rect x="468" y="380" width="120" height="30" rx="15" fill="#ffb38a" />
		</g>
		<g class="float" style="animation-delay: -4s" data-art-in>
			{#each ['#b8392e', '#e2574c', '#ffb38a', '#f4f1ec'] as c, i (c)}
				<circle cx={70 + i * 30} cy="440" r="12" fill={c} stroke="#15100e" stroke-width="3" />
			{/each}
		</g>
	{:else if kind === 'vision'}
		<g data-art-in>
			{#each [150, 118, 86] as rr, i (rr)}
				<circle cx="300" cy="240" r={rr} class="lens" style="opacity: {0.25 + i * 0.25}" data-art-draw />
			{/each}
			<circle cx="300" cy="240" r="54" fill="url(#{uid}-bar)" opacity="0.85" />
			<circle cx="300" cy="240" r="22" fill="#15100e" />
			<circle cx="290" cy="230" r="7" fill="#f4f1ec" opacity="0.8" />
			<!-- viewfinder corners -->
			<path d="M110 90 h46 M110 90 v46 M490 90 h-46 M490 90 v46 M110 390 h46 M110 390 v-46 M490 390 h-46 M490 390 v-46" class="corners" />
			<g class="scan"><rect x="110" y="236" width="380" height="3" rx="1.5" fill="#ffb38a" /><rect x="110" y="200" width="380" height="40" fill="url(#{uid}-bar)" opacity="0.12" /></g>
		</g>
		<g class="chip float" data-art-in>
			<rect x="470" y="300" width="146" height="70" rx="22" class="glass" />
			{#each wave.slice(0, 11) as h, i (i)}
				<rect x={488 + i * 10} y={335 - h * 20} width="5" height={h * 40} rx="2.5" fill={i % 3 === 0 ? '#ffb38a' : '#e2574c'} />
			{/each}
		</g>
	{:else if kind === 'voice'}
		<g data-art-in>
			{#each wave as h, i (i)}
				<rect
					data-art-bar
					x={46 + i * 9}
					y={240 - h * 90}
					width="5"
					height={h * 180}
					rx="2.5"
					fill={i % 5 === 0 ? '#ffb38a' : 'rgb(226 87 76 / 0.7)'}
				/>
			{/each}
		</g>
		<path d="M312 240 C 340 240, 350 240, 372 240" class="line" data-art-draw />
		<path d="M362 230 l12 10 l-12 10" class="line" />
		<g data-art-in>
			<rect x="392" y="96" width="210" height="288" rx="20" class="card" />
			<rect x="414" y="120" width="120" height="12" rx="6" class="sk sk--strong" />
			{#each [0, 1, 2, 3, 4] as i (i)}
				<circle cx="420" cy={164 + i * 34} r="5" fill={i < 3 ? '#ffb38a' : 'rgb(226 87 76 / 0.4)'} />
				<rect x="434" y={160 + i * 34} width={140 - ((i * 23) % 50)} height="8" rx="4" class="sk" />
			{/each}
		</g>
		<g class="chip float" data-art-in>
			<rect x="430" y="34" width="150" height="52" rx="16" class="glass" />
			{#each [0, 1, 2, 3, 4, 5, 6] as d (d)}
				<rect x={444 + d * 18} y="48" width="12" height="12" rx="3" fill={d === 4 ? '#ffb38a' : 'rgb(244 241 236 / 0.14)'} />
				<rect x={444 + d * 18} y="66" width="12" height="6" rx="3" class="sk" />
			{/each}
		</g>
	{/if}

	<!-- Sheen across the whole piece -->
	<rect width="640" height="480" fill="url(#{uid}-sheen)" />
</svg>

<style>
	.art {
		display: block;
		width: 100%;
		height: 100%;
	}

	.card {
		fill: #1d1715;
		stroke: rgb(244 241 236 / 0.08);
	}

	.tile {
		fill: #261e1b;
		stroke: rgb(244 241 236 / 0.06);
	}

	.glass {
		fill: rgb(244 241 236 / 0.08);
		stroke: rgb(244 241 236 / 0.16);
	}

	.phone {
		fill: #1d1715;
		stroke: rgb(244 241 236 / 0.18);
		stroke-width: 2;
	}

	.sk {
		fill: rgb(244 241 236 / 0.16);
	}

	.sk--strong {
		fill: rgb(244 241 236 / 0.42);
	}

	.sk-row {
		fill: rgb(244 241 236 / 0.06);
	}

	.pill {
		fill: rgb(226 87 76 / 0.3);
	}

	.divider {
		stroke: rgb(244 241 236 / 0.08);
	}

	.line {
		fill: none;
		stroke: #ffb38a;
		stroke-width: 3.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.line-glow {
		fill: none;
		stroke: #e2574c;
		stroke-width: 10;
		opacity: 0.55;
	}

	.dot {
		fill: #ffb38a;
		stroke: #15100e;
		stroke-width: 3;
	}

	.ring-bg {
		fill: none;
		stroke: rgb(244 241 236 / 0.12);
		stroke-width: 10;
	}

	.ring {
		fill: none;
		stroke-width: 10;
		stroke-linecap: round;
	}

	.edge {
		stroke: rgb(244 241 236 / 0.09);
		stroke-width: 1.5;
	}

	.edge--hot {
		stroke: #ffb38a;
		stroke-width: 2.25;
		opacity: 0.9;
	}

	.node {
		fill: #1d1715;
		stroke: rgb(226 87 76 / 0.7);
		stroke-width: 2;
	}

	.node--hot {
		fill: #e2574c;
		stroke: #ffb38a;
	}

	.pulse {
		fill: none;
		stroke: #e2574c;
		stroke-width: 1.5;
		transform-box: fill-box;
		transform-origin: center;
		opacity: 0;
	}

	.tick {
		fill: none;
		stroke: #ffb38a;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.tick--ink {
		stroke: #15100e;
	}

	.check-on {
		fill: #ffb38a;
	}

	.lens {
		fill: none;
		stroke: #e2574c;
		stroke-width: 2;
	}

	.corners {
		fill: none;
		stroke: #f4f1ec;
		stroke-width: 3;
		stroke-linecap: round;
		opacity: 0.7;
	}

	.chip,
	.float {
		transform-box: fill-box;
	}

	@media (prefers-reduced-motion: no-preference) {
		.pulse {
			animation: pulse 2.8s var(--ease-out) infinite;
		}

		.scan {
			animation: scan 4.5s var(--ease-in-out) infinite alternate;
		}
	}

	@keyframes pulse {
		0% {
			opacity: 0.7;
			transform: scale(0.6);
		}
		100% {
			opacity: 0;
			transform: scale(1.6);
		}
	}

	@keyframes scan {
		from {
			transform: translateY(-120px);
		}
		to {
			transform: translateY(120px);
		}
	}
</style>
