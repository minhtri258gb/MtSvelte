<script>
  import { onMount } from 'svelte';
  import {
    Content,
  } from 'carbon-components-svelte';
  import MtHeader from '@page/dynamic/components/header.svelte'
  import MtMenu from '@page/dynamic/components/menu.svelte'
  import MtList from '@page/dynamic/components/list.svelte'
  import MtInfo from '@page/dynamic/components/info.svelte'
  import Mt from './script.js';

  let self = new Mt();

  // Page
  let pageType = self.args.type;
  let pageCode = self.args.code;

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // Data
  let menus = [];
  let detail = { name: "Dynamic Page" };
  
  onMount(async () => {
    let res = await self.loadPage();
    menus = res.menus;
  });

</script>

<svelte:head>
	<title>{detail.name}</title>
</svelte:head>

<MtHeader bind:menus bind:isSideNavOpen bind:isOpen />
<MtMenu bind:menus bind:isOpen={isSideNavOpen} />

<Content>
  {#if pageType == 'LIST'}
    <MtList code={pageCode} />
    {:else if pageType == 'INFO'}
    <MtInfo code={pageCode} />
  {:else if pageType == 'TAB'}
    <p>TAB</p>
  {/if}
</Content>
