<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ctaBlock } from '#lib/content/blocks.ts';
	import type { Heading as HeadingText, Link } from '#lib/content/types.ts';
	import { drawPaths, reveal } from '#lib/motion/attachments.ts';
	import Button from '../ui/Button.svelte';
	import Heading from '../ui/Heading.svelte';
	import PMark from '../ui/PMark.svelte';

	/**
	 * The dark closing panel. Defaults to [REUSE: CTA – Let's build what's next];
	 * pages with their own closing prompt pass heading/body/button instead.
	 */
	let {
		heading = ctaBlock.heading,
		body = ctaBlock.body,
		button = ctaBlock.button,
		extra
	}: { heading?: HeadingText; body?: string; button?: Link; extra?: Snippet } = $props();
</script>

<section class="section cta-section">
	<div class="container">
		<div class="panel on-ink" data-surface="ink">
			<div class="dither" aria-hidden="true"></div>
			<div class="glow g1" aria-hidden="true"></div>
			<div class="glow glow--lime g2" aria-hidden="true"></div>
			<div class="mark" aria-hidden="true">
				<PMark draw={drawPaths({ duration: 2.4 })} fill={false} />
			</div>
			<div class="content" {@attach reveal({ children: '[data-reveal]' })}>
				<div>
					<Heading text={heading} level={2} size="2xl" kinetic="cta" />
				</div>
				{#if body}<p class="body" data-reveal>{body}</p>{/if}
				{#if extra}<div class="extra" data-reveal>{@render extra()}</div>{/if}
				<div data-reveal>
					<Button href={button.href} label={button.label} variant="lime" size="lg" />
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.panel {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-2xl);
		background: var(--color-ink);
		color: var(--color-on-ink);
		padding: clamp(2.5rem, 1.5rem + 5vw, 6.5rem) clamp(1.5rem, 1rem + 4vw, 6rem);
		isolation: isolate;
		box-shadow: var(--shadow-lg);
	}

	.dither {
		z-index: -1;
		--dither-color: rgb(226 87 76 / 0.8);
		--dither-mask: radial-gradient(60% 95% at 100% 100%, black 10%, transparent 75%);
	}

	.g1 {
		z-index: -2;
		width: 40rem;
		height: 30rem;
		right: -12rem;
		bottom: -16rem;
		opacity: 0.8;
	}

	.g2 {
		z-index: -2;
		width: 22rem;
		height: 18rem;
		left: -8rem;
		top: -10rem;
		opacity: 0.35;
	}

	.mark {
		position: absolute;
		z-index: -1;
		right: clamp(-6rem, -4rem - 4vw, -2rem);
		bottom: clamp(-7rem, -3rem - 6vw, -2rem);
		width: clamp(16rem, 10rem + 26vw, 34rem);
		--pmark-stroke: var(--color-lime);
		--pmark-width: 1.25;
		opacity: 0.55;
	}

	.content {
		display: grid;
		justify-items: start;
		gap: var(--space-6);
		max-width: 58rem;
	}

	.body {
		font-size: var(--text-lg);
		color: var(--color-on-ink-muted);
		max-width: 40ch;
	}

	.extra {
		color: var(--color-on-ink-muted);
	}
</style>
