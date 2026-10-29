<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/layout/Seo.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Heading from '#lib/components/ui/Heading.svelte';
	import PMark from '#lib/components/ui/PMark.svelte';
	import { notFound } from '#lib/content/company.ts';
	import { drawPaths, heroIntro } from '#lib/motion/attachments.ts';
</script>

<Seo seo={notFound.seo} />

<section class="not-found" {@attach heroIntro()}>
	<div class="container grid">
		<div class="copy">
			<p class="status" data-hero-fade>{page.status}</p>
			<Heading text={notFound.headline} level={1} size="2xl" hero />
			<p class="sub" data-hero-fade style="--i: 1">{notFound.sub}</p>
			<div data-hero-fade style="--i: 2">
				<Button href={notFound.cta.href} label={notFound.cta.label} size="lg" />
			</div>
			<ul class="links" role="list" data-hero-fade style="--i: 3">
				{#each notFound.links as link (link.href)}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</div>
		<div class="art" aria-hidden="true">
			<PMark draw={drawPaths({ immediate: true, delay: 0.4 })} fill={false} />
		</div>
	</div>
</section>

<style>
	.not-found {
		padding-top: calc(var(--header-h) + clamp(3rem, 2rem + 6vw, 8rem));
		padding-bottom: var(--space-16);
	}

	.grid {
		display: grid;
		gap: var(--space-12);
		align-items: center;
	}

	.copy {
		display: grid;
		justify-items: start;
		gap: var(--space-6);
	}

	.status {
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--color-accent);
		font-size: var(--text-lg);
	}

	.sub {
		font-size: var(--text-lg);
		color: var(--color-ink-muted);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.links a {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
		font-size: var(--text-sm);
		font-weight: 560;
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.links a:hover {
		background: var(--color-accent-soft);
	}

	.art {
		width: min(60vw, 24rem);
		justify-self: end;
		--pmark-width: 1.5;
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		}
	}
</style>
