<script lang="ts">
	import type { Testimonial } from '#lib/content/types.ts';
	import { kinetic, reveal } from '#lib/motion/attachments.ts';

	/** A single testimonial quote with attribution. */
	let {
		testimonial,
		size = 'lg',
		tone = 'light'
	}: { testimonial: Testimonial; size?: 'md' | 'lg'; tone?: 'light' | 'ink' } = $props();
</script>

<figure class="quote quote--{size} quote--{tone}" {@attach reveal({ children: '[data-reveal]' })}>
	<span class="mark" aria-hidden="true" data-reveal>“</span>
	<blockquote data-reveal>
		<p {@attach size === 'lg' && kinetic('statement')}>{testimonial.quote}</p>
	</blockquote>
	<figcaption data-reveal>
		{#if testimonial.photo}
			<enhanced:img
				src={testimonial.photo}
				alt={testimonial.name}
				class="avatar"
				sizes="56px"
				loading="lazy"
			/>
		{/if}
		<span class="who">
			<span class="name">{testimonial.name}</span>
			<span class="org">
				{testimonial.role ? `${testimonial.role}, ${testimonial.company}` : testimonial.company}
			</span>
		</span>
	</figcaption>
</figure>

<style>
	.quote {
		position: relative;
		display: grid;
		gap: var(--space-6);
	}

	.mark {
		display: block;
		height: 0.5em;
		font-family: var(--font-display);
		font-size: 5rem;
		line-height: 1;
		color: var(--color-accent);
	}

	blockquote p {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 450;
		line-height: 1.3;
		letter-spacing: var(--tracking-snug);
		text-wrap: pretty;
	}

	.quote--lg blockquote p {
		font-size: var(--text-2xl);
		line-height: 1.22;
	}

	figcaption {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.avatar {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		object-fit: cover;
	}

	.who {
		display: grid;
	}

	.name {
		font-weight: 600;
	}

	.org {
		font-size: var(--text-sm);
		color: var(--color-ink-muted);
	}

	.quote--ink .org {
		color: var(--color-on-ink-muted);
	}

	.quote--ink .mark {
		color: var(--color-lime);
	}
</style>
