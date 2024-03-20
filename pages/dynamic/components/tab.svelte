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

  let subPage = {};
  let subFilters = [];
  let subHeaders = [];
  let subRows = [];
  let subFields = [];
  let subForm = {};
  let subTabs = [];
  let subActions = [];
  let subContents = [];
  
  let isLoaded = false;

  let self = new MtTab();

  onMount(async () => {
    onChangeTab(tabs[0], 0);
  });

  async function onChangeTab(tab, i) {
    isLoaded = false;
    if (tab.isLoaded == null) {
      let result = await self.apiloadSubTab(tab.pageType, tab.pageId);
      tabs[i].page = result.page;
      tabs[i].filters = result.filters;
      tabs[i].headers = result.headers;
      tabs[i].rows = result.rows;
      tabs[i].fields = result.fields;
      tabs[i].form = result.form;
      tabs[i].tabs = result.tabs;
      tabs[i].actions = result.actions;
      tabs[i].contents = result.contents;
      tabs[i].isLoaded = true;
      tab = tabs[i];
    }
    subPage = tab.page == null ? {} : tab.page;
    subFilters = tab.filters == null ? [] : tab.filters;
    subHeaders = tab.headers == null ? [] : tab.headers;
    subRows = tab.rows == null ? [] : tab.rows;
    subFields = tab.fields == null ? [] : tab.fields;
    subForm = tab.form == null ? {} : tab.form;
    subTabs = tab.tabs == null ? [] : tab.tabs;
    subActions = tab.actions == null ? [] : tab.actions;
    subContents = tab.contents == null ? [] : tab.contents;
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
            <MtList
              bind:page={tab.page}
              bind:filters={tab.filters}
              bind:headers={tab.headers}
              bind:rows={subRows}
              bind:actions={subActions}
            />
          {:else if tab.pageType == 'INFO'}
            <MtInfo
              bind:page={tab.page}
              bind:fields={subFields}
              bind:form={subForm}
              bind:actions={subActions}
              bind:contents={subContents}
            />
          {/if}
        {:else}
          <p>Đang tải ...</p>
        {/if}
      </TabContent>
    {/each}
  </svelte:fragment>
</Tabs>
