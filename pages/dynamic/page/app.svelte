<script>
  import { onMount } from 'svelte';
  import {
    Content,
  } from 'carbon-components-svelte';
  import MtHeader from '@page/dynamic/components/header.svelte';
  import MtMenu from '@page/dynamic/components/menu.svelte';
  import MtList from '@page/dynamic/components/list.svelte';
  import MtInfo from '@page/dynamic/components/info.svelte';
  import MtTab from '@page/dynamic/components/tab.svelte';
  import Mt from './script.js';

  let self = new Mt();

  // Page
  let type = self.args.type;
  let id = self.args.id;
  let code = self.args.code;

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;
  let isLoaded = false;

  // Data
  let menus = [];

  let page = { name: "Dynamic Page" };

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
    if (type == 'LIST') {
      page = res.page;
      filters = res.fitlers;
      headers = res.headers;
      rows = res.rows;
      actions = res.actions;
    }
    else if (type == 'INFO') {
      page = res.page;
      fields = res.fields;
      form = res.form;
      actions = res.actions;
      contents = res.contents;
    }
    else if (type == 'TAB') {
      page = res.page;
      tabs = res.tabs;
    }
    isLoaded = true;
  });

</script>

<svelte:head>
	<title>{page.name}</title>
</svelte:head>

<MtHeader bind:menus bind:isSideNavOpen bind:isOpen />
<MtMenu bind:menus bind:isOpen={isSideNavOpen} />

<Content>
  {#if isLoaded}
    {#if type == 'LIST'}
      <MtList bind:page bind:filters bind:headers bind:rows bind:actions />
    {:else if type == 'INFO'}
      <MtInfo bind:page bind:fields bind:form bind:actions bind:contents />
    {:else if type == 'TAB'}
      <MtTab bind:page bind:tabs />
    {/if}
  {:else}
    <p>Đang tải ...</p>
  {/if}
</Content>
