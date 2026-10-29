/**
 * Services: the Services overview, four pillar pages and their service pages
 * (SiteContent.txt, Section 4, "PAGE: Services" through "PILLAR 4").
 */
import type { ContentPage, Heading, Link, Pillar, Section, Service } from './types';

const contact: Link = { label: 'Contact Us', href: '/contact' };

/** "Our areas of expertise": each item links to its service page. */
const expertise = (services: readonly Service[], body?: string): Section => ({
	heading: 'Our areas of expertise',
	body,
	itemStyle: 'cards',
	items: services.map((s) => ({ title: s.name, text: s.summary, href: s.href }))
});

/* ------------------------------------------------------------------ */
/* PILLAR 1: DATA & ANALYTICS                                          */
/* ------------------------------------------------------------------ */

const dataStrategy: Service = {
	slug: 'data-strategy',
	name: 'Data Strategy',
	href: '/services/data-analytics/data-strategy',
	summary:
		'A data strategy tailored to your vision, with expert guidance on the right tools and platforms.',
	seo: {
		title: 'Data Strategy & Data-Driven Business | Proxie Studio',
		description:
			'A data strategy built around your vision, not a generic fix. Expert guidance on tools and platforms to become a truly data-driven business.'
	},
	hero: {
		headline: ['Data strategy &', 'data-driven business'],
		sub: 'Personalised strategies built around your business vision, with no generic fixes. We help you choose the right tools and adapt with confidence as things change.',
		cta: { label: 'Book a strategy conversation', href: '/contact' }
	},
	sections: [
		{
			heading: 'A strategy that fits your vision',
			body: 'Every strategy we write is aligned with your goals. Our technology guidance gives you expert advice on the tools and platforms that suit your business, and our approach helps you navigate change and turn challenges into opportunities.'
		},
		{
			heading: 'Becoming data-driven',
			itemStyle: 'inline',
			items: [
				{ title: 'Tailored data strategies', text: 'customised solutions aligned with your vision.' },
				{ title: 'Expert guidance', text: 'support for data-driven decision-making.' },
				{
					title: 'Operational optimisation',
					text: 'a competitive edge through efficiency and growth.'
				}
			]
		}
	],
	closing: {
		related: [
			'/services/data-analytics/data-platforms',
			'/services/data-analytics/business-intelligence'
		],
		button: contact
	}
};

const dataPlatforms: Service = {
	slug: 'data-platforms',
	name: 'Data Platforms',
	href: '/services/data-analytics/data-platforms',
	summary:
		'Cloud or on-premises platforms that collect, integrate and store your data automatically.',
	seo: {
		title: 'Data Platforms & Accessibility | Proxie Studio',
		description:
			'Tailored cloud or on-premises data platforms that collect, integrate and store data automatically, so you spend time deciding, not managing data.'
	},
	hero: {
		headline: ['Data platforms &', 'accessibility'],
		sub: 'Tailored data platforms that streamline how data is collected, integrated and stored, so you can focus on decisions instead of managing data by hand.',
		cta: { label: 'Discuss your data platform', href: '/contact' }
	},
	sections: [
		{
			heading: 'High-quality data, automatically',
			body: 'We collect, process and store your data with high-quality integration, and automate the flow so it is always available and accurate. Every platform is designed for your needs, whether cloud-based or on-premises.'
		},
		{
			heading: 'Data that is easy to reach and use',
			itemStyle: 'inline',
			items: [
				{ title: 'Seamless data integration', text: 'information from multiple sources in one place.' },
				{ title: 'Insight-driven approach', text: 'less time managing data, more time deciding.' },
				{ title: 'Modern technology', text: 'cloud platforms and data warehouses.' },
				{ title: 'Efficient data processes', text: 'streamlined, optimised workflows.' }
			]
		}
	],
	closing: {
		related: [
			'/services/data-analytics/business-intelligence',
			'/services/ai-automation/integration-platforms'
		],
		button: contact
	}
};

