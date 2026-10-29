/**
 * Content types. Every visible word on the site comes from the modules in
 * this folder, which are transcribed from SiteContent.txt.
 */
import type { Picture } from '@sveltejs/enhanced-img';

/**
 * A heading is either one string, or a [lead, quiet] pair that renders as
 * two lines with the second in a quieter tone. Joined with a space, the
 * pair reads exactly as the copy in SiteContent.txt.
 */
export type Heading = string | readonly [string, string];

export interface Seo {
	title: string;
	description: string;
}

export interface Link {
	label: string;
	href: string;
	external?: boolean;
}

export interface Hero {
	headline: Heading;
	sub?: string;
	cta?: Link;
}

/** A list item. `title` + `text` mirror the "Title: text" pattern in the source. */
export interface Item {
	title?: string;
	text?: string;
	href?: string;
	/** Label for the item's link, if it differs from the title (e.g. a service name). */
	linkLabel?: string;
}

/**
 * How a list of items is presented:
 * - cards:  title + text cards in a grid
 * - inline: "Title: text" sentences in a numbered list (for lowercase continuations)
 * - list:   short plain lines with a check mark
 * - tags:   short labels as pills
 * - links:  linked rows with arrows
 */
export type ItemStyle = 'cards' | 'inline' | 'list' | 'tags' | 'links';

export type TestimonialId = 'rajesh' | 'erik' | 'michelle' | 'kayla';

export interface Section {
	id?: string;
	heading?: Heading;
	body?: string;
	items?: readonly Item[];
	itemStyle?: ItemStyle;
	quote?: TestimonialId;
	link?: Link;
}

/** The closing "next step" of a page. */
export interface Closing {
	/** A short question or prompt, e.g. "Ready to put your data to work?" */
	prompt?: string;
	/** Hrefs of related services (resolved to cards with name + summary). */
	related?: readonly string[];
	relatedLabel?: string;
	/** Extra links, e.g. "See also: Retail" or "Looking for AI? See AI & Automation →" */
	links?: readonly { lead?: string; link: Link }[];
	button?: Link;
	/** Render the reusable "Let's build what's next" CTA block. */
	reuseCta?: boolean;
}

export interface ContentPage {
	seo: Seo;
	hero: Hero;
	sections: readonly Section[];
	closing: Closing;
}

export interface Service extends ContentPage {
	slug: string;
	name: string;
	href: string;
	/** One-line description used on cards (from the pillar's "Our areas of expertise"). */
	summary: string;
}

export interface Pillar extends ContentPage {
	slug: string;
	name: string;
	href: string;
	/** Short line used on Home ("What we do"). */
	homeSummary: string;
	/** Body used on the Services overview. */
	overviewBody: string;
	exploreLabel: string;
	services: readonly Service[];
}

export interface Industry extends ContentPage {
	slug: string;
	name: string;
	href: string;
	summary: string;
}

export interface Testimonial {
	id: TestimonialId;
	quote: string;
	name: string;
	role?: string;
	company: string;
	photo?: Picture;
}

export interface Founder {
	name: string;
	role: string;
	photo: Picture;
}

export interface Logo {
	name: string;
	image: Picture;
	/** Visual weight tweak so logos with different proportions look balanced. */
	scale?: number;
}

export interface Stat {
	value: string;
	label: string;
	text: string;
}

export interface Step {
	number: string;
	title: string;
	text: string;
}

export interface Office {
	country: string;
	city: string;
	address: string;
	/** Address without the country, as used on Careers. */
	short: string;
}

/** Legal documents are long-form and rendered with a table of contents. */
export interface LegalBlock {
	heading?: string;
	paragraphs?: readonly string[];
	items?: readonly (string | { title: string; text: string })[];
	/** Render items as sub-sections (h3) instead of a bullet list. */
	itemsAsSubsections?: boolean;
	closing?: string;
}

export interface LegalPart {
	heading?: string;
	intro?: string;
	blocks: readonly LegalBlock[];
}

export interface LegalDoc {
	seo: Seo;
	title: string;
	sub?: string;
	parts: readonly LegalPart[];
}
