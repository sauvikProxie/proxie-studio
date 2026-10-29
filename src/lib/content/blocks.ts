/**
 * Reusable content blocks (SiteContent.txt, Section 5).
 * Pages reference these instead of repeating copy.
 */
import { images } from './images';
import type { Founder, Heading, Link, Logo, Stat, Step, Testimonial, TestimonialId } from './types';

/* [REUSE: Testimonials] — names, companies and quotes are final. */
export const testimonials: Record<TestimonialId, Testimonial> = {
	rajesh: {
		id: 'rajesh',
		quote:
			'Working with Proxie Studio was a game-changer for us. Their cloud solutions significantly improved our efficiency while keeping data security a top priority.',
		name: 'Rajesh Mehra',
		role: 'IT Manager',
		company: 'Mercedes-Benz India'
	},
	erik: {
		id: 'erik',
		quote:
			'Proxie Studio combines strong AI expertise with real business insight, delivering practical, high-impact solutions.',
		name: 'Erik Jakobsson',
		company: 'Volvo Cars',
		photo: images.testimonials.erik
	},
	michelle: {
		id: 'michelle',
		quote:
			'They built a fast, reliable AI prototype that scaled smoothly into production with minimal friction.',
		name: 'Michelle Mccoy',
		company: 'Vans Singapore',
		photo: images.testimonials.michelle
	},
	kayla: {
		id: 'kayla',
		quote:
			'A collaborative and dependable team: clear, transparent and easy to work with throughout the project.',
		name: 'Kayla Ray',
		company: 'Daimler India',
		photo: images.testimonials.kayla
	}
};

/* [REUSE: Client logos] ("Trusted by") */
export const trustedBy = {
	heading: 'Trusted by',
	logos: [
		{ name: 'Vans', image: images.brands.vans, scale: 1.45 },
		{ name: 'McLaren', image: images.brands.mclaren, scale: 0.9 },
		{ name: 'Mercedes-Benz', image: images.brands.mercedes, scale: 0.92 },
		{ name: 'Daimler', image: images.brands.daimler, scale: 0.86 },
		{ name: 'Bufferleaf', image: images.brands.bufferleaf, scale: 0.84 }
	] satisfies Logo[]
};

/* [REUSE: Stat – 2 weeks to beta users] + the labels inside images/graph.svg */
export const twoWeeks = {
	value: 2,
	unit: 'weeks',
	caption:
		'launched and onboarded beta users with Proxie Studio, compared with building it alone.',
	chart: {
		proxie: 'With Proxie Studio',
		alone: 'You Build it Alone',
		marker: '2 Weeks',
		markerLabel: ['Launched &', 'Onboarded Beta Users'] as const,
		ariaLabel:
			'Launch-timeline chart comparing with Proxie Studio against You Build it Alone. The with Proxie Studio curve rises well above the You Build it Alone line, reaching the 2 Weeks marker: Launched & Onboarded Beta Users.'
	}
};

/* [REUSE: Stats – About facts] */
export const aboutStats: readonly Stat[] = [
	{ value: '2', label: 'offices', text: 'Umeå, Sweden and Ludhiana, India' },
	{
		value: '4',
		label: 'service areas',
		text: 'Data & Analytics, AI & Automation, Business Applications, Digital Experience'
	},
	{ value: 'End-to-end', label: 'delivery', text: 'from first workshop to long-term support' },
	{ value: '1', label: 'team', text: 'working side by side across borders' }
];

/* [REUSE: Process – How we work] */
export const processSteps: readonly Step[] = [
	{
		number: '01',
		title: 'Discover',
		text: 'We dig into your goals, users and existing systems to understand the real problem worth solving.'
	},
	{
		number: '02',
		title: 'Design',
		text: 'Together we shape the solution, test ideas early with prototypes and agree on a realistic plan.'
	},
	{
		number: '03',
		title: 'Build',
		text: 'Agile teams deliver in short cycles, so you see working results early and can steer as we go.'
	},
	{
		number: '04',
		title: 'Evolve',
		text: 'After launch we monitor, support and improve, so your solution grows with your business.'
	}
];

/* [REUSE: Values] (About › What we stand for) */
export const values = {
	heading: 'What we stand for',
	body: 'Four principles guide how we work with clients, partners and each other.',
	items: [
		{
			title: 'Built around you',
			text: 'We start with your goals, not a ready-made package. Every solution is shaped around your people, processes and ambitions.'
		},
		{
			title: 'Pragmatic innovation',
			text: 'We use AI and new technology where it creates real value, and keep things simple where it doesn’t.'
		},
		{
			title: 'Open and transparent',
			text: 'Clear communication, honest estimates and no surprises. You always know where your project stands.'
		},
		{
			title: 'Quality that lasts',
			text: 'Secure, well-tested and maintainable solutions that keep working long after launch day.'
		}
	]
};

/* [REUSE: CTA – Let's build what's next] */
export const ctaBlock: { heading: Heading; body: string; button: Link } = {
	heading: ['Let’s build what’s next,', 'together'],
	body: 'Tell us about your challenge and we’ll help you find the right way forward.',
	button: { label: 'Contact Us', href: '/contact' }
};

/* [REUSE: Founders] — name and role only. */
export const founders: readonly Founder[] = [
	{ name: 'Aman Malhotra', role: 'Co-founder', photo: images.founders.aman },
	{ name: 'Abhishek Malhotra', role: 'Co-founder', photo: images.founders.abhishek }
];

/* Shared link labels from Section 2 (PRIMARY CTAs) */
export const contactLink: Link = { label: 'Contact Us', href: '/contact' };
export const seeAllServices: Link = { label: 'See all services', href: '/services' };
