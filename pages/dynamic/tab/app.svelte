<script>
  import { onMount } from 'svelte';
  import {
    Content,
    Tabs, Tab, TabContent,
  } from 'carbon-components-svelte';
  import mt from './script.js';
  import MtHeader from '@page/dynamic/components/header.svelte'
  import MtMenu from '@page/dynamic/components/menu.svelte'

  // Get params URL
  mt.init();

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // DataTable
  let menus = [];
  let detail = { name: "Dynamic Tab" };
  let tabs = [];
  

  // Call API get data
  onMount(async () => {
    let result = await mt.apiLoad(); // Call API
    menus = result.menus;
    detail = result.detail;
    tabs = result.tabs;
  });

</script>

<svelte:head>
	<title>{detail.name}</title>
</svelte:head>

<MtHeader bind:isSideNavOpen bind:isOpen bind:menus />
<MtMenu bind:isOpen={isSideNavOpen} bind:menus />

<Content>
  <Tabs>
    {#each tabs as tab}
      <Tab label={tab.name} />
    {/each}
    <svelte:fragment slot="content">
      {#each tabs as tab}
        <TabContent>
          {tab.name}
          {#if tab.pageType == 'LIST'}
            <p>LIST</p>
          {:else if tab.pageType == 'INFO'}
            <p>INFO</p>
          {/if}
        </TabContent>
      {/each}
    </svelte:fragment>
  </Tabs>
</Content>
