import { error } from '@sveltejs/kit';
import { getPillar, pillars } from '#lib/content/services.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => pillars.map((p) => ({ pillar: p.slug }));

export const load: PageLoad = ({ params }) => {
	if (!getPillar(params.pillar)) error(404, 'Not found');
	return { pillar: params.pillar };
};
