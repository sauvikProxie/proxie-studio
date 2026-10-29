/**
 * Company pages: About, Our Products, Sustainability, Careers, Contact, 404
 * (SiteContent.txt, Section 4, "=== COMPANY ===" and "PAGE: 404").
 */
import type { Closing, Heading, Hero, Item, Link, Seo } from './types';

/* PAGE: About */
export const about: {
	seo: Seo;
	hero: Hero;
	story: { heading: Heading; body: string };
	visionMission: { heading: Heading; visionLabel: string; vision: string; mission: readonly string[] };
	people: { heading: Heading; body: string };
	howWeWork: {
		id: string;
		heading: Heading;
		body: string;
		agile: { heading: string; body: string; items: readonly Item[] };
	};
	offices: { heading: Heading; body: string };
	more: { heading: Heading; links: readonly Link[] };
} = {
	seo: {
		title: 'About Us | Proxie Studio',
		description:
			'Proxie Studio is a technology partner for data, software and AI, with offices in Umeå, Sweden and Ludhiana, India.'
	},
	hero: {
		headline: ['Technology with', 'a human touch'],
		sub: 'Proxie Studio is a technology partner for organisations that want to do more with data, software and AI. We combine Scandinavian design thinking with deep engineering expertise to build solutions that are practical, reliable and made to last.',
		cta: { label: 'Contact Us', href: '/contact' }
	},
	story: {
		heading: 'Our story',
		body: 'Proxie Studio started with a simple idea: technology should make work easier, not more complicated. Too many organisations were held back by systems that didn’t talk to each other, data they couldn’t use and projects that took too long to deliver value. So we set out to build a different kind of technology partner, pairing strong expertise in data, AI and software engineering with a real understanding of how businesses operate. We listen first, build what fits and stay on to make sure it keeps delivering. Today our teams in Sweden and India work with clients across retail, energy, manufacturing and the public sector.'
	},
	visionMission: {
		heading: 'Our vision and mission',
		visionLabel: 'Vision',
		vision:
			'to lead with innovation, empower through technology and inspire trust through excellence. We envision a world where businesses achieve more with cutting-edge solutions and human-centric design.',
		mission: [
			'Deliver high-quality products and services that address real-world challenges.',
			'Build lasting relationships through trust, transparency and accountability.',
			'Empower individuals and organisations to grow and thrive in a fast-evolving digital landscape.'
		]
	},
	people: {
		heading: 'The people behind Proxie',
		body: 'Proxie is led by people who have spent their careers building and teaching technology, and who still enjoy rolling up their sleeves. They believe the best results come from small, experienced teams that take ownership and work closely with the people who will use what they build. That mindset runs through the company: curious, hands-on and honest about what will work for you.'
	},
	howWeWork: {
		id: 'how-we-work',
		heading: 'How we work',
		body: 'A clear, collaborative process that takes you from idea to impact, fast and focused.',
		agile: {
			heading: 'Agile delivery teams',
			body: 'Our agile team approach means better coordination, lower costs, higher quality and faster time to market. We start with a strategic roadmap that defines objectives and priorities, and we focus every delivery on your business goals.',
			items: [
				{ title: 'Strategic roadmap', text: 'clear objectives and priorities from day one.' },
				{ title: 'Scalable teams', text: 'the right expertise for your specific needs.' },
				{
					title: 'Flexible delivery',
					text: 'oversee the process yourself, or let us manage it for you.'
				}
			]
		}
	},
	offices: {
		heading: ['Two offices,', 'one team'],
		body: 'Our roots in Sweden and our team in India give clients the best of both: close collaboration and Scandinavian design thinking, backed by deep engineering capacity.'
	},
	more: {
		heading: 'More about Proxie',
		links: [
			{ label: 'Our Products', href: '/about/products' },
			{ label: 'Sustainability', href: '/about/sustainability' },
			{ label: 'Careers', href: '/careers' }
		]
	}
};

/* PAGE: Our Products */
export interface Product {
	id: string;
	name: string;
	body: string;
	items: readonly string[];
	privacy: Link;
}

export const products: { seo: Seo; hero: Hero; items: readonly Product[]; closing: Closing } = {
	seo: {
		title: 'Our Products: AI Apps by Proxie Studio',
		description:
			'Proxie Studio builds its own AI-powered apps: Blind Companion, a visual assistant, and Session Pilot, which turns meetings into AI-generated notes.'
	},
	hero: {
		headline: ['Products we', 'build ourselves'],
		sub: 'Alongside client work, our research lab designs, builds and runs its own AI-powered apps.',
		cta: { label: 'Have a product idea? Talk to us', href: '/contact' }
	},
	items: [
		{
			id: 'blind-companion',
			name: 'Blind Companion',
			body: 'An AI-powered visual assistant that helps users of all ages understand their surroundings. Point the camera, ask a question out loud, and hear the answer read back.',
			items: [
				'Available on iOS and Android',
				'Camera-based image analysis powered by AI (Google Gemini)',
				'Spoken questions via speech-to-text; answers read aloud with text-to-speech on the device',
				'Images and audio are never stored on Proxie Studio’s servers',
				'Account deletion directly in the app',
				'Monthly or annual subscription'
			],
			privacy: { label: 'Privacy policy', href: '/blind-companion-privacy-policy' }
		},
		{
			id: 'session-pilot',
			name: 'Session Pilot',
			body: 'A mobile app that records and transcribes your sessions and turns them into AI-generated notes, linked to your Google Calendar events.',
			items: [
				'Record and transcribe audio',
				'AI-generated, editable notes and summaries',
				'Notes linked to Google Calendar meetings',
				'Sign in with Google',
				'Notifications when transcripts and notes are ready',
				'Audio is not stored after transcription'
			],
			privacy: { label: 'Privacy policy', href: '/spprivacypolicy' }
		}
	],
	closing: {
		prompt: 'Want an app like this?',
		related: [
			'/services/digital-experience/mobile-apps',
			'/services/ai-automation/artificial-intelligence'
		],
		button: { label: 'Contact Us', href: '/contact' }
	}
};