const businessIntelligence: Service = {
	slug: 'business-intelligence',
	name: 'Business Intelligence & Analytics',
	href: '/services/data-analytics/business-intelligence',
	summary:
		'Centralised, up-to-date data and clear visualisations that simplify decisions.',
	seo: {
		title: 'Business Intelligence & Analytics | Proxie Studio',
		description:
			'Advanced analysis and clear visualisations that turn raw data into actionable insight, with centralised, up-to-date data and tailored strategies.'
	},
	hero: {
		headline: ['Business Intelligence', '& Analytics'],
		sub: 'Unlock the full potential of your data with advanced analysis and intuitive visualisations that simplify decision-making.',
		cta: { label: 'Talk to us about BI', href: '/contact' }
	},
	sections: [
		{
			heading: 'From raw data to actionable insight',
			body: 'We specialise in advanced data analysis and turn complex information into clear, intuitive visualisations. We centralise your data and keep it up to date, and we uncover strategic growth opportunities that drive efficiency and innovation.',
			itemStyle: 'inline',
			items: [
				{
					title: 'Centralised data management',
					text: 'critical information organised and up to date.'
				},
				{ title: 'Tailored strategies', text: 'solutions designed for your unique challenges.' },
				{ title: 'Modern technology', text: 'up-to-date databases and advanced software.' },
				{ title: 'Smarter decision-making', text: 'data that is easy to interpret.' }
			]
		}
	],
	closing: {
		related: [
			'/services/data-analytics/data-platforms',
			'/services/data-analytics/corporate-performance-management'
		],
		button: contact
	}
};

const corporatePerformance: Service = {
	slug: 'corporate-performance-management',
	name: 'Corporate Performance Management',
	href: '/services/data-analytics/corporate-performance-management',
	summary:
		'Better data quality and collaboration for smoother planning, reporting and follow-up.',
	seo: {
		title: 'Corporate Performance Management | Proxie Studio',
		description:
			'Better data quality, cross-department collaboration and robust financial tools that replace error-prone spreadsheets and speed up reporting.'
	},
	hero: {
		headline: ['Enhanced performance,', 'streamlined operations'],
		sub: 'We help you optimise corporate performance through better data quality, cross-department collaboration and robust financial solutions.',
		cta: { label: 'Simplify your reporting', href: '/contact' }
	},
	sections: [
		{
			heading: 'Strategy that actually gets implemented',
			body: 'Successful strategy depends on good data and teams that work together. We help solve the common blockers, so operations run smoother and decisions get better.',
			itemStyle: 'list',
			items: [
				{ text: 'Delayed access to critical data' },
				{ text: 'Gaps in transparency' },
				{ text: 'Complex legal and financial reporting' }
			]
		},
		{
			heading: 'Simplify your workflow',
			body: 'We replace disorganised processes and error-prone spreadsheets with the right tools. Data quality and accuracy improve, operations become more efficient and secure, and your teams can focus on high-impact work that drives growth.'
		}
	],
	closing: {
		related: [
			'/services/data-analytics/business-intelligence',
			'/services/business-applications/erp'
		],
		button: contact
	}
};

const dataAnalytics: Pillar = {
	slug: 'data-analytics',
	name: 'Data & Analytics',
	href: '/services/data-analytics',
	homeSummary: 'Turn scattered data into clear insight and better decisions.',
	overviewBody: 'From insight to intelligence. Get your data in order and put it to work.',
	exploreLabel: 'Explore Data & Analytics',
	services: [dataStrategy, dataPlatforms, businessIntelligence, corporatePerformance],
	seo: {
		title: 'Data & Analytics Services | Proxie Studio',
		description:
			'Data strategy, data platforms, business intelligence and performance management that turn complex data into clear decisions.'
	},
	hero: {
		headline: 'Data & Analytics',
		sub: 'From insight to intelligence. We build data-driven systems that turn complexity into clarity, so every decision rests on facts.',
		cta: { label: 'Talk to a data expert', href: '/contact' }
	},
	sections: [
		expertise([dataStrategy, dataPlatforms, businessIntelligence, corporatePerformance]),
		{
			heading: 'Data you can act on',
			body: 'We connect, organise and optimise your data so teams get real-time insight, work more efficiently and make smarter decisions.',
			itemStyle: 'list',
			items: [
				{ text: 'Clear objectives and data-driven strategies' },
				{ text: 'One trusted, up-to-date view of the business' },
				{ text: 'Less manual data handling, more time for analysis' }
			]
		}
	],
	closing: {
		prompt: 'Ready to put your data to work?',
		button: contact,
		links: [
			{
				lead: 'Looking for AI?',
				link: { label: 'See AI & Automation', href: '/services/ai-automation' }
			}
		]
	}
};

/* ------------------------------------------------------------------ */
/* PILLAR 2: AI & AUTOMATION                                           */
/* ------------------------------------------------------------------ */

