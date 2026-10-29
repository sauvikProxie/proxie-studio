import { error } from '@sveltejs/kit';
import { getService, pillars } from '#lib/content/services.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	pillars.flatMap((p) => p.services.map((s) => ({ pillar: p.slug, service: s.slug })));

export const load: PageLoad = ({ params }) => {
	if (!getService(params.pillar, params.service)) error(404, 'Not found');
	return { pillar: params.pillar, service: params.service };
};
