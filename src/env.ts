import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_CONTACT_ENDPOINT: {
		description:
			'Optional URL that receives contact form submissions as a JSON POST. See src/lib/contact/submit.ts.',
		public: true,
		// Inlined at build time (the site is prerendered)
		static: true,
		schema: (value) => value || undefined
	}
});