const artificialIntelligence: Service = {
	slug: 'artificial-intelligence',
	name: 'Artificial Intelligence',
	href: '/services/ai-automation/artificial-intelligence',
	summary:
		'Custom AI, from machine learning and predictive analytics to generative AI and NLP.',
	seo: {
		title: 'Artificial Intelligence Solutions | Proxie Studio',
		description:
			'Custom AI, including machine learning, deep learning, predictive analytics, generative AI and NLP, with end-to-end support from strategy to implementation.'
	},
	hero: {
		headline: 'Artificial Intelligence',
		sub: 'We use AI, including machine learning, deep learning and predictive analytics, to streamline processes, improve decisions and reduce costs.',
		cta: { label: 'Start your AI project', href: '/contact' }
	},
	sections: [
		{
			heading: 'AI that works for your business',
			body: 'We bring AI to every industry. We streamline business processes and enable smarter, real-time decisions that cut costs and raise productivity.',
			itemStyle: 'tags',
			items: [
				{ text: 'Generative AI' },
				{ text: 'Machine learning' },
				{ text: 'Deep learning' },
				{ text: 'Predictive analytics' },
				{ text: 'Natural language processing (NLP)' }
			]
		},
		{
			heading: 'Work easier with AI',
			itemStyle: 'inline',
			items: [
				{ title: 'Custom AI solutions', text: 'strategies designed around your needs and goals.' },
				{
					title: 'End-to-end support',
					text: 'from strategy to implementation and integration.'
				},
				{
					title: 'Automated decision-making',
					text: 'advanced analytics and automation that raise productivity and improve customer service.'
				}
			]
		}
	],
	closing: {
		related: [
			'/services/ai-automation/process-automation',
			'/services/ai-automation/iot'
		],
		button: contact
	}
};

const iot: Service = {
	slug: 'iot',
	name: 'IoT Solutions',
	href: '/services/ai-automation/iot',
	summary: 'Connected devices and real-time data, end to end from hardware to cloud.',
	seo: {
		title: 'IoT Solutions for Business Optimisation | Proxie Studio',
		description:
			'IoT, AI and machine learning that optimise processes and cut costs, with end-to-end delivery from hardware to cloud and proven large-scale IoT experience.'
	},
	hero: {
		headline: ['IoT solutions for', 'business optimisation'],
		sub: 'We combine IoT, AI and machine learning to optimise processes, reduce costs and drive growth, turning device data into insight.',
		cta: { label: 'Discuss your IoT project', href: '/contact' }
	},
	sections: [
		{
			heading: 'Connected operations',
			itemStyle: 'inline',
			items: [
				{ title: 'Streamlined operations', text: 'automated processes and higher efficiency.' },
				{ title: 'Lower costs', text: 'less waste and better use of resources.' },
				{ title: 'Growth opportunities', text: 'real-time data insights.' },
				{
					title: 'End-to-end service',
					text: 'complete solutions from hardware to cloud, integrated across your business.'
				}
			]
		},
		{
			heading: 'Harness the power of IoT',
			body: 'We turn IoT data into actionable insight and combine it with your other data sources for a unified view of your operations. With proven success in large-scale IoT projects, we connect production units to business systems so data flows efficiently.'
		}
	],
	closing: {
		related: [
			'/services/ai-automation/artificial-intelligence',
			'/services/data-analytics/data-platforms'
		],
		links: [{ lead: 'See also:', link: { label: 'Manufacturing', href: '/industries/manufacturing' } }],
		button: contact
	}
};

const processAutomation: Service = {
	slug: 'process-automation',
	name: 'Process Automation & RPA',
	href: '/services/ai-automation/process-automation',
	summary:
		'Automate repetitive tasks and formalise processes for a more efficient organisation.',
	seo: {
		title: 'Process Automation & RPA | Proxie Studio',
		description:
			'Automate repetitive tasks with RPA and AI. We optimise and formalise your processes and fit automation into your existing workflow.'
	},
	hero: {
		headline: ['Optimised processes,', 'smart automation'],
		sub: 'We automate repetitive tasks and optimise business processes with tailored solutions that fit into your existing workflow.',
		cta: { label: 'Find your automation opportunities', href: '/contact' }
	},
	sections: [
		{
			heading: 'Save time, free up resources',
			body: 'With robotic process automation (RPA) and process automation, we take repetitive work off your teams’ plates and build a more resource-efficient organisation. Every solution integrates with the way you already work.'
		},
		{
			heading: 'Simplify decision-making',
			itemStyle: 'inline',
			items: [
				{
					title: 'AI-driven insights',
					text: 'machine learning models that simplify and improve decisions.'
				},
				{
					title: 'Transparent operations',
					text: 'processes defined and formalised for clearer, smoother business functions.'
				},
				{
					title: 'Streamlined workflows',
					text: 'manual tasks removed from day-to-day operations.'
				}
			]
		}
	],
	closing: {
		related: [
			'/services/ai-automation/integration-platforms',
			'/services/business-applications/low-code'
		],
		button: contact
	}
};

