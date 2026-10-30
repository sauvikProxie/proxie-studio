<script lang="ts">
	import { footerNav, footerOfficesHeading, legalNav } from '#lib/content/navigation.ts';
	import { copyright, offices, site, socials } from '#lib/content/site.ts';
	import { reveal } from '#lib/motion/attachments.ts';
	import Logo from '../ui/Logo.svelte';

	// Pages are prerendered, so set the year on the client too (always current).
	let year = $state(new Date().getFullYear());
	$effect(() => {
		year = new Date().getFullYear();
	});
</script>

<footer class="footer on-ink" data-surface="ink">
	<div class="dither" aria-hidden="true"></div>
	<div class="glow" aria-hidden="true"></div>

	<div class="container">
		<div class="top" {@attach reveal({ children: '[data-reveal]' })}>
			<div class="brand-col" data-reveal>
				<a href="/" class="brand" aria-label={site.name}>
					<Logo class="footer-logo" />
				</a>
				<a href="mailto:{site.email}" class="email">{site.email}</a>
				<ul class="socials" role="list">
					{#each socials as social (social.label)}
						<li><a href={social.href} class="social">{social.label}</a></li>
					{/each}
				</ul>
			</div>

			<nav class="columns" aria-label="Footer" data-reveal>
				{#each footerNav as column (column.heading)}
					<div class="column">
						<h2 class="column-heading">{column.heading}</h2>
						<ul role="list">
							{#each column.links as link (link.href)}
								<li><a href={link.href} class="footer-link">{link.label}</a></li>
							{/each}
						</ul>
					</div>
				{/each}

				<div class="column column--offices">
					<h2 class="column-heading">{footerOfficesHeading}</h2>
					<ul role="list" class="offices">
						{#each offices as office (office.country)}
							<li>
								<span class="office-country">{office.country}</span>
								<address>{office.address}</address>
							</li>
						{/each}
					</ul>
				</div>
			</nav>
		</div>

		<div class="bottom">
			<ul class="legal" role="list">
				{#each legalNav as link (link.href)}
					<li><a href={link.href} class="footer-link">{link.label}</a></li>
				{/each}
			</ul>
			<p class="copyright">{copyright(year)}</p>
		</div>
	</div>

	<div class="wordmark" aria-hidden="true">
		<Logo class="wordmark-logo" />
	</div>
</footer>

<style>
	.footer {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		margin-top: calc(var(--section-gap) / 2);
		padding-top: clamp(3.5rem, 2.5rem + 4vw, 6rem);
		border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
		background: var(--color-ink);
		color: var(--color-on-ink);
	}

	.dither {
		z-index: -1;
		--dither-color: rgb(226 87 76 / 0.6);
		--dither-mask: radial-gradient(60% 70% at 85% 100%, black, transparent 75%);
	}

	.glow {
		position: absolute;
		z-index: -1;
		width: 50rem;
		height: 30rem;
		right: -10rem;
		bottom: -18rem;
		border-radius: 50%;
		background: var(--glow-green);
		filter: blur(30px);
		opacity: 0.6;
		pointer-events: none;
	}

	.top {
		display: grid;
		gap: var(--space-12);
	}

	.brand-col {
		display: grid;
		justify-items: start;
		align-content: start;
		gap: var(--space-6);
	}

	.brand {
		display: inline-flex;
		color: var(--color-on-ink);
	}

	.brand :global(.footer-logo) {
		height: 1.75rem;
	}

	.email {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 520;
		letter-spacing: var(--tracking-snug);
		color: var(--color-lime);
		overflow-wrap: break-word;
		transition: color var(--dur-fast) var(--ease-out);
	}

	.email:hover {
		color: #fff;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.social {
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		box-shadow: inset 0 0 0 1px var(--color-line-on-ink);
		font-size: var(--text-sm);
		font-weight: 560;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.social:hover {
		background: var(--color-lime);
		color: var(--color-ink);
	}

	.columns {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-10) var(--space-6);
	}

	.column-heading {
		font-family: var(--font-text);
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--color-on-ink-muted);
		margin-bottom: var(--space-4);
	}

	.column ul {
		display: grid;
		gap: var(--space-2);
	}

	.footer-link {
		position: relative;
		color: var(--color-on-ink);
		font-size: var(--text-sm);
	}

	.footer-link::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -2px;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform var(--dur-base) var(--ease-out);
	}

	.footer-link:hover {
		color: var(--color-lime);
	}

	.footer-link:hover::after,
	.footer-link:focus-visible::after {
		transform: scaleX(1);
	}

	.column--offices {
		grid-column: 1 / -1;
	}

	.offices {
		gap: var(--space-4) !important;
	}

	.office-country {
		display: block;
		font-size: var(--text-sm);
		font-weight: 600;
	}

	address {
		font-style: normal;
		font-size: var(--text-sm);
		color: var(--color-on-ink-muted);
		max-width: 26ch;
	}

	.bottom {
		display: grid;
		gap: var(--space-4);
		margin-top: var(--space-16);
		padding-block: var(--space-6);
		border-top: 1px solid var(--color-line-on-ink);
	}

	.legal {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
	}

	.legal .footer-link,
	.copyright {
		color: var(--color-on-ink-muted);
		font-size: var(--text-xs);
	}

	.wordmark {
		padding-inline: var(--gutter);
		margin-bottom: calc(var(--space-4) * -1);
		pointer-events: none;
		color: rgb(244 241 236 / 0.06);
	}

	.wordmark :global(.wordmark-logo) {
		width: 100%;
		height: auto;
	}

	@media (min-width: 48rem) {
		.columns {
			grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 1.4fr);
		}

		.column--offices {
			grid-column: auto;
		}
	}

	@media (min-width: 64rem) {
		.top {
			grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr);
		}

		.bottom {
			grid-template-columns: 1fr auto;
			align-items: center;
		}
	}
</style>
