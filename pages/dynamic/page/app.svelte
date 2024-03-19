<script>
  import { onMount } from 'svelte';
  import {
    Content,
  } from 'carbon-components-svelte';
  import MtHeader from '@page/dynamic/components/header.svelte'
  import MtMenu from '@page/dynamic/components/menu.svelte'
  import MtList from '@page/dynamic/components/list.svelte'
  import MtInfo from '@page/dynamic/components/info.svelte'
  import MtTab from '@page/dynamic/components/tab.svelte'
  import Mt from './script.js';

  let self = new Mt();

  // Page
  let pageType = self.args.type;
  let pageCode = self.args.code;

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;
  let isLoaded = false;

  // Data
  let menus = [];

  let detail = { name: "Dynamic Page" };

  let filters = [];
  let headers = [];
  let rows = [];

  let fields = [];
  let form = {};

  let tabs = [];

  let actions = [];
  let contents = [];
  
  onMount(async () => {
    let res = await self.loadPage();
    menus = res.menus;
    if (pageType == 'LIST') {
      detail = res.detail;
      filters = res.fitlers;
      headers = res.headers;
      rows = res.rows;
      actions = res.actions;
    }
    else if (pageType == 'INFO') {
      detail = res.detail;
      fields = res.fields;
      form = res.form;
      actions = res.actions;
      contents = res.contents;
    }
    else if (pageType == 'TAB') {
      detail = res.detail;
      tabs = res.tabs;
    }
    isLoaded = true;
  });

</script>

<svelte:head>
	<title>{detail.name}</title>
</svelte:head>

<MtHeader bind:menus bind:isSideNavOpen bind:isOpen />
<MtMenu bind:menus bind:isOpen={isSideNavOpen} />

<Content>
  {#if isLoaded}
    {#if pageType == 'LIST'}
      <MtList bind:detail bind:filters bind:headers bind:rows bind:actions />
    {:else if pageType == 'INFO'}
      <MtInfo bind:detail bind:fields bind:form bind:actions bind:contents />
    {:else if pageType == 'TAB'}
      <MtTab bind:detail bind:tabs />
    {/if}
  {:else}
    <p>Đang tải ...</p>
  {/if}
</Content>
