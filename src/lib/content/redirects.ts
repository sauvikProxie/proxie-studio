/**
 * Old → new routes (SiteContent.txt, Section 3). Served as 301s by
 * src/hooks.server.ts. Keys are lower-case paths without a trailing slash.
 * Unchanged routes (/, /careers, /privacy-policy, /blind-companion-privacy-policy,
 * /spprivacypolicy) are not listed.
 */
export const redirects: Readonly<Record<string, string>> = {
	// Header & other pages
	'/about-us': '/about',
	'/contact-us': '/contact',

	// Data & AI (split into two pillars)
	'/data-ai': '/services',
	'/data-ai/datastrategi': '/services/data-analytics/data-strategy',
	'/data-ai/bi-analytics': '/services/data-analytics/business-intelligence',
	'/data-ai/agila-team-deliveries': '/about#how-we-work',
	'/data-ai/dataplatformar': '/services/data-analytics/data-platforms',
	'/data-ai/corporate-performance-management':
		'/services/data-analytics/corporate-performance-management',
	'/data-ai/process-development-rpa': '/services/ai-automation/process-automation',
	'/data-ai/ai': '/services/ai-automation/artificial-intelligence',
	'/data-ai/iot': '/services/ai-automation/iot',

	// Software engineering (removed placeholder)
	'/software-engineering': '/services',

	// Digital Experience
	'/digital-experience': '/services/digital-experience',
	'/digital-experience/branding': '/services/digital-experience/branding',
	'/digital-experience/design-ux': '/services/digital-experience/ux-design',
	'/digital-experience/websites': '/services/digital-experience/websites',
	'/digital-experience/e-commerce': '/services/digital-experience/e-commerce',
	'/digital-experience/intranets': '/services/digital-experience/intranets',
	'/digital-experience/application': '/services/digital-experience/mobile-apps',

	// Business Applications
	'/business-applications': '/services/business-applications',
	'/business-applications/sales-marketing': '/services/business-applications/crm',
	'/business-applications/low-code': '/services/business-applications/low-code',
	'/business-applications/erp': '/services/business-applications/erp',
	'/business-applications/digital-signing-authentication':
		'/services/business-applications/digital-signing',
	'/business-applications/integration-platforms': '/services/ai-automation/integration-platforms',

	// Industries
	'/retail': '/industries/retail',
	'/energy': '/industries/energy',
	'/manufacturing-industry': '/industries/manufacturing',
	'/public-sector': '/industries/public-sector',
	'/durability': '/about/sustainability',

	// Footer
	'/terms-&-conditions': '/terms'
};
