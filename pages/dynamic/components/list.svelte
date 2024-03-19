<script>
  import { onMount } from 'svelte';
  import {
    DataTable,
    Toolbar, ToolbarContent, ToolbarSearch, ToolbarMenu, ToolbarMenuItem,
    OverflowMenu, OverflowMenuItem,
    ButtonSet, Button,
  } from 'carbon-components-svelte';
  import MtList from './list.js';

  export let detail = {};
  export let filters = [];
  export let headers = [];
  export let rows = [];
  export let actions = [];
  
  let self = new MtList();
  let actionTop = [];
  let actionInline = [];

  onMount(async () => {
    try {
      let result = self.processData(detail, headers, rows, actions);
      actionTop = result.actionTop;
      actionInline = result.actionInline;
    }
    catch (e) {
      console.error(e)
    }
  });
  
</script>

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
          <Button on:click={() => self.onAction(action)} >{action.name}</Button>
        {/each}
      </ButtonSet>
    </ToolbarContent>
  </Toolbar>
  <!-- Row Action -->
  <svelte:fragment slot="cell" let:cell let:row>
    {#if cell.key === "overflow"}
      <OverflowMenu flipped>
        {#each actionInline as action, i}
          <OverflowMenuItem text={action.name} on:click={() => self.onAction(action, row)} />
        {/each}
      </OverflowMenu>
    {:else}{cell.value}{/if}
  </svelte:fragment>
</DataTable>
