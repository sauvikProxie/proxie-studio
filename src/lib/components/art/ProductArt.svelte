<script lang="ts">
	/**
	 * Isometric product scene for the home page product cards. Flat layers
	 * (two sheets, an app window, floating cards) sit in one CSS 3D stack.
	 * At rest the stack is greyscale and tight; while a [data-art-host]
	 * ancestor is hovered or keyboard-focused, the layers spread apart in depth
	 * and colour fades in. Decorative only: no text, so the art adds no claims.
	 * Sized in em off the container width, so it scales with the card.
	 */
	let { kind }: { kind: 'vision' | 'voice' } = $props();

	const wave = (n: number, k: number) =>
		Array.from({ length: n }, (_, i) => 0.25 + Math.abs(Math.sin(i * k) * Math.cos(i * 0.23)) * 0.75);
	const chipWave = wave(14, 0.9);
	const voiceWave = wave(18, 0.7);
</script>

<div class="pa" aria-hidden="true">
	<div class="haze"></div>
	<div class="stage">
		<div class="iso">
			<div class="layer sheet sheet--dashed" style="--rest: -1.6em; --lift: -6.4em"></div>
			<div class="layer sheet" style="--rest: -0.8em; --lift: -3.2em"></div>

			<div class="layer window" style="--rest: 0em; --lift: 0.8em">
				<div class="window-bar">
					<span class="status"></span>
					<span class="sk sk--strong" style="width: 6em"></span>
					<span class="spacer"></span>
					<span class="sk" style="width: 3em"></span>
					<span class="sk" style="width: 2.2em"></span>
				</div>
			</div>

			{#if kind === 'vision'}
				<!-- Camera view: the eye in a viewfinder -->
				<div class="layer panel" style="--x: 1.4em; --y: 4em; --w: 14.6em; --h: 16.6em; --lift: 3.6em; --accent: #ffb38a">
					<svg viewBox="0 0 146 166" class="fill">
						<path d="M16 24 h18 M16 24 v18 M130 24 h-18 M130 24 v18 M16 150 h18 M16 150 v-18 M130 150 h-18 M130 150 v-18" class="corners" />
						<circle cx="73" cy="87" r="50" class="lens" opacity="0.3" />
						<circle cx="73" cy="87" r="38" class="lens" opacity="0.55" />
						<circle cx="73" cy="87" r="26" class="lens" opacity="0.85" />
						<rect x="16" y="70" width="114" height="17" fill="#ffb38a" opacity="0.1" />
						<circle cx="73" cy="87" r="19" fill="#e2574c" />
						<circle cx="73" cy="87" r="13" fill="#ffb38a" opacity="0.55" />
						<circle cx="73" cy="87" r="8" fill="#15100e" />
						<circle cx="69.5" cy="83.5" r="2.6" fill="#f4f1ec" opacity="0.85" />
						<rect x="16" y="86" width="114" height="1.6" rx="0.8" fill="#ffb38a" />
					</svg>
				</div>
				<!-- What it sees -->
				<div class="layer panel stack" style="--x: 17.4em; --y: 4em; --w: 15.2em; --h: 10.6em; --lift: 2.6em; --delay: 60ms; --accent: #e2574c">
					<div class="row row--head"><span class="sk sk--strong" style="width: 5.4em"></span><span class="sk" style="width: 2em"></span></div>
					<div class="row"><span class="dot dot--on"></span><span class="sk" style="width: 8em"></span></div>
					<div class="row"><span class="dot dot--on"></span><span class="sk" style="width: 6.2em"></span></div>
					<div class="row"><span class="dot"></span><span class="sk" style="width: 7em"></span></div>
					<span class="pill"></span>
				</div>
				<!-- Spoken back -->
				<div class="layer panel chip" style="--x: 17.4em; --y: 15.6em; --w: 15.2em; --h: 5em; --lift: 4.6em; --delay: 120ms; --accent: #b8392e">
					<span class="dot dot--on"></span>
					<span class="wave">
						{#each chipWave as h, i (i)}
							<span class="wbar" class:wbar--hi={i % 3 === 0} style="height: {(h * 2.6).toFixed(2)}em"></span>
						{/each}
					</span>
				</div>
			{:else}
				<!-- Live audio -->
				<div class="layer panel stack" style="--x: 1.4em; --y: 4em; --w: 15.6em; --h: 16.6em; --lift: 2.6em; --accent: #e2574c">
					<div class="row row--head"><span class="dot dot--on"></span><span class="sk sk--strong" style="width: 4.6em"></span></div>
					<span class="wave wave--big">
						{#each voiceWave as h, i (i)}
							<span class="wbar" class:wbar--hi={i % 5 === 0} style="height: {(h * 9).toFixed(2)}em"></span>
						{/each}
					</span>
					<div class="row"><span class="sk" style="width: 9em"></span></div>
				</div>
				<!-- Notes -->
				<div class="layer panel stack" style="--x: 18.4em; --y: 4em; --w: 14.2em; --h: 11.4em; --lift: 3.6em; --delay: 60ms; --accent: #ffb38a">
					<div class="row row--head"><span class="sk sk--strong" style="width: 6em"></span></div>
					<div class="row"><span class="dot dot--on"></span><span class="sk" style="width: 7.6em"></span></div>
					<div class="row"><span class="dot dot--on"></span><span class="sk" style="width: 6em"></span></div>
					<div class="row"><span class="dot dot--on"></span><span class="sk" style="width: 6.8em"></span></div>
					<span class="pill"></span>
				</div>
				<!-- Calendar -->
				<div class="layer panel chip" style="--x: 18.4em; --y: 16.4em; --w: 14.2em; --h: 4.2em; --lift: 4.8em; --delay: 120ms; --accent: #b8392e">
					{#each [0, 1, 2, 3, 4, 5, 6] as d (d)}
						<span class="day" class:day--on={d === 4}></span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.pa {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		container-type: inline-size;
		background: #15100e;
	}

	.haze {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 80% 8%, rgb(226 87 76 / 0.32), transparent 55%),
			radial-gradient(circle at 8% 100%, rgb(255 179 138 / 0.12), transparent 50%);
		filter: grayscale(1);
		opacity: 0.6;
		transition:
			filter var(--dur-base) var(--ease-out),
			opacity var(--dur-base) var(--ease-out);
	}

	.stage {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		/* 1em = 1/52 of the card width: the scene is drawn on a 52 × 32.5em canvas */
		font-size: calc(100cqw / 52);
		perspective: 150em;
		background-image: radial-gradient(circle, rgb(244 241 236 / 0.1) 0.06em, transparent 0.09em);
		background-size: 1.3em 1.3em;
		background-position: center;
	}

	.iso {
		position: relative;
		width: 34em;
		height: 22em;
		margin-top: -0.8em;
		transform-style: preserve-3d;
		transform: rotateX(55deg) rotateZ(-36deg);
	}

	/* ---------- Layers ---------- */
	.layer {
		position: absolute;
		transform: translateZ(var(--rest));
		filter: grayscale(1);
		transition:
			transform calc(var(--dur-base) * 1.4) var(--ease-out) var(--delay, 0ms),
			filter var(--dur-base) var(--ease-out),
			box-shadow calc(var(--dur-base) * 1.4) var(--ease-out) var(--delay, 0ms);
	}

	.sheet {
		inset: 0;
		border-radius: 1em;
		background: rgb(244 241 236 / 0.05);
		border: 1px solid rgb(244 241 236 / 0.16);
	}

	.sheet--dashed {
		background: none;
		border: 1px dashed rgb(244 241 236 / 0.24);
	}

	.window {
		inset: 0;
		border-radius: 1em;
		background: #1e1816;
		border: 1px solid rgb(244 241 236 / 0.1);
	}

	.window-bar {
		display: flex;
		align-items: center;
		gap: 0.7em;
		height: 2.8em;
		padding: 0 1.2em;
		border-bottom: 1px solid rgb(244 241 236 / 0.08);
	}

	.spacer {
		flex: 1;
	}

	.status {
		width: 0.7em;
		height: 0.7em;
		border-radius: 50%;
		background: #e2574c;
		box-shadow: 0 0 0.6em rgb(226 87 76 / 0.8);
	}

	.panel {
		--rest: 0.3em;
		left: var(--x);
		top: var(--y);
		width: var(--w);
		height: var(--h);
		overflow: hidden;
		border-radius: 0.8em;
		background: #261e1b;
		border: 1px solid rgb(244 241 236 / 0.09);
		box-shadow: 0 0.2em 0.4em rgb(0 0 0 / 0.3);
	}

	/* Accent strip along the top edge, shown on hover */
	.panel::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 0.28em;
		background: var(--accent);
		opacity: 0;
		transition: opacity var(--dur-base) var(--ease-out);
	}

	.fill {
		display: block;
		width: 100%;
		height: 100%;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 0.9em;
		padding: 1.3em 1.2em 1.2em;
	}

	.chip {
		display: flex;
		align-items: center;
		gap: 0.6em;
		padding: 0 1.2em;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 0.6em;
	}

	.row--head {
		justify-content: space-between;
		margin-bottom: 0.2em;
	}

	.sk {
		display: block;
		height: 0.5em;
		border-radius: 0.25em;
		background: rgb(244 241 236 / 0.2);
	}

	.sk--strong {
		height: 0.6em;
		background: rgb(244 241 236 / 0.55);
	}

	.dot {
		flex: none;
		width: 0.6em;
		height: 0.6em;
		border-radius: 50%;
		background: rgb(226 87 76 / 0.4);
	}

	.dot--on {
		background: #ffb38a;
	}

	.pill {
		margin-top: auto;
		height: 1.9em;
		border-radius: 0.5em;
		background: #ffb38a;
	}

	.wave {
		display: flex;
		align-items: center;
		gap: 0.32em;
	}

	.wave--big {
		flex: 1;
		justify-content: center;
		gap: 0.3em;
	}

	.wbar {
		width: 0.22em;
		border-radius: 0.11em;
		background: rgb(226 87 76 / 0.8);
	}

	.wave--big .wbar {
		width: 0.38em;
		border-radius: 0.19em;
	}

	.wbar--hi {
		background: #ffb38a;
	}

	.day {
		width: 1.3em;
		height: 1.3em;
		border-radius: 0.3em;
		background: rgb(244 241 236 / 0.14);
	}

	.day--on {
		background: #ffb38a;
	}

	.corners {
		fill: none;
		stroke: #f4f1ec;
		stroke-width: 2;
		stroke-linecap: round;
		opacity: 0.7;
	}

	.lens {
		fill: none;
		stroke: #e2574c;
		stroke-width: 1.4;
	}

	/* ---------- Hover / keyboard focus on the host card ---------- */
	:global([data-art-host]:is(:hover, :has(:focus-visible))) .layer {
		transform: translateZ(var(--lift));
		filter: none;
	}

	:global([data-art-host]:is(:hover, :has(:focus-visible))) .panel {
		box-shadow: 0 1.8em 2.4em -0.6em rgb(0 0 0 / 0.65);
	}

	:global([data-art-host]:is(:hover, :has(:focus-visible))) .panel::before {
		opacity: 1;
	}

	:global([data-art-host]:is(:hover, :has(:focus-visible))) .haze {
		filter: none;
		opacity: 1;
	}
</style>
