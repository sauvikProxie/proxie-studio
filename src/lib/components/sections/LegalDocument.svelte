<script lang="ts">
	import type { LegalDoc } from '#lib/content/types.ts';
	import { heroIntro } from '#lib/motion/attachments.ts';
	import Heading from '../ui/Heading.svelte';

	/**
	 * Readable long-form layout for legal pages: a comfortable measure,
	 * numbered section headings and a sticky table of contents on wide screens.
	 */
	let { doc }: { doc: LegalDoc } = $props();

	const slug = (text: string) =>
		text
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[^\w\s-]/g, '')
			.trim()
			.replace(/\s+/g, '-');

	const toc = $derived(
		doc.parts.flatMap((part) => [
			...(part.heading ? [{ id: slug(part.heading), label: part.heading, part: true }] : []),
			...part.blocks
				.filter((b) => b.heading)
				.map((b) => ({
					id: (part.heading ? slug(part.heading) + '-' : '') + slug(b.heading!),
					label: b.heading!,
					part: false
				}))
		])
	);
</script>

<article class="legal">
	<header class="hero container" {@attach heroIntro()}>
		<Heading text={doc.title} level={1} size="2xl" hero />
		{#if doc.sub}<p class="sub" data-hero-fade style="--i: 1">{doc.sub}</p>{/if}
	</header>

	<div class="container layout">
		{#if toc.length > 2}
			<nav class="toc" aria-labelledby="toc-heading" data-lenis-prevent>
				<h2 id="toc-heading" class="sr-only">{doc.title}</h2>
				<ol role="list">
					{#each toc as entry (entry.id)}
						<li class:part={entry.part}><a href="#{entry.id}">{entry.label}</a></li>
					{/each}
				</ol>
			</nav>
		{/if}

		<div class="body">
			{#each doc.parts as part, p (p)}
				{@const prefix = part.heading ? slug(part.heading) + '-' : ''}
				{#if part.heading}
					<h2 class="part-heading" id={slug(part.heading)}>{part.heading}</h2>
					{#if part.intro}<p class="part-intro">{part.intro}</p>{/if}
				{/if}

				{#each part.blocks as block, b (b)}
					<section class="block" id={block.heading ? prefix + slug(block.heading) : undefined}>
						{#if block.heading}
							<svelte:element this={part.heading ? 'h3' : 'h2'} class="block-heading">
								{block.heading}
							</svelte:element>
						{/if}
						{#each block.paragraphs ?? [] as paragraph, i (i)}
							<p>{paragraph}</p>
						{/each}
						{#if block.items?.length}
							{#if block.itemsAsSubsections}
								{#each block.items as item, i (i)}
									{#if typeof item === 'string'}
										<p>{item}</p>
									{:else}
										<div class="sub-section">
											<svelte:element this={part.heading ? 'h4' : 'h3'} class="sub-heading"
												>{item.title}</svelte:element
											>
											<p>{item.text}</p>
										</div>
									{/if}
								{/each}
							{:else}
								<ul class="list">
									{#each block.items as item, i (i)}
										<li>
											{#if typeof item === 'string'}
												{item}
											{:else}
												<strong>{item.title}:</strong> {item.text}
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						{/if}
						{#if block.closing}<p>{block.closing}</p>{/if}
					</section>
				{/each}
			{/each}
		</div>
	</div>
</article>

<style>
	.hero {
		padding-top: calc(var(--header-h) + clamp(3rem, 2rem + 5vw, 7rem));
		padding-bottom: clamp(2.5rem, 2rem + 3vw, 4.5rem);
	}

	.sub {
		margin-top: var(--space-6);
		color: var(--color-ink-muted);
		max-width: 60ch;
	}

	.layout {
		display: grid;
		gap: var(--space-10);
		padding-top: var(--space-10);
		border-top: 1px solid var(--color-line);
	}

	.toc ol {
		display: grid;
		gap: var(--space-1);
		font-size: var(--text-sm);
	}

	.toc a {
		display: block;
		padding: 0.3125rem 0;
		color: var(--color-ink-muted);
		transition: color var(--dur-fast) var(--ease-out);
	}

	.toc a:hover {
		color: var(--color-accent);
	}

	.toc .part {
		margin-top: var(--space-4);
		font-weight: 600;
	}

	.toc .part a {
		color: var(--color-ink);
	}

	.body {
		max-width: 68ch;
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
	}

	.block + .block {
		margin-top: var(--space-10);
	}

	.block p + p,
	.block p + .list,
	.block .list + p,
	.sub-section + p {
		margin-top: var(--space-4);
	}

	.block-heading {
		font-size: var(--text-xl);
		margin-bottom: var(--space-4);
		scroll-margin-top: calc(var(--header-h) + var(--space-6));
	}

	.part-heading {
		margin-top: var(--space-20);
		padding-top: var(--space-10);
		border-top: 1px solid var(--color-line);
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
	}

	.part-intro {
		margin-top: var(--space-4);
		margin-bottom: var(--space-10);
		color: var(--color-ink-muted);
	}

	.sub-section {
		margin-top: var(--space-6);
	}

	.sub-heading {
		font-family: var(--font-text);
		font-size: var(--text-base);
		font-weight: 650;
		letter-spacing: 0;
		margin-bottom: var(--space-2);
	}

	.list {
		display: grid;
		gap: var(--space-3);
		padding-left: 1.25rem;
	}

	.list li::marker {
		color: var(--color-accent);
	}

	strong {
		font-weight: 600;
	}

	section[id] {
		scroll-margin-top: calc(var(--header-h) + var(--space-6));
	}

	h2[id] {
		scroll-margin-top: calc(var(--header-h) + var(--space-6));
	}

	@media (min-width: 64rem) {
		.layout {
			grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
			gap: var(--space-16);
		}

		.toc {
			position: sticky;
			top: calc(var(--header-h) + var(--space-8));
			align-self: start;
			max-height: calc(100vh - var(--header-h) - var(--space-16));
			overflow-y: auto;
		}

		.layout:not(:has(.toc)) .body {
			grid-column: 2;
		}
	}
</style>
