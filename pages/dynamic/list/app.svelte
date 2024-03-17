<script>
  import { onMount } from 'svelte';
  import {
    Content,
    DataTable,
    Toolbar, ToolbarContent, ToolbarSearch, ToolbarMenu, ToolbarMenuItem,
    OverflowMenu, OverflowMenuItem,
    ButtonSet, Button,
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
  let detail = { name: "Dynamic Info" };
  let headers = [];
  let rows = [];
  let actionTop = [];
  let actionInline = [];
  

  // Call API get data
  onMount(async () => {
    try {
      let result = await mt.apiDynamicList(); // Call API
      menus = result.menus;
      detail = result.detail;
      headers = result.headers;
      rows = result.rows;
      actionTop = result.actionTop;
      actionInline = result.actionInline;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
  });

</script>

<svelte:head>
	<title>{detail.name}</title>
</svelte:head>

<MtHeader bind:isSideNavOpen bind:isOpen bind:menus />
<MtMenu bind:isOpen={isSideNavOpen} bind:menus />

<Content>
  
  <!-- <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/reports">Example</BreadcrumbItem>
    <BreadcrumbItem href="/reports/2019" isCurrentPage>Components</BreadcrumbItem>
  </Breadcrumb> -->

  <DataTable
    title={detail.name}
    headers={headers}
    rows={rows}
    size="medium"
  >
    <!-- Top Action -->
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch
          shouldFilterRows
        />
        <ToolbarMenu>
          <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
          <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
            API documentation
          </ToolbarMenuItem>
          <ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
        </ToolbarMenu>
        <ButtonSet>
          {#each actionTop as action, i}
            <Button on:click={() => mt.onButtonPress(action)} >{action.name}</Button>
          {/each}
        </ButtonSet>
      </ToolbarContent>
    </Toolbar>
    <!-- Row Action -->
    <svelte:fragment slot="cell" let:cell let:row>
      {#if cell.key === "overflow"}
        <OverflowMenu flipped>
          {#each actionInline as action, i}
            <OverflowMenuItem text={action.name} on:click={() => mt.onButtonPress(action, row)} />
          {/each}
        </OverflowMenu>
      {:else}{cell.value}{/if}
    </svelte:fragment>
  </DataTable>

</Content>
