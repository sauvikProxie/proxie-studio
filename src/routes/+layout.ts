// Every page is static content, so prerender it all. Unknown URLs and the
// old-route 301s are handled at runtime by src/hooks.server.ts.
export const prerender = true;
export const trailingSlash = 'never';
