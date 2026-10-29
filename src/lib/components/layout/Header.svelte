<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { headerCta, headerNav } from '#lib/content/navigation.ts';
	import { site } from '#lib/content/site.ts';
	import ArrowLink from '../ui/ArrowLink.svelte';
	import Button from '../ui/Button.svelte';
	import Icon from '../ui/Icon.svelte';
	import Logo from '../ui/Logo.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import { ui } from './ui-state.svelte';

	/* ---------- Desktop menus (disclosure pattern) ---------- */
	const HOVER_OPEN_DELAY = 90;
	const HOVER_CLOSE_DELAY = 260;

	let openIndex = $state<number | null>(null);
	let openedBy: 'hover' | 'click' | 'keyboard' | null = null;
	let openTimer: ReturnType<typeof setTimeout> | undefined;
	let closeTimer: ReturnType<typeof setTimeout> | undefined;
	let nav: HTMLElement | undefined = $state();
	const triggers: HTMLButtonElement[] = $state([]);
	const panels: HTMLElement[] = $state([]);

	function clearTimers() {
		clearTimeout(openTimer);
		clearTimeout(closeTimer);
	}

	function open(index: number, by: typeof openedBy) {
		clearTimers();
		openIndex = index;
		openedBy = by;
	}

	function close(returnFocus = false) {
		clearTimers();
		const index = openIndex;
		openIndex = null;
		openedBy = null;
		if (returnFocus && index !== null) triggers[index]?.focus();
	}

	function onPointerEnter(index: number, event: PointerEvent) {
		if (event.pointerType !== 'mouse') return;
		clearTimeout(closeTimer);
		// Hover intent: a short delay so menus don't flicker when the pointer passes over
		if (openIndex !== null) open(index, 'hover');
		else openTimer = setTimeout(() => open(index, 'hover'), HOVER_OPEN_DELAY);
	}

	function onPointerLeave(event: PointerEvent) {
		if (event.pointerType !== 'mouse' || openedBy === 'click' || openedBy === 'keyboard') return;
		clearTimeout(openTimer);
		closeTimer = setTimeout(() => close(), HOVER_CLOSE_DELAY);
	}

	function onTriggerClick(index: number) {
		if (openIndex === index && openedBy === 'hover') {
			openedBy = 'click'; // a click after hover-open pins the menu instead of closing it
			return;
		}
		if (openIndex === index) close();
		else open(index, 'click');
	}

	function focusables(index: number) {
		return Array.from(panels[index]?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);
	}

	function onTriggerKeydown(index: number, event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			open(index, 'keyboard');
			requestAnimationFrame(() => focusables(index)[0]?.focus());
		} else if (event.key === 'Escape' && openIndex === index) {
			event.preventDefault();
			close(true);
		}
	}

	function onPanelKeydown(index: number, event: KeyboardEvent) {
		const links = focusables(index);
		const current = links.indexOf(document.activeElement as HTMLAnchorElement);
		const go = (i: number) => {
			event.preventDefault();
			links[(i + links.length) % links.length]?.focus();
		};
		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				close(true);
				break;
			case 'ArrowDown':
				go(current + 1);
				break;
			case 'ArrowUp':
				go(current - 1);
				break;
			case 'Home':
				go(0);
				break;
			case 'End':
				go(links.length - 1);
				break;
		}
	}

	function onItemFocusOut(index: number, event: FocusEvent) {
		const item = (event.currentTarget as HTMLElement) ?? null;
		const next = event.relatedTarget as Node | null;
		if (openIndex === index && (!next || !item.contains(next))) close();
	}

	function onDocumentPointerDown(event: PointerEvent) {
		if (openIndex !== null && nav && !nav.contains(event.target as Node)) close();
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && openIndex !== null) close(true);
	}

	/* ---------- Hide on scroll down, show on scroll up ---------- */
	let hidden = $state(false);
	let scrolled = $state(false);
	let focusWithin = $state(false);

	$effect(() => {
		let lastY = window.scrollY;
		let ticking = false;
		const update = () => {
			ticking = false;
			const y = window.scrollY;
			scrolled = y > 8;
			const delta = y - lastY;
			if (Math.abs(delta) < 6) return;
			hidden = delta > 0 && y > 160 && openIndex === null && !ui.mobileOpen && !focusWithin;
			lastY = y;
		};
		const onScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	afterNavigate(() => {
		close();
		ui.mobileOpen = false;
		hidden = false;
	});

	/* ---------- Active states ---------- */
	const path = $derived(page.url.pathname);
	const isCurrent = (href: string) => path === href;
	const isSection = (href: string) => path === href || path.startsWith(href + '/');
</script>

<svelte:window onkeydown={onWindowKeydown} />
<svelte:document onpointerdown={onDocumentPointerDown} />

<header
	class="header"
	class:is-hidden={hidden}
	class:is-scrolled={scrolled || openIndex !== null}
	class:menu-open={ui.mobileOpen}
	onfocusin={() => {
		focusWithin = true;
		hidden = false;
	}}
	onfocusout={(event) => {
		const next = event.relatedTarget as Node | null;
		if (!next || !(event.currentTarget as HTMLElement).contains(next)) focusWithin = false;
	}}
>
	<div class="bar container">
		<a href="/" class="brand" aria-label={site.name} aria-current={isCurrent('/') ? 'page' : undefined}>
			<Logo />
		</a>

		<nav class="nav" aria-label="Main" bind:this={nav}>
			<ul class="nav-list" role="list">
				{#each headerNav as item, i (item.label)}
					{#if item.kind === 'link'}
						<li class="nav-item">
							<a
								href={item.href}
								class="nav-link"
								class:is-active={isSection(item.href)}
								aria-current={isCurrent(item.href) ? 'page' : undefined}>{item.label}</a
							>
						</li>
					{:else}
						<li
							class="nav-item"
							class:has-mega={item.kind === 'mega'}
							onpointerenter={(e) => onPointerEnter(i, e)}
							onpointerleave={onPointerLeave}
							onfocusout={(e) => onItemFocusOut(i, e)}
						>
							<button
								bind:this={triggers[i]}
								type="button"
								class="nav-link nav-trigger"
								class:is-active={isSection(item.href)}
								class:is-open={openIndex === i}
								aria-expanded={openIndex === i}
								aria-controls="menu-{item.label.toLowerCase()}"
								onclick={() => onTriggerClick(i)}
								onkeydown={(e) => onTriggerKeydown(i, e)}
							>
								{item.label}
								<Icon name="chevron" size={16} class="chevron" />
							</button>

							<!-- Arrow/Home/End/Escape keys are delegated from the links inside -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<div
								bind:this={panels[i]}
								id="menu-{item.label.toLowerCase()}"
								class="panel"
								class:panel--mega={item.kind === 'mega'}
								class:is-open={openIndex === i}
								onkeydown={(e) => onPanelKeydown(i, e)}
							>
								{#if item.kind === 'mega'}
									<div class="mega container">
										<div class="mega-card">
											<ul class="mega-grid" role="list">
												{#each item.groups as group (group.title.href)}
													<li class="mega-group">
														<a
															href={group.title.href}
															class="mega-title"
															aria-current={isCurrent(group.title.href) ? 'page' : undefined}
														>
															{group.title.label}
															<Icon name="arrow" size={16} class="mega-arrow" />
														</a>
														<ul class="mega-links" role="list">
															{#each group.links as link (link.href)}
																<li>
																	<a
																		href={link.href}
																		class="menu-link"
																		aria-current={isCurrent(link.href) ? 'page' : undefined}
																		>{link.label}</a
																	>
																</li>
															{/each}
														</ul>
													</li>
												{/each}
											</ul>
											<div class="mega-footer">
												<ArrowLink link={item.footer} tone="accent" />
											</div>
										</div>
									</div>
								{:else}
									<div class="dropdown">
										{#if item.title}
											<a
												href={item.title.href}
												class="dropdown-title"
												aria-current={isCurrent(item.title.href) ? 'page' : undefined}
											>
												{item.title.label}
												<Icon name="arrow" size={16} class="mega-arrow" />
											</a>
										{/if}
										<ul class="dropdown-links" role="list">
											{#each item.links as link (link.href)}
												<li>
													<a
														href={link.href}
														class="menu-link"
														aria-current={isCurrent(link.href) ? 'page' : undefined}
														>{link.label}</a
													>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</li>
					{/if}
				{/each}
			</ul>
		</nav>

		<div class="actions">
			<Button href={headerCta.href} label={headerCta.label} class="header-cta" />
			<button
				type="button"
				class="menu-toggle"
				aria-expanded={ui.mobileOpen}
				aria-controls="mobile-menu"
				onclick={() => (ui.mobileOpen = !ui.mobileOpen)}
			>
				<span class="toggle-label">{ui.mobileOpen ? 'Close' : 'Menu'}</span>
				<span class="toggle-icon" aria-hidden="true">
					<span></span>
					<span></span>
				</span>
			</button>
		</div>
	</div>
</header>

<MobileMenu />

<style>
	.header {
		position: fixed;
		inset: 0 0 auto;
		z-index: var(--z-header);
		view-transition-name: site-header;
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.header::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgb(242 243 240 / 0.78);
		backdrop-filter: blur(16px) saturate(1.4);
		-webkit-backdrop-filter: blur(16px) saturate(1.4);
		border-bottom: 1px solid var(--color-line);
		opacity: 0;
		transition: opacity var(--dur-base) var(--ease-out);
		pointer-events: none;
	}

	.header.is-scrolled::before {
		opacity: 1;
	}

	.header.menu-open::before {
		opacity: 0;
	}

	.header.is-hidden {
		transform: translateY(-110%);
	}

	.bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		height: var(--header-h);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		color: var(--color-ink);
		padding-block: var(--space-2);
	}

	/* ---------- Desktop nav ---------- */
	.nav {
		display: none;
	}

	.nav-list {
		display: flex;
		align-items: center;
		gap: 0.125rem;
		padding: 0.3125rem;
		border-radius: var(--radius-pill);
		background: var(--color-surface);
		box-shadow:
			inset 0 0 0 1px var(--color-line),
			var(--shadow-sm);
	}

	.nav-item {
		position: relative;
	}

	.nav-item.has-mega {
		position: static;
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-pill);
		font-size: var(--text-sm);
		font-weight: 540;
		color: var(--color-ink);
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.nav-link:hover,
	.nav-link.is-open {
		background: var(--color-paper-sunken);
	}

	.nav-link.is-active {
		color: var(--color-accent);
	}

	.nav-trigger :global(.chevron) {
		margin-right: -0.25rem;
		transition: transform var(--dur-base) var(--ease-out);
	}

	.nav-trigger.is-open :global(.chevron) {
		transform: rotate(180deg);
	}

	/* ---------- Panels ---------- */
	.panel {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 50%;
		visibility: hidden;
		opacity: 0;
		transform: translate(-50%, -8px);
		transition:
			opacity var(--dur-fast) var(--ease-out),
			transform var(--dur-base) var(--ease-out),
			visibility 0s linear var(--dur-fast);
	}

	.panel.is-open {
		visibility: visible;
		opacity: 1;
		transform: translate(-50%, 0);
		transition-delay: 0s;
	}

	.panel--mega {
		top: calc(var(--header-h) - 0.25rem);
		left: 0;
		right: 0;
		transform: translateY(-8px);
	}

	.panel--mega.is-open {
		transform: none;
	}

	/* Invisible bridge so the pointer can cross the gap without closing the menu */
	.panel::before {
		content: '';
		position: absolute;
		inset: -0.75rem 0 auto;
		height: 0.75rem;
	}

	.mega-card,
	.dropdown {
		background: var(--color-surface);
		border-radius: var(--radius-lg);
		box-shadow:
			inset 0 0 0 1px var(--color-line),
			var(--shadow-lg);
	}

	.mega-card {
		padding: var(--space-8) var(--space-8) var(--space-6);
	}

	.mega-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-8);
	}

	.mega-title,
	.dropdown-title {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 580;
		letter-spacing: var(--tracking-snug);
		color: var(--color-ink);
		margin-bottom: var(--space-3);
	}

	.mega-title :global(.mega-arrow),
	.dropdown-title :global(.mega-arrow) {
		color: var(--color-accent);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.mega-title:hover :global(.mega-arrow),
	.dropdown-title:hover :global(.mega-arrow) {
		transform: translateX(4px);
	}

	.mega-links,
	.dropdown-links {
		display: grid;
		gap: 0.125rem;
	}

	.menu-link {
		display: block;
		padding: 0.4375rem 0.75rem;
		margin-inline: -0.75rem;
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: var(--color-ink-muted);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.menu-link:hover {
		background: var(--color-paper);
		color: var(--color-ink);
	}

	.menu-link[aria-current='page'] {
		color: var(--color-accent);
		font-weight: 560;
	}

	.mega-footer {
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--color-line);
	}

	.dropdown {
		min-width: 16rem;
		padding: var(--space-5) var(--space-6);
	}

	.dropdown-title {
		font-size: var(--text-md);
	}

	/* ---------- Actions ---------- */
	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.actions :global(.header-cta) {
		display: none;
	}

	.menu-toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		min-height: 2.75rem;
		padding: 0.25rem 0.375rem 0.25rem 1.125rem;
		border-radius: var(--radius-pill);
		background: var(--color-surface);
		box-shadow: inset 0 0 0 1px var(--color-line);
		font-size: var(--text-sm);
		font-weight: 560;
	}

	.toggle-icon {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.125rem;
		height: 2.125rem;
		border-radius: 50%;
		background: var(--color-ink);
	}

	.toggle-icon span {
		position: absolute;
		width: 0.875rem;
		height: 1.5px;
		background: var(--color-paper);
		transition: transform var(--dur-base) var(--ease-out);
	}

	.toggle-icon span:first-child {
		transform: translateY(-3px);
	}

	.toggle-icon span:last-child {
		transform: translateY(3px);
	}

	.menu-open .toggle-icon span:first-child {
		transform: rotate(45deg);
	}

	.menu-open .toggle-icon span:last-child {
		transform: rotate(-45deg);
	}

	@media (min-width: 40rem) {
		.actions :global(.header-cta) {
			display: inline-flex;
		}
	}

	@media (min-width: 64rem) {
		.bar {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
		}

		.brand {
			justify-self: start;
		}

		.actions {
			justify-self: end;
		}

		.nav {
			display: block;
		}

		.menu-toggle {
			display: none;
		}
	}

	@media (min-width: 64rem) and (max-width: 74rem) {
		.nav-link {
			padding-inline: 0.75rem;
		}

		.mega-card {
			padding: var(--space-6);
		}

		.mega-grid {
			gap: var(--space-6);
		}
	}
</style>
