// Image imports with explicit widths, e.g. '#images/x.png?w=800;400&enhanced'
// (@sveltejs/enhanced-img only declares the bare '*?enhanced' form).
declare module '*&enhanced' {
	const value: import('vite-imagetools').Picture;
	export default value;
}
