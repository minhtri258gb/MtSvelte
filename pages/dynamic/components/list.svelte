<script>
  import { onMount } from 'svelte';
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

  export let page = {};
  export let filters = [];
  export let headers = [];
  export let rows = [];
  export let actions = [];
  export let isPopup = false;
  
  let self = new MtList();
  let actionTop = [];
  let actionInline = [];
  let popup = {
    isOpen: false,
    page: { name: 'popup' }
  };

  onMount(async () => {
    try {
      let result = self.processData(page, headers, rows, actions);
      actionTop = result.actionTop;
      actionInline = result.actionInline;

      filters = [] // #TODO
    }
    catch (e) {
      console.error(e)
    }
  });

  let cbkAction = function(request) {
    if (request.popup != null) {
      popup = request.popup;
    }
  }
  
</script>

<DataTable
  title={page.name}
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
          <Button on:click={() => self.onAction(action, cbkAction)} >{action.name}</Button>
        {/each}
        {#if page.hasBack == 1 && !isPopup}
          <Button on:click={() => MtDynamic.doActionBack() } >Quay lại</Button>
        {/if}
      </ButtonSet>
    </ToolbarContent>
  </Toolbar>
  <!-- Row Action -->
  <svelte:fragment slot="cell" let:cell let:row>
    {#if cell.key === "overflow"}
      <OverflowMenu flipped>
        {#each actionInline as action, i}
          <OverflowMenuItem text={action.name} on:click={() => self.onAction(action, cbkAction, row)} />
        {/each}
      </OverflowMenu>
    {:else}{cell.value}{/if}
  </svelte:fragment>
</DataTable>

<Modal
  passiveModal
  bind:open={popup.isOpen}
  modalHeading={popup.page.name}
  size="lg"
  on:open
  on:close
>
  {#if popup.pageType == 'LIST'}
    <svelte:self
      bind:page={popup.page}
      bind:filters={popup.filters}
      bind:headers={popup.headers}
      bind:rows={popup.rows}
      bind:actions={popup.actions}
      isPopup=true
    />
  {:else if popup.pageType == 'INFO'}
    <MtInfo
      bind:page={popup.page}
      bind:fields={popup.fields}
      bind:form={popup.form}
      bind:actions={popup.actions}
      bind:contents={popup.contents}
      isPopup=true
    />
  {/if}
</Modal>
