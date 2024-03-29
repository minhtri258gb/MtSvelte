<script>
  import { onMount } from 'svelte';
  import {
    Tabs, Tab, TabContent,
  } from 'carbon-components-svelte';
  import MtList from '@page/dynamic/components/list.svelte'
  import MtInfo from '@page/dynamic/components/info.svelte'
  import MtTab from './tab.js';

  export let data;

  let tabs = [];

  let tabdata = {}
  
  let isLoaded = false;

  let self = new MtTab();

  onMount(async () => {
    tabs = data.tabs;
    onChangeTab(tabs[0], 0);
  });

  async function onChangeTab(tab, i) {
    isLoaded = false;
    if (tab.isLoaded == null) {
      let result = await self.apiloadSubTab(tab.pageType, tab.pageId);
      result.isLoaded = true;
      tabs[i] = Object.assign(tab, result);
      tab = tabs[i];
    }
    tabdata = tab;
    isLoaded = true;
  }

</script>

<Tabs>
  {#each tabs as tab, i}
    <Tab label={tab.name} on:click={() => onChangeTab(tab, i)} />
  {/each}
  <svelte:fragment slot="content">
    {#each tabs as tab}
      <TabContent>
        {#if isLoaded}
          {#if tab.pageType == 'LIST'}
            <MtList bind:name={tab.name} bind:data={tab} />
          {:else if tab.pageType == 'INFO'}
            <MtInfo bind:data={tab} />
          {/if}
        {:else}
          <p>Đang tải ...</p>
        {/if}
      </TabContent>
    {/each}
  </svelte:fragment>
</Tabs>
