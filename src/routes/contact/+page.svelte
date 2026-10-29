<script lang="ts">
	import Seo from '#lib/components/layout/Seo.svelte';
	import ContactForm from '#lib/components/sections/ContactForm.svelte';
	import PageHero from '#lib/components/sections/PageHero.svelte';
	import { contact } from '#lib/content/company.ts';
	import { offices, site, socials } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/attachments.ts';
</script>

<Seo seo={contact.seo} />

<PageHero hero={contact.hero} />

<section class="section">
	<div class="container grid">
		<div class="form-card" {@attach reveal()}>
			<h2 class="card-heading">{contact.form.heading}</h2>
			<ContactForm />
		</div>

		<aside class="other" aria-labelledby="other-heading" {@attach reveal({ children: '[data-reveal]' })}>
			<h2 id="other-heading" class="card-heading" data-reveal>{contact.other.heading}</h2>
			<dl class="details">
				<div data-reveal>
					<dt>{contact.other.emailLabel}</dt>
					<dd><a href="mailto:{site.email}" class="email">{site.email}</a></dd>
				</div>
				{#each offices as office (office.country)}
					<div data-reveal>
						<dt>{office.country}</dt>
						<dd><address>{office.address}</address></dd>
					</div>
				{/each}
				<div data-reveal>
					<dt>{contact.other.followLabel}</dt>
					<dd>
						<ul class="socials" role="list">
							{#each socials as social (social.label)}
								<li><a href={social.href}>{social.label}</a></li>
							{/each}
						</ul>
					</dd>
				</div>
			</dl>
		</aside>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: var(--space-8);
	}

	.form-card {
		padding: clamp(1.5rem, 1rem + 2.5vw, 3.5rem);
		border-radius: var(--radius-xl);
		background: var(--color-surface);
		box-shadow:
			inset 0 0 0 1px var(--color-line),
			var(--shadow-sm);
	}

	.card-heading {
		font-size: var(--text-2xl);
		letter-spacing: var(--tracking-tight);
		margin-bottom: var(--space-8);
	}

	.other {
		align-self: start;
	}

	.details {
		display: grid;
	}

	.details > div {
		display: grid;
		gap: var(--space-2);
		padding-block: var(--space-5);
		border-top: 1px solid var(--color-line);
	}

	dt {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--color-ink-subtle);
	}

	dd {
		margin: 0;
	}

	address {
		font-style: normal;
		font-size: var(--text-md);
		max-width: 30ch;
	}

	.email {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 540;
		color: var(--color-accent);
		overflow-wrap: anywhere;
	}

	.email:hover {
		color: var(--color-accent-strong);
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
		font-weight: 560;
	}

	.socials a:hover {
		color: var(--color-accent);
	}

	@media (min-width: 64rem) {
		.grid {
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
			gap: var(--space-16);
		}

		.other {
			position: sticky;
			top: calc(var(--header-h) + var(--space-8));
		}
	}
</style>