const integrationPlatforms: Service = {
	slug: 'integration-platforms',
	name: 'Integration Platforms',
	href: '/services/ai-automation/integration-platforms',
	summary: 'Connect your applications and automate the data flows between them.',
	seo: {
		title: 'Integration Platforms | Proxie Studio',
		description:
			'Integration platforms that connect your applications, automate data flows and give your teams one consistent picture of the business.'
	},
	hero: {
		headline: ['Connect your systems,', 'automate your work'],
		sub: 'When systems don’t talk to each other, people end up copying data between them. We build integration platforms that connect your applications and give everyone one consistent picture of the business.',
		cta: { label: 'Talk integration', href: '/contact' }
	},
	sections: [
		{
			heading: 'Integrations designed around your goals',
			body: 'Cloud or hybrid, real-time or scheduled, we use APIs and event-driven patterns that are reliable, secure and easy to monitor.'
		},
		{
			heading: 'Then we automate the work in between',
			body: 'Once your systems are connected, we automate the work that runs across them, so fewer tasks depend on someone moving data by hand.',
			itemStyle: 'tags',
			items: [
				{ text: 'Approvals' },
				{ text: 'Notifications' },
				{ text: 'Order flows' },
				{ text: 'Reporting' }
			]
		}
	],
	closing: {
		related: [
			'/services/ai-automation/process-automation',
			'/services/business-applications/erp'
		],
		button: contact
	}
};

const aiAutomation: Pillar = {
	slug: 'ai-automation',
	name: 'AI & Automation',
	href: '/services/ai-automation',
	homeSummary: 'Put AI, IoT and automation to work on your processes.',
	overviewBody: 'AI, IoT and automation that take manual work out of your processes.',
	exploreLabel: 'Explore AI & Automation',
	services: [artificialIntelligence, iot, processAutomation, integrationPlatforms],
	seo: {
		title: 'AI & Automation Services | Proxie Studio',
		description:
			'Custom AI, IoT, process automation and integration platforms that cut manual work, reduce costs and speed up decisions, from strategy to implementation.'
	},
	hero: {
		headline: 'AI & Automation',
		sub: 'We build systems that think, learn and adapt, with AI, machine learning, IoT and automation that streamline processes and reduce costs.',
		cta: { label: 'Explore what AI can do for you', href: '/contact' }
	},
	sections: [
		expertise([artificialIntelligence, iot, processAutomation, integrationPlatforms]),
		{
			heading: 'From prototype to production',
			body: 'We support you end to end, from strategy to implementation. Clients highlight our fast, reliable AI prototypes that scale smoothly into production.',
			quote: 'michelle'
		}
	],
	closing: {
		prompt: 'Have a process worth automating?',
		button: contact
	}
};

/* ------------------------------------------------------------------ */
/* PILLAR 3: BUSINESS APPLICATIONS                                     */
/* ------------------------------------------------------------------ */

const crm: Service = {
	slug: 'crm',
	name: 'CRM: Sales, Marketing & Customer Service',
	href: '/services/business-applications/crm',
	summary:
		'One view of every customer, plus automation that boosts sales and customer satisfaction.',
	seo: {
		title: 'CRM for Sales, Marketing & Service | Proxie Studio',
		description:
			'CRM and marketing automation tailored to your teams: one customer record, automated lead nurturing and shared dashboards that tie campaigns to revenue.'
	},
	hero: {
		headline: ['One view of', 'every customer'],
		sub: 'We help sales, marketing and customer service teams see the full customer journey in one place, with CRM and marketing automation tailored to how you work.',
		cta: { label: 'Talk CRM', href: '/contact' }
	},
	sections: [
		{
			heading: ['Every lead, campaign and deal,', 'tracked and actionable'],
			body: 'We connect your CRM, marketing automation and analytics, so leads are captured, nurtured and handed to sales at the right moment. With clear pipelines and shared reporting, your teams spend their time on conversations and customer satisfaction, not spreadsheets.'
		},
		{
			heading: 'Typical outcomes',
			itemStyle: 'list',
			items: [
				{ text: 'A single customer record' },
				{ text: 'Automated lead nurturing' },
				{ text: 'Shared sales and marketing dashboards' },
				{ text: 'Campaigns measured against revenue' }
			]
		}
	],
	closing: {
		related: [
			'/services/business-applications/erp',
			'/services/ai-automation/integration-platforms'
		],
		button: contact
	}
};