/* PAGE: Sustainability */
export const sustainability: {
	seo: Seo;
	hero: Hero;
	priorities: { heading: Heading; body: string; items: readonly Item[] };
} = {
	seo: {
		title: 'Sustainability | Proxie Studio',
		description:
			'How sustainability shapes the way Proxie Studio works, who we work with and what we build, for our clients, our people and the planet.'
	},
	hero: {
		headline: ['Building a', 'sustainable future'],
		sub: 'Choosing Proxie Studio means working with people who drive positive change and contribute to a sustainable future.'
	},
	priorities: {
		heading: 'Our priorities',
		body: 'Sustainability shapes how we work, who we work with and what we build. These priorities guide our decisions for our clients, our people and the planet.',
		items: [
			{
				title: 'A better tomorrow',
				text: 'We build digital solutions that help clients use resources more wisely and create lasting value for society.'
			},
			{
				title: 'Towards carbon neutrality',
				text: 'We are reducing our own footprint through efficient cloud infrastructure, conscious travel and greener everyday choices.'
			},
			{
				title: 'Spreading digital knowledge',
				text: 'We share what we know through training, mentoring and open collaboration, helping more people take part in the digital shift.'
			},
			{
				title: 'Diversity and inclusion',
				text: 'Diverse teams build better products. We work for an inclusive workplace where everyone is welcome and able to grow.'
			},
			{
				title: 'Ethical business',
				text: 'We act with honesty and transparency, and handle data and AI responsibly in everything we deliver.'
			},
			{
				title: 'A sustainable supply chain',
				text: 'We choose partners and suppliers who share our values, and hold ourselves to the standards we ask of them.'
			}
		]
	}
};

/* PAGE: Careers */
export const careers: {
	seo: Seo;
	hero: Hero;
	positions: {
		id: string;
		heading: Heading;
		roles: readonly { title: string; apply: Link }[];
		empty: { text: string; link: Link };
	};
	why: { heading: Heading; items: readonly string[] };
	locations: { heading: Heading };
	closing: { prompt: string; emailLead: string; formLead: string; formLink: Link };
} = {
	seo: {
		title: 'Careers | Proxie Studio',
		description:
			'Join Proxie Studio in Umeå or Ludhiana. Work in small, experienced teams on data, AI and software projects. See open positions.'
	},
	hero: {
		headline: ['Build what’s next', 'with us'],
		sub: 'Join a curious, hands-on team in Sweden and India that builds data, AI and software solutions for real businesses.',
		cta: { label: 'See open positions', href: '#open-positions' }
	},
	positions: {
		id: 'open-positions',
		heading: 'Open positions',
		roles: [
			{
				title: 'Winter Internship',
				apply: {
					label: 'Apply',
					href: 'https://accurate-angelfish-6d4.notion.site/2adbf1b8296d80c2a90ce24c0a5ddc80',
					external: true
				}
			}
		],
		empty: {
			text: 'We don’t have any open positions right now, but we’re always happy to hear from talented people.',
			link: { label: 'Get in touch', href: '/contact' }
		}
	},
	why: {
		heading: 'Why work with us',
		items: [
			'Small, experienced teams that take ownership and work closely with the people who use what we build.',
			'Learning culture: we share what we know through training, mentoring and open collaboration.',
			'An inclusive workplace where everyone is welcome and able to grow.',
			'Two offices, one team: work side by side across Sweden and India.',
			'Varied work across data, AI, business applications and digital experience, plus our own products.'
		]
	},
	locations: { heading: 'Where we work' },
	closing: {
		prompt: 'Questions about working at Proxie?',
		emailLead: 'Email',
		formLead: 'or use the',
		formLink: { label: 'contact form', href: '/contact' }
	}
};

/* PAGE: Contact */
export const contact = {
	seo: {
		title: 'Contact Us | Proxie Studio',
		description:
			'Want to know more or have a question? Send us a message or email enquiries@weareproxie.com. Offices in Umeå, Sweden and Ludhiana, India.'
	} satisfies Seo,
	hero: {
		headline: 'Contact us',
		sub: 'Want to know more or have a question? Drop us a message.'
	} satisfies Hero,
	form: {
		heading: 'Send us a message',
		fields: {
			name: { label: 'Name', placeholder: 'Name' },
			email: { label: 'Email', placeholder: 'Email' },
			message: { label: 'Message', placeholder: 'Message' }
		},
		submit: 'Send message',
		messages: {
			success: 'Thanks for your message! We’ll get back to you soon.',
			error:
				'Something went wrong and your message wasn’t sent. Please try again, or email us at enquiries@weareproxie.com.',
			required: 'Please fill in this field.',
			email: 'Please enter a valid email address.'
		}
	},
	other: {
		heading: 'Other ways to reach us',
		emailLabel: 'Email',
		followLabel: 'Follow us'
	}
};

/* PAGE: 404 */
export const notFound = {
	seo: {
		title: 'Page Not Found | Proxie Studio',
		description: 'The page you are looking for doesn’t exist or has moved.'
	} satisfies Seo,
	headline: 'Page not found',
	sub: 'This page doesn’t exist or has moved.',
	cta: { label: 'Back to home', href: '/' } satisfies Link,
	links: [
		{ label: 'Services', href: '/services' },
		{ label: 'Industries', href: '/industries' },
		{ label: 'About', href: '/about' },
		{ label: 'Contact Us', href: '/contact' }
	] satisfies Link[]
};
