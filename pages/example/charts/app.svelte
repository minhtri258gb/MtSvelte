<script>
	import '@carbon/charts-svelte/styles.css'
	import { BarChartSimple } from '@carbon/charts-svelte'
	
	// doc: https://github.com/carbon-design-system/carbon-charts/tree/master/packages/svelte
</script>

<BarChartSimple
	data={[
		{ group: 'Qty', value: 65000 },
		{ group: 'More', value: 29123 },
		{ group: 'Sold', value: 35213 },
		{ group: 'Restocking', value: 51213 },
		{ group: 'Misc', value: 16932 }
	]}
	options={{
		theme: 'g90',
		title: 'Bar Chart Simple',
		height: '400px',
		axes: {
			left: { mapsTo: 'value' },
			bottom: { mapsTo: 'group', scaleType: 'labels' }
		}
	}}
/>