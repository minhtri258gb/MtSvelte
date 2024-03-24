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
  let name = "Dynamic Page";
  let menus = [];
  let data = {}
  
  onMount(async () => {
    let res = await self.loadPage();
    name = res.page.name;
    menus = res.menus;
    delete res.menus;
    data = res;
    isLoaded = true;
  });

</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<MtHeader bind:menus bind:isSideNavOpen bind:isOpen />
<MtMenu bind:menus bind:isOpen={isSideNavOpen} />

<Content>
  {#if isLoaded}
    {#if type == 'LIST'}
      <MtList bind:name bind:data />
    {:else if type == 'INFO'}
      <MtInfo bind:data />
    {:else if type == 'TAB'}
      <MtTab bind:data />
    {/if}
  {:else}
    <p>Đang tải ...</p>
  {/if}
</Content>
