<script>
  import { onMount } from 'svelte';
  import {
    Tabs, Tab, TabContent,
  } from 'carbon-components-svelte';
  import MtList from '@page/dynamic/components/list.svelte'
  import MtInfo from '@page/dynamic/components/info.svelte'
  import MtTab from './tab.js';

  export let page;
  export let tabs;
  
  let isLoaded = false;

  let self = new MtTab();

  onMount(async () => {
    isLoaded = true;
  });

  async function onChangeTab(tab, i) {
    isLoaded = false;
    let result = await self.apiloadSubTab(tab.pageType, tab.pageId);
    tabs[i].page = result.page;
    tabs[i].fields = result.fields;
    tabs[i].form = result.form;
    tabs[i].actions = result.actions;
    tabs[i].contents = result.contents;
    isLoaded = true;
  }

</script>

<Tabs>
  {#each tabs as tab, i}
    <Tab label={tab.name} on:click={() => onChangeTab(tab, i)} />
  {/each}
  <svelte:fragment slot="content">
    {#if isLoaded}
      {#each tabs as tab}
        <TabContent>
          {#if tab.pageType == 'LIST'}
            <MtList
              bind:page={tab.page}
              bind:filters={tab.filters}
              bind:headers={tab.headers}
              bind:rows={tab.rows}
              bind:actions={tab.actions}
            />
          {:else if tab.pageType == 'INFO'}
            <MtInfo
              bind:page={tab.page}
              bind:fields={tab.fields}
              bind:form={tab.form}
              bind:actions={tab.actions}
              bind:contents={tab.contents}
            />
          {/if}
        </TabContent>
      {/each}
    {:else}
      <p>Đang tải ...</p>
    {/if}
  </svelte:fragment>
</Tabs>
