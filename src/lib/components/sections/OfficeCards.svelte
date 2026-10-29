<script lang="ts">
	import { officePhotos } from '#lib/content/media.ts';
	import { offices } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/attachments.ts';

	/**
	 * [REUSE: Offices block] as photo cards. `short` renders the Careers format
	 * ("Umeå, Sweden: Tvistevägen 48, 907 36 Umeå").
	 */
	let { short = false }: { short?: boolean } = $props();
</script>

<ul class="offices" role="list" {@attach reveal({ children: '[data-reveal]', stagger: 0.1 })}>
	{#each offices as office (office.country)}
		{@const photo = officePhotos[office.country]}
		<li class="office" data-reveal>
			<div class="photo">
				<enhanced:img
					src={photo.image}
					alt={photo.alt}
					sizes="(min-width: 48rem) 45vw, 96vw"
					loading="lazy"
					style="object-position: {photo.position ?? '50% 50%'}"
				/>
			</div>
			<div class="body">
				<h3 class="name">{short ? office.city : office.country}</h3>
				<address>{short ? office.short : office.address}</address>
			</div>
		</li>
	{/each}
</ul>

<style>
	.offices {
		display: grid;
		gap: var(--space-4);
	}

	.office {
		display: grid;
		padding: var(--space-2);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow: var(--ring);
	}

	.photo {
		position: relative;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-radius: calc(var(--radius-xl) - var(--space-2));
		background: var(--color-paper-sunken);
	}

	.photo :global(picture) {
		display: contents;
	}

	.photo :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.body {
		display: grid;
		gap: var(--space-2);
		padding: var(--space-5) var(--space-4) var(--space-4);
	}

	.name {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
	}

	address {
		font-style: normal;
		color: var(--color-ink-muted);
		max-width: 32ch;
	}

	@media (min-width: 48rem) {
		.offices {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
