import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// base must stay relative, FiveM's NUI loads over nui://, not a domain root
export default defineConfig({
	base: './',
	plugins: [svelte()],
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
});
