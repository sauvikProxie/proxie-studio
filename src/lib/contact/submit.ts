/**
 * Contact form submission: the ONE place to connect a back end.
 *
 * TODO(back end): No form back end exists yet (SiteContent.txt, PAGE: Contact).
 * To connect one, either:
 *   1. set PUBLIC_CONTACT_ENDPOINT (declared in src/env.ts) in .env to a URL that accepts a JSON POST
 *      of { name, email, message } and returns a 2xx status on success
 *      (e.g. Formspree, Basin, a serverless function), or
 *   2. replace the body of `submitContactForm` with your own call
 *      (e.g. a SvelteKit remote function or a +server.ts endpoint that sends
 *      the enquiry by email).
 * The form only needs this function to resolve on success and throw on failure;
 * it already shows the success, error and validation messages from the content file.
 */
import { PUBLIC_CONTACT_ENDPOINT } from '$app/env/public';
import { dev } from '$app/env';

export interface ContactPayload {
	name: string;
	email: string;
	message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
	const endpoint = PUBLIC_CONTACT_ENDPOINT;

	if (!endpoint) {
		if (dev) {
			// Development only: simulate a successful send so the UI can be tested.
			console.info('[contact] No PUBLIC_CONTACT_ENDPOINT set; simulating success.', payload);
			await new Promise((resolve) => setTimeout(resolve, 600));
			return;
		}
		// In production without a back end, fail honestly: the error message
		// tells the visitor to email enquiries@weareproxie.com instead.
		throw new Error('Contact form back end is not configured');
	}

	const response = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		throw new Error(`Contact form request failed with status ${response.status}`);
	}
}
