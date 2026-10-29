<script lang="ts">
	import { trustedBy } from '#lib/content/blocks.ts';
	import { reveal } from '#lib/motion/attachments.ts';

	/**
	 * [REUSE: Client logos] as an infinite, seamless marquee (CSS transform
	 * animation on a doubled track). Pauses on hover and keyboard focus;
	 * static and wrapped with reduced motion.
	 */
	let { compact = false }: { compact?: boolean } = $props();
</script>

<section class="trusted" class:compact aria-labelledby="trusted-heading" {@attach reveal()}>
	<div class="container">
		<h2 id="trusted-heading" class="label">{trustedBy.heading}</h2>
	</div>
	<div class="marquee">
		<div class="rail">
			{#each [0, 1] as copy (copy)}
				<ul class="set" role="list" aria-hidden={copy === 1 ? 'true' : undefined}>
					{#each trustedBy.logos as logo (logo.name)}
						<li style="--scale: {logo.scale ?? 1}">
							<enhanced:img
								src={logo.image}
								alt={copy === 0 ? logo.name : ''}
								sizes="(min-width: 48rem) 240px, 160px"
								loading="lazy"
								class="logo"
							/>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</div>
</section>

<style>
	.trusted {
		padding-block: var(--space-12);
	}

	.label {
		font-family: var(--font-text);
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--color-ink-subtle);
		margin-bottom: var(--space-8);
	}

	.marquee {
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
	}

	.rail {
		display: flex;
		width: max-content;
		animation: marquee var(--dur-marquee) linear infinite;
	}

	.marquee:hover .rail,
	.marquee:focus-within .rail {
		animation-play-state: paused;
	}

	.set {
		display: flex;
		align-items: center;
		gap: clamp(3rem, 2rem + 4vw, 6.5rem);
		padding-right: clamp(3rem, 2rem + 4vw, 6.5rem);
	}

	.set li {
		flex: none;
	}

	.logo {
		height: calc(clamp(1.5rem, 1.2rem + 0.9vw, 2.125rem) * var(--scale));
		width: auto;
		filter: brightness(0);
		opacity: 0.68;
		transition: opacity var(--dur-fast) var(--ease-out);
	}

	.logo:hover {
		opacity: 1;
	}

	@keyframes marquee {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee {
			mask-image: none;
		}

		.rail {
			animation: none;
			width: auto;
			justify-content: center;
		}

		.set {
			flex-wrap: wrap;
			justify-content: center;
			row-gap: var(--space-8);
			padding-inline: var(--gutter);
		}

		.set[aria-hidden='true'] {
			display: none;
		}
	}
</style>
