/**
 * Which photo or code-made artwork goes where, with alt text.
 * Photos are stock (CC0 / public domain, see PHOTO-CREDITS.md) and are used
 * as atmosphere only: they never depict Proxie's people, offices or work.
 * Artwork kinds are drawn in src/lib/components/art/Art.svelte.
 */
import type { Picture } from '@sveltejs/enhanced-img';
import type { ArtKind } from '#lib/components/art/Art.svelte';
import { images } from './images.ts';

export interface Photo {
	image: Picture;
	alt: string;
	/** CSS object-position for the crop */
	position?: string;
}

const p = images.photos;

export const photos = {
	home: { image: p.heroAurora, alt: 'Green northern lights over a mountain coastline at night', position: '50% 40%' },
	about: { image: p.aboutAurora, alt: 'Northern lights over a snowy forest', position: '50% 45%' },
	services: { image: p.servicesFiber, alt: 'Close-up of glowing fibre-optic strands' },
	sustainability: { image: p.forest, alt: 'Looking up through tall trees towards the sky', position: '50% 35%' },
	careers: { image: p.careersRoom, alt: 'A bright meeting room with a long table and dark chairs', position: '50% 55%' }
} satisfies Record<string, Photo>;

export const industryPhotos: Record<string, Photo> = {
	retail: { image: p.industries.retail, alt: 'Shoes, a camera and framed art displayed in a shop', position: '50% 55%' },
	energy: { image: p.industries.energy, alt: 'Wind turbines on snowy hills under a bright sky', position: '50% 55%' },
	manufacturing: {
		image: p.industries.manufacturing,
		alt: 'Orange robotic arms stacking crates on a factory production line'
	},
	'public-sector': {
		image: p.industries['public-sector'],
		alt: 'The two curved towers of a city hall seen from below',
		position: '50% 40%'
	}
};

export const officePhotos: Record<string, Photo> = {
	Sweden: { image: p.offices.Sweden, alt: 'A calm lake below a snowy, forested hill in winter' },
	India: { image: p.offices.India, alt: 'The Ludhiana skyline at dusk', position: '50% 60%' }
};

export const pillarArt: Record<string, ArtKind> = {
	'data-analytics': 'data',
	'ai-automation': 'ai',
	'business-applications': 'apps',
	'digital-experience': 'experience'
};

export const productArt: Record<string, Extract<ArtKind, 'vision' | 'voice'>> = {
	'blind-companion': 'vision',
	'session-pilot': 'voice'
};