const erp: Service = {
	slug: 'erp',
	name: 'ERP',
	href: '/services/business-applications/erp',
	summary: 'Finance, supply chain and operations in one reliable source of truth.',
	seo: {
		title: 'ERP Implementation & Support | Proxie Studio',
		description:
			'ERP implemented and adapted to your processes, bringing finance, supply chain and operations into one reliable source of truth, with training and support.'
	},
	hero: {
		headline: ['One system for', 'the way you operate'],
		sub: 'ERP is the backbone of your operations. We implement and adapt ERP solutions that bring your financials, supply chain and operations into one reliable source of truth.',
		cta: { label: 'Plan your ERP project', href: '/contact' }
	},
	sections: [
		{
			heading: 'Configured around your processes',
			body: 'We map your processes, configure the platform to match them and integrate it with the tools your teams already use, from accounting and reporting to collaboration and analytics. Data flows automatically instead of being re-entered by hand.'
		},
		{
			heading: 'Support that continues after launch',
			itemStyle: 'list',
			items: [
				{ text: 'Hands-on support after go-live' },
				{ text: 'User training' },
				{
					text: 'Regular reviews, so the system evolves with new products, markets and ways of working'
				}
			]
		}
	],
	closing: {
		related: [
			'/services/ai-automation/integration-platforms',
			'/services/data-analytics/corporate-performance-management'
		],
		links: [{ lead: 'See also:', link: { label: 'Retail', href: '/industries/retail' } }],
		button: contact
	}
};

const lowCode: Service = {
	slug: 'low-code',
	name: 'Low-Code Development',
	href: '/services/business-applications/low-code',
	summary: 'Cost-effective custom apps and workflows, shipped in weeks.',
	seo: {
		title: 'Low-Code Development | Proxie Studio',
		description:
			'Custom business apps and workflows on low-code platforms, with the speed of visual development and the discipline of a software team.'
	},
	hero: {
		headline: ['Ship business apps', 'in weeks'],
		sub: 'Low-code lets you respond to business needs as fast as they appear. We build custom applications and workflows on low-code platforms, combining the speed of visual development with the discipline of a software team.',
		cta: { label: 'Start building', href: '/contact' }
	},
	sections: [
		{
			heading: ['Build together,', 'see progress every few days'],
			body: 'Visual building blocks let business experts and developers shape an app together, reviewing working screens every few days instead of waiting for a big release.'
		},
		{
			heading: 'Low-code done properly',
			itemStyle: 'list',
			items: [
				{ text: 'Platform selection that fits your landscape' },
				{ text: 'Governance that keeps apps secure and maintainable' },
				{ text: 'Training, so your people can extend what we build' }
			]
		}
	],
	closing: {
		related: [
			'/services/ai-automation/process-automation',
			'/services/ai-automation/integration-platforms'
		],
		button: contact
	}
};

const digitalSigning: Service = {
	slug: 'digital-signing',
	name: 'Digital Signing & Authentication',
	href: '/services/business-applications/digital-signing',
	summary:
		'E-signatures and strong identity verification inside the tools you already use.',
	seo: {
		title: 'Digital Signing & Authentication | Proxie Studio',
		description:
			'E-signatures and strong authentication built into your existing tools. Agreements completed in minutes, with a clear audit trail for every step.'
	},
	hero: {
		headline: ['Sign and verify', 'with confidence'],
		sub: 'We bring e-signatures and strong identity verification into the tools your teams already use, so agreements no longer wait on paper.',
		cta: { label: 'Go paperless', href: '/contact' }
	},
	sections: [
		{
			heading: 'From paper to minutes',
			body: 'Replace printing, scanning and posting with digital signatures and strong authentication built into your existing workflows.',
			itemStyle: 'list',
			items: [
				{ text: 'Agreements completed in minutes' },
				{ text: 'A clear audit trail for every step' },
				{ text: 'Signing on any device for customers, partners and employees' },
				{ text: 'Full visibility of who signed what, and when' }
			]
		}
	],
	closing: {
		related: [
			'/services/business-applications/crm',
			'/services/ai-automation/integration-platforms'
		],
		links: [
			{ lead: 'See also:', link: { label: 'Public Sector', href: '/industries/public-sector' } }
		],
		button: contact
	}
};

