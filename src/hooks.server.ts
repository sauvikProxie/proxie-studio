import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { redirects } from '#lib/content/redirects.ts';

/** Normalise a request path: decode (%26 → &), lower-case, drop trailing slashes. */
function normalise(pathname: string) {
	let path = pathname;
	try {
		path = decodeURIComponent(pathname);
	} catch {
		// keep the raw path if it is not valid URI encoding
	}
	return path.toLowerCase().replace(/\/+$/, '') || '/';
}

export const handle: Handle = async ({ event, resolve }) => {
	const target = redirects[normalise(event.url.pathname)];

	if (target) {
		// 301: permanent move from the old site structure (SiteContent.txt, Section 3)
		const [path, hash] = target.split('#');
		redirect(301, path + event.url.search + (hash ? `#${hash}` : ''));
	}

	return resolve(event);
};
