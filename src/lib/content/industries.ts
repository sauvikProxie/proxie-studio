/**
 * Industries overview and the four industry pages
 * (SiteContent.txt, Section 4, "=== INDUSTRIES ===").
 */
import type { ContentPage, Industry } from './types';

const retail: Industry = {
	slug: 'retail',
	name: 'Retail',
	href: '/industries/retail',
	summary:
		'Omnichannel experiences, smarter pricing and better forecasts for tight margins and high expectations.',
	seo: {
		title: 'Retail Technology Solutions | Proxie Studio',
		description:
			'ERP, omnichannel integration, e-commerce, AI pricing and forecasting that help retailers protect margins and delight customers.'
	},
	hero: {
		headline: 'Retail',
		sub: 'Retailers face rising customer expectations, tight margins and fragile supply chains. Data-driven solutions help you deliver seamless omnichannel experiences.',
		cta: { label: 'Talk retail', href: '/contact' }
	},
	sections: [
		{
			heading: 'How we can help you',
			body: 'From fast-growing online brands to established store chains, we help retailers turn data into value and technology into a competitive advantage.',
			itemStyle: 'cards',
			items: [
				{
					title: 'Scale with ERP',
					text: 'Expand into new markets and channels on a solid foundation. We implement and tailor ERP that unites finance, inventory and point of sale in one system.',
					href: '/services/business-applications/erp',
					linkLabel: 'ERP'
				},
				{
					title: 'Omnichannel integration',
					text: 'We connect your webshop, stores, marketplaces and customer service so stock, orders and customer data stay in sync. Customers can browse online, collect in store and return anywhere, across both B2B and B2C.',
					href: '/services/ai-automation/integration-platforms',
					linkLabel: 'Integration Platforms'
				},
				{
					title: 'E-commerce platforms',
					text: 'Engaging online stores with tailored e-commerce and PIM that present your products at their best and make shopping effortless.',
					href: '/services/digital-experience/e-commerce',
					linkLabel: 'E-Commerce & PIM'
				},
				{
					title: 'Optimised pricing',
					text: 'Machine-learning pricing models weigh demand, competition and stock levels to suggest the right price for every product, protecting margins without losing sales.',
					href: '/services/ai-automation/artificial-intelligence',
					linkLabel: 'Artificial Intelligence'
				},
				{
					title: 'Digital marketing that converts',
					text: 'From SEO and paid search to conversion optimisation, we bring the right visitors to your store and turn them into loyal customers.',
					href: '/services/digital-experience/websites',
					linkLabel: 'Websites & Web Applications'
				},
				{
					title: 'Better forecasting',
					text: 'Accurate demand forecasts mean less overstock and fewer empty shelves. We combine your sales history with planning and BI tools, so buying decisions rest on data, not guesswork.',
					href: '/services/data-analytics/business-intelligence',
					linkLabel: 'Business Intelligence & Analytics'
				}
			]
		}
	],
	closing: { reuseCta: true }
};

const energy: Industry = {
	slug: 'energy',
	name: 'Energy',
	href: '/industries/energy',
	summary: 'Customer journeys, planning and IoT/AI insight for a sector in transition.',
	seo: {
		title: 'Energy Sector Solutions | Proxie Studio',
		description:
			'Customer portals, planning tools, IoT, AI and business applications that help energy companies cut costs and serve customers better.'
	},
	hero: {
		headline: 'Energy',
		sub: 'The energy sector is shaped by the shift to renewables, rising electricity demand and changing customer expectations. Strained infrastructure, extreme weather, rising costs and geopolitical uncertainty all call for innovative and secure solutions.',
		cta: { label: 'Talk energy', href: '/contact' }
	},
	sections: [
		{
			heading: 'How we can help you',
			itemStyle: 'cards',
			items: [
				{
					title: 'Strengthen the whole customer journey',
					text: 'Energy customers expect clear information and simple self-service. We build the data platforms, websites and customer portals that make every step, from sign-up to billing, easier.'
				},
				{
					title: 'Minimise impact with insight and optimisation',
					text: 'Machine learning helps you predict and prevent problems, from network load to asset failures, while route and resource optimisation cut both costs and environmental impact.'
				},
				{
					title: 'Optimise costs with planning solutions',
					text: 'Volatile prices and shifting markets call for agile planning. Our planning and forecasting solutions give a reliable view of costs, investments and capital expenditure, so you can act early.'
				},
				{
					title: 'Save time with IoT and AI',
					text: 'AI-powered image recognition, connected sensors and modern data warehouses turn inspections and reporting that once took months into work that takes weeks, with dashboards the whole organisation can use.'
				},
				{
					title: 'Business applications beyond sales',
					text: 'We extend CRM and business applications beyond sales into systems that improve the customer experience, generate leads and break down silos between departments.'
				}
			]
		}
	],
	closing: { reuseCta: true }
};

