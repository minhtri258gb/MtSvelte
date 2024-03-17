import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { optimizeImports, optimizeCss, icons } from 'carbon-preprocess-svelte';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		svelte({
			preprocess: [
				optimizeImports(),
				icons()
			]
		}),
		process.env.NODE_ENV === 'production' && optimizeCss()
	],
	root: 'pages',
	publicDir: '../public',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'pages/index.html'),
				test: resolve(__dirname, 'pages/test/index.html'),
				home: resolve(__dirname, 'pages/home/index.html'),
				music: resolve(__dirname, 'pages/music/index.html'),
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
	resolve: {
		alias: {
			'@page': `${resolve(__dirname, 'pages')}/`,
			'@libs': `${resolve(__dirname, 'libs')}/`
		},
	},
	// optimizeDeps: {
	//   // exclude: ['@urql/svelte'],
	//   // entries: [],
	// }
});