const businessApplications: Pillar = {
	slug: 'business-applications',
	name: 'Business Applications',
	href: '/services/business-applications',
	homeSummary: 'CRM, ERP and low-code tools that run your business.',
	overviewBody: 'Tools with purpose. Tailored applications that run your operations.',
	exploreLabel: 'Explore Business Applications',
	services: [crm, erp, lowCode, digitalSigning],
	seo: {
		title: 'Business Applications | Proxie Studio',
		description:
			'Tailored CRM, ERP, low-code apps and digital signing that streamline operations, improve decisions and drive growth.'
	},
	hero: {
		headline: 'Business Applications',
		sub: 'Tools with purpose. We develop smart, tailored applications that optimise operations, improve decision-making and drive business performance.',
		cta: { label: 'Find the right tools', href: '/contact' }
	},
	sections: [
		expertise([crm, erp, lowCode, digitalSigning]),
		{
			heading: 'Built for growth',
			itemStyle: 'inline',
			items: [
				{
					title: 'Tailored business solutions',
					text: 'custom tools for sales, marketing, customer service and ERP.'
				},
				{
					title: 'Growth and engagement',
					text: 'CRM and analytics that boost sales, marketing and customer satisfaction.'
				},
				{
					title: 'Scalable development',
					text: 'cost-effective apps and workflows built on low-code platforms.'
				}
			]
		}
	],
	closing: {
		prompt: 'Need systems that talk to each other?',
		links: [
			{
				link: {
					label: 'See Integration Platforms',
					href: '/services/ai-automation/integration-platforms'
				}
			}
		],
		button: contact
	}
};

/* ------------------------------------------------------------------ */
/* PILLAR 4: DIGITAL EXPERIENCE                                        */
/* ------------------------------------------------------------------ */

const branding: Service = {
	slug: 'branding',
	name: 'Branding',
	href: '/services/digital-experience/branding',
	summary: 'A clear, consistent identity that is recognisably yours.',
	seo: {
		title: 'Branding & Visual Identity | Proxie Studio',
		description:
			'Positioning, visual identity, tone of voice and guidelines, brought to life across your website, product and marketing.'
	},
	hero: {
		headline: ['A brand with a', 'clear point of view'],
		sub: 'Your brand is the first thing people notice and the last thing they forget. We help you shape an identity that is clear, consistent and recognisably yours.',
		cta: { label: 'Talk brand', href: '/contact' }
	},
	sections: [
		{
			heading: ['From brand platform', 'to every touchpoint'],
			body: 'We work alongside your team to define what makes you different and how you want to be perceived. That becomes a brand platform, which we then bring to life across your website, product and marketing.',
			itemStyle: 'tags',
			items: [
				{ text: 'Positioning' },
				{ text: 'Visual identity' },
				{ text: 'Tone of voice' },
				{ text: 'Brand guidelines' }
			]
		}
	],
	closing: {
		related: [
			'/services/digital-experience/ux-design',
			'/services/digital-experience/websites'
		],
		button: contact
	}
};

const uxDesign: Service = {
	slug: 'ux-design',
	name: 'UX & Design',
	href: '/services/digital-experience/ux-design',
	summary: 'Research-led interfaces that feel effortless and are ready for development.',
	seo: {
		title: 'UX & Design | Proxie Studio',
		description:
			'User research, prototypes and design systems that make products effortless to use and faster to build.'
	},
	hero: {
		headline: ['Design that', 'puts people first'],
		sub: 'Good design is invisible: it simply works. We combine user research, interaction design and visual craft to create interfaces that feel effortless, look polished and are ready for development from day one.',
		cta: { label: 'Talk design', href: '/contact' }
	},
	sections: [
		{
			heading: 'Evidence, not assumptions',
			body: 'We start by understanding how your users think and what they want to achieve. With research, wireframes and interactive prototypes, we test ideas early.'
		},
		{
			heading: 'A design system that scales',
			body: 'The result is a cohesive design system that keeps your product consistent as it grows and helps designers and engineers move faster together.',
			itemStyle: 'tags',
			items: [{ text: 'Components' }, { text: 'Typography' }, { text: 'Colour' }, { text: 'Motion' }]
		}
	],
	closing: {
		related: [
			'/services/digital-experience/branding',
			'/services/digital-experience/mobile-apps'
		],
		button: contact
	}
};

