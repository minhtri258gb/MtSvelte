<script>
	import { onMount } from 'svelte';
	import {
		Grid, Row, Column,
		ImageLoader,
		InlineLoading,
	} from 'carbon-components-svelte';

	var lstImg = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	

	var numColumn = 6;
</script>

<div>
	<Grid>
		<Row>
			{#each {length: numColumn} as _, i}
				<Column>
					<ImageLoader src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg">
						<svelte:fragment slot="loading">
							<InlineLoading />
						</svelte:fragment>
						<svelte:fragment slot="error">An error occurred.</svelte:fragment>
					</ImageLoader>
				</Column>
			{/each}
		</Row>
	</Grid>
</div>

<style>
	/* Some class */
</style>