const manufacturing: Industry = {
	slug: 'manufacturing',
	name: 'Manufacturing',
	href: '/industries/manufacturing',
	summary:
		'Production data, IoT and connected business applications that cut waste and drive innovation.',
	seo: {
		title: 'Manufacturing Solutions: Data, IoT & ERP | Proxie Studio',
		description:
			'Turn machine data into insight, cut waste with IoT and cloud data platforms, and connect ERP to the rest of your business.'
	},
	hero: {
		headline: 'Manufacturing',
		sub: 'Supply chains are growing more complex and competition is getting tougher. Manufacturers need efficient production with minimal waste while keeping up with new regulations. Let Proxie Studio be your partner in meeting these challenges.',
		cta: { label: 'Talk manufacturing', href: '/contact' }
	},
	sections: [
		{
			heading: ['Gain business insights', 'that drive innovation'],
			body: 'Your machines and production lines generate huge amounts of data. With our expertise in data integration, data transformation and APIs, we turn it into insight that supports critical decisions, automates manual processes and prepares you for AI. Advanced forecasting models help reduce customer churn and optimise stock turnover.'
		},
		{
			heading: ['Increase operational efficiency', 'and reduce waste'],
			itemStyle: 'inline',
			items: [
				{
					title: 'IoT for efficiency',
					text: 'connected sensors and Power BI dashboards give a structured view of energy use and carbon footprint across systems.'
				},
				{
					title: 'Smarter stock management',
					text: 'real-time IoT data shows what is running low and where, so replenishment happens before it becomes a problem.'
				},
				{
					title: 'Production optimised with data platforms',
					text: 'modern cloud data platforms collect and analyse machine data, giving you the insight to fine-tune every line.'
				}
			]
		},
		{
			heading: ['Get the most from', 'your business applications'],
			body: 'We help manufacturers move ERP and business applications to the cloud for greater flexibility, and connect them to the rest of the business.'
		}
	],
	closing: { reuseCta: true }
};

const publicSector: Industry = {
	slug: 'public-sector',
	name: 'Public Sector',
	href: '/industries/public-sector',
	summary: 'Secure, accessible digital services that make everyday interactions simpler.',
	seo: {
		title: 'Public Sector Digital Services | Proxie Studio',
		description:
			'Secure, accessible and easy-to-use digital services that help public organisations serve citizens, employees and institutions better.'
	},
	hero: {
		headline: ['Tackling modern challenges', 'with the right technology'],
		sub: 'Public sector leaders face complex challenges, from climate change to cybersecurity. The right technology is essential to address them and keep services working for citizens.',
		cta: { label: 'Talk to us', href: '/contact' }
	},
	sections: [
		{
			heading: ['Digital services for', 'a modern society'],
			body: 'We help public organisations modernise their services through digital transformation, with a focus on security, accessibility and ease of use. Our experts deliver solutions that make everyday interactions simpler for citizens, employees and institutions alike.',
			itemStyle: 'tags',
			items: [{ text: 'Security' }, { text: 'Accessibility' }, { text: 'Ease of use' }]
		}
	],
	closing: {
		relatedLabel: 'Related services',
		related: [
			'/services/business-applications/digital-signing',
			'/services/digital-experience/websites'
		],
		reuseCta: true
	}
};

export const industries: readonly Industry[] = [retail, energy, manufacturing, publicSector];

export function getIndustry(slug: string) {
	return industries.find((i) => i.slug === slug);
}

/* PAGE: Industries (overview) */
export const industriesOverview: ContentPage & { listHeading: string } = {
	seo: {
		title: 'Industries | Proxie Studio',
		description:
			'Data, AI and digital solutions for retail, energy, manufacturing and the public sector, shaped by each sector’s challenges.'
	},
	hero: {
		headline: 'Industries we serve',
		sub: 'Every sector has its own pressures. We combine our data, AI and software expertise with an understanding of yours.',
		cta: { label: 'Talk to us about your sector', href: '/contact' }
	},
	listHeading: 'Where we work',
	sections: [],
	closing: { reuseCta: true }
};