const websites: Service = {
	slug: 'websites',
	name: 'Websites & Web Applications',
	href: '/services/digital-experience/websites',
	summary: 'Fast, accessible, secure sites and web apps built for growth.',
	seo: {
		title: 'Websites & Web Applications | Proxie Studio',
		description:
			'Fast, accessible and secure websites, customer portals and web apps, taken from architecture to launch and improved after go-live.'
	},
	hero: {
		headline: ['Built for speed,', 'search and growth'],
		sub: 'Your website is often your first conversation with a customer. We design and build fast, accessible and secure websites and web applications that turn a first visit into a lasting relationship.',
		cta: { label: 'Plan your website', href: '/contact' }
	},
	sections: [
		{
			heading: 'Performance first',
			body: 'Using proven frameworks and a performance-first approach, we deliver sites that load quickly, rank well and are easy for your team to update. We take every project from architecture to launch and keep improving it after go-live.',
			itemStyle: 'tags',
			items: [
				{ text: 'Marketing websites' },
				{ text: 'Customer portals' },
				{ text: 'Complex web applications' }
			]
		}
	],
	closing: {
		related: [
			'/services/digital-experience/ux-design',
			'/services/digital-experience/e-commerce'
		],
		button: contact
	}
};

const eCommerce: Service = {
	slug: 'e-commerce',
	name: 'E-Commerce & PIM',
	href: '/services/digital-experience/e-commerce',
	summary: 'Online stores that are easy to shop and easy to run.',
	seo: {
		title: 'E-Commerce & PIM | Proxie Studio',
		description:
			'Online stores that are easy to shop and easy to run, with product information management that keeps every listing accurate on every channel.'
	},
	hero: {
		headline: ['Commerce that scales', 'with your catalogue'],
		sub: 'We build online stores that are easy to shop and easy to run, backed by product information management (PIM) that keeps every listing accurate across every channel.',
		cta: { label: 'Grow your online store', href: '/contact' }
	},
	sections: [
		{
			heading: ['Frictionless from', 'search to checkout'],
			body: 'A strong storefront needs more than good design. We connect checkout, payments, inventory and fulfilment into one smooth flow, so customers find what they need and buy without friction.'
		},
		{
			heading: 'Product data in one place',
			body: 'With a PIM at the centre, descriptions, specifications, images and pricing are maintained once and published everywhere. Your range can grow without the manual work growing with it.',
			itemStyle: 'tags',
			items: [{ text: 'Your webshop' }, { text: 'Marketplaces' }, { text: 'Print' }]
		}
	],
	closing: {
		related: ['/services/digital-experience/websites', '/services/business-applications/erp'],
		links: [{ lead: 'See also:', link: { label: 'Retail', href: '/industries/retail' } }],
		button: contact
	}
};

const intranets: Service = {
	slug: 'intranets',
	name: 'Smart Intranets',
	href: '/services/digital-experience/intranets',
	summary: 'One place for news, knowledge and tools.',
	seo: {
		title: 'Smart Intranets | Proxie Studio',
		description:
			'Intranets that bring people, knowledge and tools together, tailored to your organisation and integrated with the platforms you already use.'
	},
	hero: {
		headline: ['One place for news,', 'knowledge and tools'],
		sub: 'Teams work across offices, homes and time zones. A smart intranet brings people, knowledge and tools together, so everyone finds what they need and stays connected wherever they work.',
		cta: { label: 'Talk intranets', href: '/contact' }
	},
	sections: [
		{
			heading: ['Less hunting,', 'more meaningful work'],
			body: 'Every intranet is tailored to your structure, culture and existing tools, and integrates with the platforms you already rely on rather than replacing them.',
			itemStyle: 'tags',
			items: [
				{ text: 'Personalised news' },
				{ text: 'Searchable knowledge' },
				{ text: 'Team spaces' },
				{ text: 'Quick access to everyday systems' }
			]
		},
		{
			heading: 'Launch is just the beginning',
			body: 'We help with rollout and adoption, then keep refining the intranet based on how your people actually use it.'
		}
	],
	closing: {
		related: [
			'/services/digital-experience/ux-design',
			'/services/ai-automation/integration-platforms'
		],
		button: contact
	}
};

