<script lang="ts">
	import { founders } from '#lib/content/blocks.ts';
	import { imageReveal, parallax } from '#lib/motion/attachments.ts';

	/** [REUSE: Founders]: photo, name and "Co-founder" only. */
	let { headingLevel = 3 }: { headingLevel?: 3 | 4 } = $props();
</script>

<ul class="founders" role="list">
	{#each founders as founder, i (founder.name)}
		<li class="founder">
			<figure {@attach imageReveal({ delay: i * 0.12 })}>
				<div class="frame">
					<div class="media" data-media>
						<div class="drift" {@attach parallax(5)}>
							<enhanced:img
								src={founder.photo}
								alt={founder.name}
								sizes="(min-width: 64rem) 28vw, (min-width: 40rem) 45vw, 88vw"
								loading="lazy"
								class="photo"
							/>
						</div>
					</div>
					<div class="curtain" data-curtain aria-hidden="true"></div>
				</div>
				<figcaption>
					<svelte:element this={`h${headingLevel}`} class="name">{founder.name}</svelte:element>
					<p class="role">{founder.role}</p>
				</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.founders {
		display: grid;
		gap: var(--space-6);
	}

	figure {
		display: grid;
		gap: var(--space-2);
		padding: var(--space-2);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring), var(--shadow-sm);
	}

	.frame {
		position: relative;
		aspect-ratio: 4 / 5;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - var(--space-2));
		background: var(--color-paper-sunken);
		isolation: isolate;
	}

	.media,
	.drift {
		position: absolute;
		inset: -6% 0;
	}

	/* Blend modes only see layers in the same stacking context, so the
	   transformed drift layer carries the frame colour itself */
	.drift {
		inset: 0;
		background:
			radial-gradient(70% 55% at 50% 100%, rgb(226 87 76 / 0.28), transparent 70%),
			linear-gradient(165deg, #f9f0eb, #efe0d8);
	}

	.drift :global(picture) {
		display: contents;
	}

	.photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 62%;
		/* The portraits sit on white; multiply blends that white into the frame colour */
		mix-blend-mode: multiply;
	}

	.curtain {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: var(--color-accent);
		transform: scaleY(0);
		transform-origin: 50% 0%;
	}

	figcaption {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2) var(--space-4);
		padding: var(--space-4) var(--space-3) var(--space-3);
	}

	.name {
		font-size: var(--text-xl);
		letter-spacing: var(--tracking-snug);
	}

	.role {
		padding: 0.25rem 0.75rem;
		border-radius: var(--radius-pill);
		background: var(--color-accent-soft);
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--color-accent-strong);
	}

	@media (min-width: 40rem) {
		.founders {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.founder:nth-child(2) {
			margin-top: var(--space-16);
		}
	}
</style>
