/**
 * Site-wide facts (SiteContent.txt, Section 1 + Section 2 footer).
 */
import type { Link, Office } from './types';

export const site = {
	name: 'Proxie Studio',
	legalName: 'Proxie Studio Pvt. Ltd.',
	url: 'https://proxiestudio.com',
	email: 'enquiries@weareproxie.com',
	/** Used in meta tags; never shown as a headline. */
	positioning:
		'A technology partner that turns ideas into working products, with data, AI and software built around your business.'
} as const;

export const offices: readonly Office[] = [
	{
		country: 'Sweden',
		city: 'Umeå, Sweden',
		address: 'Tvistevägen 48, 907 36 Umeå, Sweden',
		short: 'Tvistevägen 48, 907 36 Umeå'
	},
	{
		country: 'India',
		city: 'Ludhiana, India',
		address: 'H.M-107 Jamalpur Colony, Ludhiana 141010, Punjab, India',
		short: 'H.M-107 Jamalpur Colony, Ludhiana 141010, Punjab'
	}
];

/** Social profile URLs will be added later; each links to "#" for now. */
export const socials: readonly Link[] = [
	{ label: 'LinkedIn', href: '#' },
	{ label: 'Instagram', href: '#' },
	{ label: 'Facebook', href: '#' }
];

export const copyright = (year: number) => `© ${year} Proxie Studio. All rights reserved.`;