const mobileApps: Service = {
	slug: 'mobile-apps',
	name: 'Mobile Apps',
	href: '/services/digital-experience/mobile-apps',
	summary: 'Native or cross-platform apps people come back to.',
	seo: {
		title: 'Mobile App Development | Proxie Studio',
		description:
			'Native or cross-platform mobile apps with fast performance, thoughtful design and solid security, from first sketch to the App Store and Google Play.'
	},
	hero: {
		headline: ['From first sketch', 'to app store'],
		sub: 'We design and build mobile apps that people come back to. Native or cross-platform, we focus on fast performance, thoughtful design and solid security.',
		cta: { label: 'Build your app', href: '/contact' }
	},
	sections: [
		{
			heading: 'Nothing lost between disciplines',
			body: 'One team takes your app from idea to the App Store and Google Play, covering strategy, design, engineering and QA.'
		},
		{
			heading: 'Better with every release',
			body: 'After launch we watch how the app is used, listen to feedback and ship regular improvements, so it keeps getting better as your audience grows.'
		},
		{
			heading: 'We ship our own apps too',
			body: 'Blind Companion and Session Pilot are Proxie Studio’s own AI-powered apps.',
			link: { label: 'Our Products', href: '/about/products' }
		}
	],
	closing: {
		related: [
			'/services/digital-experience/ux-design',
			'/services/ai-automation/artificial-intelligence'
		],
		button: contact
	}
};

const digitalExperience: Pillar = {
	slug: 'digital-experience',
	name: 'Digital Experience',
	href: '/services/digital-experience',
	homeSummary: 'Brands, websites, apps and intranets people enjoy using.',
	overviewBody: 'Where design meets function. Digital products people enjoy using.',
	exploreLabel: 'Explore Digital Experience',
	services: [branding, uxDesign, websites, eCommerce, intranets, mobileApps],
	seo: {
		title: 'Digital Experience: Design, Web & Apps | Proxie Studio',
		description:
			'Branding, UX design, websites, e-commerce, intranets and mobile apps: intuitive digital products that delight users and elevate brands.'
	},
	hero: {
		headline: 'Digital Experience',
		sub: 'Where design meets function. We create intuitive, elegant digital products that captivate users and elevate brands through thoughtful interaction and design.',
		cta: { label: 'Start your project', href: '/contact' }
	},
	sections: [
		expertise([branding, uxDesign, websites, eCommerce, intranets, mobileApps], 'From brand and UX to web development, we craft high-quality digital experiences that exceed your customers’ expectations.')
	],
	closing: {
		button: contact
	}
};

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */

export const pillars: readonly Pillar[] = [
	dataAnalytics,
	aiAutomation,
	businessApplications,
	digitalExperience
];

export const allServices: readonly Service[] = pillars.flatMap((p) => p.services);

export function getPillar(slug: string) {
	return pillars.find((p) => p.slug === slug);
}

export function getService(pillarSlug: string, serviceSlug: string) {
	return getPillar(pillarSlug)?.services.find((s) => s.slug === serviceSlug);
}

/** Look up a service or pillar by its href (used for "Related" cards). */
export function findByHref(href: string): { name: string; summary: string; href: string; parent?: string } | undefined {
	for (const p of pillars) {
		if (p.href === href) return { name: p.name, summary: p.homeSummary, href: p.href };
		const s = p.services.find((x) => x.href === href);
		if (s) return { name: s.name, summary: s.summary, href: s.href, parent: p.name };
	}
	return undefined;
}

/* PAGE: Services (overview) */
export const servicesOverview: Omit<ContentPage, 'sections'> & {
	howWeWork: { heading: Heading; body: string; link: Link };
} = {
	seo: {
		title: 'Services | Proxie Studio',
		description:
			'Data & analytics, AI & automation, business applications and digital experience: tailored solutions from strategy to long-term support.'
	},
	hero: {
		headline: 'Precision in every line',
		sub: 'We design and build scalable software, data and AI solutions that solve complex problems and grow with your business.',
		cta: { label: 'Talk to us', href: '/contact' }
	},
	howWeWork: {
		heading: 'How we work',
		body: 'Discover, design, build, evolve: a clear process from idea to impact. Agile teams deliver in short cycles, so you see results early.',
		link: { label: 'More about how we work', href: '/about#how-we-work' }
	},
	closing: { reuseCta: true }
};
