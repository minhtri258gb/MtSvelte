<script>
  import { onMount } from 'svelte';
  import {
    Tabs, Tab, TabContent,
  } from 'carbon-components-svelte';
  import MtList from '@page/dynamic/components/list.svelte'
  import MtInfo from '@page/dynamic/components/info.svelte'
  import MtTab from './tab.js';

  export let detail;
  export let tabs;
  
  let listDetail = {};
  let filters = [];
  let headers = [];
  let rows = [];

  let infoDetail = {};
  let fields = [];
  let form = {};
  
  let actions = [];
  let contents = [];

  let self = new MtTab();

  onMount(async () => {
    
    if (tabs.length > 0) {
      let tab = tabs[0];
      let pageType = tab.pageType;
      if (pageType == 'LIST') {
        listDetail = tab.detail;
        filters = tab.filters;
        headers = tab.headers;
        rows = tab.rows;
      }
      else if (pageType == 'INFO') {
        
      }
    }

    // let result = await mt.apiLoad(); // Call API
    // menus = result.menus;
    // detail = result.detail;
    // tabs = result.tabs;
  });

</script>

<Tabs>
  {#each tabs as tab}
    <Tab label={tab.name} />
  {/each}
  <svelte:fragment slot="content">
    {#each tabs as tab}
      <TabContent>
        {#if tab.pageType == 'LIST'}
          <MtList bind:detail={listDetail} bind:filters bind:headers bind:rows bind:actions />
        {:else if tab.pageType == 'INFO'}
          <MtInfo bind:detail={infoDetail} bind:fields bind:form bind:actions bind:contents />
        {/if}
      </TabContent>
    {/each}
  </svelte:fragment>
</Tabs>
