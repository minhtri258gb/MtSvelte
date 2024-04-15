
# Page
1. Add folder ./pages/<name>
2. Add file index.html
```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/x-icon" href="/icon/favicon.ico">
		<link rel="stylesheet" href="./style.css">
		<title>Example</title>
	</head>
	<body>
		<div id="app"></div>
		<script type="module">
			import 'carbon-components-svelte/css/all.css';
			import App from './app.svelte';
			const app = new App({ target: document.getElementById('app') });
			export default app;
		</script>
	</body>
</html>
```
3. Add file script.js
```js
import MtConfig from '@libs/config.js';

export default class Mt {

	constructor() {
		// #TODO
	}

	// #TODO
}
```
4. Add file app.svelte
```svelte
<script>
	import { onMount } from 'svelte';
	import {
		// #TODO Add component
	} from 'carbon-components-svelte';

	// #TODO
</script>

<div>
	Hello
	
	<!-- Some Component -->
</div>

<style>
	/* Some class */
</style>
```
5. Add file style.css
```css
:root {
	color-scheme: light dark;
}
```
6. Open vite.config.js
	- follow: build -> rollupOptions -> input
	- Add page same struct