import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte()],
	root: 'pages',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'pages/index.html'),
				home: resolve(__dirname, 'pages/home/index.html'),
				music: resolve(__dirname, 'pages/music/index.html'),
				test: resolve(__dirname, 'pages/test/index.html'),
			},
		},
		// lib: {
		// 	entry: resolve(__dirname, 'lib/config.js'),
		// 	name: 'MtConfig',
		// 	fileName: 'config.js',
		// 	formats: 'esm',
		// },
		outDir: resolve(__dirname, 'dist'),
		chunkSizeWarningLimit: 1024,
	},
	mode: 'development', // production
	// resolve: {
	// 	alias: ,
	// },
	// optimizeDeps: {
	//   // exclude: ['@urql/svelte'],
	//   // entries: [],
	// }
});
