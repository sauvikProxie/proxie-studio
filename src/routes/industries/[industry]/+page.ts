import { error } from '@sveltejs/kit';
import { getIndustry, industries } from '#lib/content/industries.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => industries.map((i) => ({ industry: i.slug }));

export const load: PageLoad = ({ params }) => {
	if (!getIndustry(params.industry)) error(404, 'Not found');
	return { industry: params.industry };
};
