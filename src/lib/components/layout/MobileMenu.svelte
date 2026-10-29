<script lang="ts">
	import { page } from '$app/state';
	import { headerCta, headerNav } from '#lib/content/navigation.ts';
	import { site, socials } from '#lib/content/site.ts';
	import { getLenis } from '#lib/motion/smooth-scroll.ts';
	import Button from '../ui/Button.svelte';
	import Icon from '../ui/Icon.svelte';
	import { ui } from './ui-state.svelte';

	/**
	 * Full-screen mobile menu. Same structure and contents as the header nav.
	 * While open, the rest of the page is made inert by the layout, scrolling
	 * is locked, and Escape closes it and returns focus to the toggle.
	 */
	let expanded = $state<string | null>(null);
	let root: HTMLElement | undefined = $state();

	const isCurrent = (href: string) => page.url.pathname === href;

	$effect(() => {
		const open = ui.mobileOpen;
		const lenis = getLenis();
		if (open) {
			lenis?.stop();
			document.documentElement.style.overflow = 'hidden';
			// Move focus into the menu once it is visible
			requestAnimationFrame(() => root?.querySelector<HTMLElement>('a, button')?.focus());
		} else {
			lenis?.start();
			document.documentElement.style.overflow = '';
			expanded = null;
		}
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && ui.mobileOpen) {
			ui.mobileOpen = false;
			document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]')?.focus();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div
	id="mobile-menu"
	class="mobile-menu"
	class:is-open={ui.mobileOpen}
	inert={!ui.mobileOpen}
	bind:this={root}
>
	<div class="inner container">
		<nav aria-label="Mobile">
			<ul class="list" role="list">
				{#each headerNav as item, i (item.label)}
					<li class="item" style="--i: {i}">
						{#if item.kind === 'link'}
							<a
								href={item.href}
								class="top-link"
								aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
							>
						{:else}
							<button
								type="button"
								class="top-link"
								aria-expanded={expanded === item.label}
								aria-controls="mobile-{item.label.toLowerCase()}"
								onclick={() => (expanded = expanded === item.label ? null : item.label)}
							>
								{item.label}
								<Icon name="chevron" size={22} class="chev" />
							</button>
							<div
								id="mobile-{item.label.toLowerCase()}"
								class="sub"
								class:is-open={expanded === item.label}
							>
								<div class="sub-inner">
									{#if item.kind === 'mega'}
										<ul class="groups" role="list">
											{#each item.groups as group (group.title.href)}
												<li>
													<a href={group.title.href} class="group-title">{group.title.label}</a>
													<ul class="sub-links" role="list">
														{#each group.links as link (link.href)}
															<li>
																<a
																	href={link.href}
																	aria-current={isCurrent(link.href) ? 'page' : undefined}
																	>{link.label}</a
																>
															</li>
														{/each}
													</ul>
												</li>
											{/each}
											<li>
												<a href={item.footer.href} class="group-title">
													{item.footer.label}
													<Icon name="arrow" size={18} />
												</a>
											</li>
										</ul>
									{:else}
										<ul class="sub-links sub-links--flat" role="list">
											{#if item.title}
												<li>
													<a href={item.title.href} class="group-title">{item.title.label}</a>
												</li>
											{/if}
											{#each item.links as link (link.href)}
												<li>
													<a
														href={link.href}
														aria-current={isCurrent(link.href) ? 'page' : undefined}
														>{link.label}</a
													>
												</li>
											{/each}
										</ul>
									{/if}
								</div>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>

		<div class="foot" style="--i: {headerNav.length}">
			<Button href={headerCta.href} label={headerCta.label} size="lg" />
			<a class="email" href="mailto:{site.email}">{site.email}</a>
			<ul class="socials" role="list">
				{#each socials as social (social.label)}
					<li><a href={social.href}>{social.label}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.mobile-menu {
		position: fixed;
		inset: 0;
		z-index: calc(var(--z-header) - 1);
		background: var(--color-paper);
		padding-top: var(--header-h);
		overflow-y: auto;
		overscroll-behavior: contain;
		visibility: hidden;
		opacity: 0;
		transform: translateY(-2%);
		transition:
			opacity var(--dur-base) var(--ease-out),
			transform var(--dur-slow) var(--ease-out),
			visibility 0s linear var(--dur-base);
	}

	.mobile-menu.is-open {
		visibility: visible;
		opacity: 1;
		transform: none;
		transition-delay: 0s;
	}

	.inner {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-10);
		min-height: calc(100dvh - var(--header-h));
		padding-block: var(--space-6) var(--space-10);
	}

	.list {
		display: grid;
	}

	.item,
	.foot {
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity var(--dur-base) var(--ease-out),
			transform var(--dur-slow) var(--ease-out);
	}

	.is-open .item,
	.is-open .foot {
		opacity: 1;
		transform: none;
		transition-delay: calc(80ms + var(--i) * 50ms);
	}

	.item {
		border-bottom: 1px solid var(--color-line);
	}

	.top-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-block: var(--space-4);
		font-family: var(--font-display);
		font-size: clamp(1.75rem, 1.3rem + 2.4vw, 2.5rem);
		font-weight: 540;
		letter-spacing: var(--tracking-tight);
		text-align: left;
	}

	.top-link[aria-current='page'] {
		color: var(--color-accent);
	}

	.top-link :global(.chev) {
		transition: transform var(--dur-base) var(--ease-out);
	}

	.top-link[aria-expanded='true'] :global(.chev) {
		transform: rotate(180deg);
	}

	/* Accordion: the panel appears instantly and its content fades up
	   (transform + opacity only; durations are 0 with reduced motion) */
	.sub {
		display: none;
	}

	.sub.is-open {
		display: block;
	}

	.sub.is-open .sub-inner {
		animation: sub-in var(--dur-slow) var(--ease-out) both;
	}

	@keyframes sub-in {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
	}

	.groups {
		display: grid;
		gap: var(--space-5);
		padding-bottom: var(--space-6);
	}

	.group-title {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-weight: 600;
		font-size: var(--text-md);
		padding-block: var(--space-1);
		color: var(--color-ink);
	}

	.sub-links {
		display: grid;
		gap: 0.125rem;
		margin-top: var(--space-1);
	}

	.sub-links--flat {
		padding-bottom: var(--space-6);
	}

	.sub-links a:not(.group-title) {
		display: block;
		padding-block: 0.375rem;
		color: var(--color-ink-muted);
	}

	.sub-links a[aria-current='page'] {
		color: var(--color-accent);
		font-weight: 560;
	}

	.foot {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
	}

	.email {
		font-weight: 560;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-5);
		color: var(--color-ink-muted);
		font-size: var(--text-sm);
	}

	@media (min-width: 64rem) {
		.mobile-menu {
			display: none;
		}
	}
</style>
