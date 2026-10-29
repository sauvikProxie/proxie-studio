import adapter from '@sveltejs/adapter-auto';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// adapter-auto picks the right adapter for Vercel, Netlify, Cloudflare etc.
			// The 301 redirects in src/hooks.server.ts need a server runtime, which all of them provide.
			adapter: adapter(),
			// Inline all CSS into the HTML: no render-blocking stylesheet requests
			inlineStyleThreshold: 100_000,
			prerender: {
				// Fail the build on broken internal links or missing #anchors.
				handleHttpError: 'fail',
				handleMissingId: 'fail'
			}
		})
	]
});
