<script>
  import {
    DataTable,
    Toolbar, ToolbarContent, ToolbarSearch, ToolbarMenu, ToolbarMenuItem,
    OverflowMenu, OverflowMenuItem,
    ButtonSet, Button,
    Modal,
  } from 'carbon-components-svelte';
  import MtInfo from './info.svelte';
  import MtList from './list.js';
  import MtDynamic from '../dynamic';

  export let name = null;
  export let data = {};
  export let isPopup = false;
  
  let self = new MtList();
  let popup = {
    isOpen: false,
    page: {}
  };
  let selectedRowIds = [];

  let cbkAction = function(request) {
    if (request.popup != null) {
      popup = request.popup;
    }
  }
  
</script>

<DataTable
  title={name || undefined}
  headers={data.headers}
  rows={data.rows}
  size="medium"
  selectable={data.page.select == 2 || undefined}
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
        {#each data.actions as action, i}
          <Button on:click={() => self.onAction(action, cbkAction)} >{action.name}</Button>
        {/each}
        {#if data.page.hasBack == 1 && !isPopup}
          <Button on:click={() => MtDynamic.doActionBack() } >Quay lại</Button>
        {/if}
      </ButtonSet>
    </ToolbarContent>
  </Toolbar>
  <!-- Row Action -->
  <svelte:fragment slot="cell" let:cell let:row>
    {#if cell.key === "overflow"}
      <OverflowMenu flipped>
        {#each data.actionsRow as action, i}
          <OverflowMenuItem text={action.name} on:click={() => self.onAction(action, cbkAction, row)} />
        {/each}
      </OverflowMenu>
    {:else}{cell.value}{/if}
  </svelte:fragment>
</DataTable>

<Modal
  passiveModal
  bind:open={popup.isOpen}
  modalHeading={popup.page.name || "Popup"}
  size="sm"
  on:open
  on:close
>
  {#if popup.pageType == 'LIST'}
    <svelte:self bind:data={popup} isPopup=true />
  {:else if popup.pageType == 'INFO'}
    <MtInfo bind:data={popup} isPopup=true />
  {/if}
</Modal>
