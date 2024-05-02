<script>
	import { onMount } from 'svelte';
	import {
		Modal,
	} from 'carbon-components-svelte';
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import dayGridMonth from '@event-calendar/day-grid';
	import listWeek from '@event-calendar/list';
	import resourceTimeGridWeek from '@event-calendar/resource-time-grid';
	import Interaction from '@event-calendar/interaction';
	import '@event-calendar/core/index.css';
	import Mt from './script.js';

	// ====== Variable ======
	// Mt
	let self = new Mt();

	// Model detail
	let popup_detail_open = false;
	let pupop_detail_text = "";

	// Calendar
	let ec;
	let plugins = [TimeGrid, dayGridMonth, listWeek, resourceTimeGridWeek, Interaction];
	let options = {
		view: 'dayGridMonth',
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek resourceTimeGridWeek'
		},
		buttonText: function (texts) {
			texts.close = 'Đóng';
			texts.today = 'Hôm nay';
			texts.dayGridMonth = 'Tháng';
			texts.listDay = 'Danh sách';
			texts.listMonth = 'Danh sách';
			texts.listWeek = 'Danh sách';
			texts.listYear = 'Danh sách';
			texts.resourceTimeGridDay = 'Ngày';
			texts.resourceTimeGridWeek = 'Tuần';
			texts.timeGridDay = 'Ngày';
			texts.timeGridWeek = 'Tuần';
			texts.resourceTimeGridWeek = 'resources';
			return texts;
		},
		resources: [
			{id: 1, title: 'Resource A'},
			{id: 2, title: 'Resource B'}
		],
		scrollTime: '09:00:00',
		// events: await self.createEvents(),
		views: {
			timeGridWeek: {pointer: true},
			resourceTimeGridWeek: {pointer: true}
		},
		dayMaxEvents: true,
		nowIndicator: true,
		selectable: true,
		titleFormat: function(startDate, endDate) {
			return "Tháng " + (startDate.getMonth()+1) + " năm " + startDate.getFullYear();
		},
		firstDay: 1,
		// height: '100%',
		eventClick: function(info) {
			popup_detail_open = true;
			pupop_detail_text = info.event.title;
		},
		// dateClick: function(info) {
		// 	console.log("dateClick: ", info);
		// },
		eventSources: [{events: async function(packDate, cbk_success, cbk_failure) {
			return await self.getListEvent(packDate.start, packDate.end);
		}}],
		// loading: function(isLoading) {
		// 	console.log("isLoading: ", isLoading);
		// },
	};

	// ====== Method ======
	// onMount(async () => {
	// });
	
</script>

<!-- Main -->
<div>
	<header class="row">
		<h4 class="col">
			<a href="https://github.com/vkurko/calendar">Event Calendar</a> Demo
			<a href="/home/">Home</a>
		</h4>
		<button onclick="console.log('abc')">a</button>
		<button class="toggle-dark-button" title="Toggle dark mode" onclick="document.body.classList.toggle('ec-dark')">
			<svg class="light" focusable="false" viewBox="0 0 32 32"><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg>
			<svg class="dark" focusable="false" viewBox="0 0 32 32"><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path></svg>
		</button>
	</header>
	<Calendar bind:this={ec} {plugins} {options} />
</div>

<!-- Extra -->
<Modal
	bind:open={popup_detail_open}
	modalHeading="Sự kiện"
	passiveModal
	on:click:button--secondary={() => (popup_detail_open = false)}
	on:open
	on:close
>
	<p>{pupop_detail_text}</p>
</Modal>

<style>
	/* Some class */
</style>