<script>
	import { onMount } from 'svelte';
	import {
		Grid, Row, Column,
		ClickableTile
	} from 'carbon-components-svelte';
	import Mt from './script.js';
	
	let self = new Mt();
	
	onMount(async () => {
		// self.load();
	});
	
</script>

<div id=content>
	<Grid>
		<Row>
			<Column padding aspectRatio="2x1">
				<ClickableTile href="/dynamic/page/?type=LIST&code=MGR_LIST">Dynamic Config</ClickableTile>
			</Column>
			<Column padding aspectRatio="2x1">
				<ClickableTile href="/calendar/">Calendar</ClickableTile>
			</Column>
			<Column padding aspectRatio="2x1">
				<ClickableTile href="/image/">Image</ClickableTile>
			</Column>
			<Column padding aspectRatio="2x1">
				<ClickableTile href="/music/">Music</ClickableTile>
			</Column>
		</Row>
	</Grid>
</div>

<style>
	#content {
		border: solid;
		border-width: thin;
	}
</style>
