/**
 * PAGE: Home (SiteContent.txt, Section 4).
 */
import { industries } from './industries';
import { pillars } from './services';
import type { Heading, Hero, Item, Link, Seo } from './types';

export const home: {
	seo: Seo;
	hero: Hero & { eyebrow: string; secondary: Link };
	whoWeAre: { heading: Heading; body: string; items: readonly Item[] };
	whatWeDo: { heading: Heading; body: string; items: readonly Item[] };
	founders: { heading: Heading; body: string; link: Link };
	ideaToImpact: { heading: Heading; body: string };
	industries: { heading: Heading; body: string; items: readonly Item[] };
	products: { heading: Heading; body: string; items: readonly Item[] };
	testimonials: { heading: Heading };
} = {
	seo: {
		title: 'Proxie Studio – Data, AI & Software That Delivers',
		description:
			'Proxie Studio is a technology partner for custom software, AI and digital solutions. Tailored, fast and built to last – from idea to impact.'
	},
	hero: {
		headline: ['Your ideas + our team:', 'making it reality'],
		sub: 'We are a private research lab building innovative products and software for the world.',
		cta: { label: 'Contact Us', href: '/contact' },
		// The two office cities (Section 1, LOCATIONS)
		eyebrow: 'Umeå, Sweden · Ludhiana, India',
		// Services menu footer link (Section 2)
		secondary: { label: 'All services', href: '/services' }
	},
	whoWeAre: {
		heading: 'Who are we?',
		body: 'Proxie is a technology partner that helps organisations thrive in a digital-first world. From software and app development to AI and the web, we build tailored solutions that drive real transformation.',
		items: [
			{
				title: 'Customised digital solutions',
				text: 'software and AI shaped around each organisation’s unique needs.'
			},
			{
				title: 'Higher standards',
				text: 'we hold ourselves to high standards of quality, performance and reliability in everything we build.'
			}
		]
	},
	whatWeDo: {
		heading: ['One partner,', 'four areas of expertise'],
		body: 'From strategy to long-term support, we cover the full journey.',
		items: pillars.map((p) => ({ title: p.name, text: p.homeSummary, href: p.href }))
	},
	founders: {
		heading: 'Meet the founders',
		body: 'Proxie is led by people who have spent their careers building and teaching technology, and who still enjoy rolling up their sleeves.',
		link: { label: 'More about us', href: '/about' }
	},
	ideaToImpact: {
		heading: ['From concept to impact:', 'fast and focused'],
		body: 'Proxie Studio turns your ideas into market-ready solutions with speed and precision.'
	},
	industries: {
		heading: 'Industries we know',
		body: 'We bring sector knowledge to every project.',
		items: industries.map((i) => ({ title: i.name, text: i.summary, href: i.href }))
	},
	products: {
		heading: ['We build our own', 'products, too'],
		body: 'As a research lab, we design, build and run our own AI-powered apps.',
		items: [
			{
				title: 'Blind Companion',
				text: 'an AI-powered visual assistant that helps people understand their surroundings.',
				href: '/about/products'
			},
			{
				title: 'Session Pilot',
				text: 'turns spoken meetings into transcripts and AI-generated notes, linked to your calendar.',
				href: '/about/products'
			}
		]
	},
	testimonials: {
		heading: 'What our clients say'
	}
};
