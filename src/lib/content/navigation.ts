/**
 * Navigation (SiteContent.txt, Section 2).
 * The header, mobile menu and footer all read from here.
 */
import { industries } from './industries';
import { pillars } from './services';
import type { Link } from './types';

export interface NavGroup {
	title: Link;
	links: readonly Link[];
}

export type NavItem =
	| { kind: 'mega'; label: string; href: string; groups: readonly NavGroup[]; footer: Link }
	| { kind: 'menu'; label: string; href: string; title?: Link; links: readonly Link[] }
	| { kind: 'link'; label: string; href: string };

export const headerNav: readonly NavItem[] = [
	{
		kind: 'mega',
		label: 'Services',
		href: '/services',
		groups: pillars.map((p) => ({
			title: { label: p.name, href: p.href },
			links: p.services.map((s) => ({ label: s.name, href: s.href }))
		})),
		footer: { label: 'All services', href: '/services' }
	},
	{
		kind: 'menu',
		label: 'Industries',
		href: '/industries',
		title: { label: 'Industries', href: '/industries' },
		links: industries.map((i) => ({ label: i.name, href: i.href }))
	},
	{
		kind: 'menu',
		label: 'About',
		href: '/about',
		links: [
			{ label: 'About Proxie Studio', href: '/about' },
			{ label: 'Our Products', href: '/about/products' },
			{ label: 'Sustainability', href: '/about/sustainability' }
		]
	},
	{ kind: 'link', label: 'Careers', href: '/careers' }
];

export const headerCta: Link = { label: 'Contact Us', href: '/contact' };

export const footerNav: readonly { heading: string; links: readonly Link[] }[] = [
	{
		heading: 'Services',
		links: pillars.map((p) => ({ label: p.name, href: p.href }))
	},
	{
		heading: 'Industries',
		links: industries.map((i) => ({ label: i.name, href: i.href }))
	},
	{
		heading: 'Company',
		links: [
			{ label: 'About', href: '/about' },
			{ label: 'Our Products', href: '/about/products' },
			{ label: 'Sustainability', href: '/about/sustainability' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Contact', href: '/contact' }
		]
	}
];

export const footerOfficesHeading = 'Offices';

export const legalNav: readonly Link[] = [
	{ label: 'Privacy Policy', href: '/privacy-policy' },
	{ label: 'Terms & Conditions', href: '/terms' },
	{ label: 'Blind Companion Privacy Policy', href: '/blind-companion-privacy-policy' },
	{ label: 'Session Pilot Privacy Policy', href: '/spprivacypolicy' }
];
