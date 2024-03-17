<script>
  import { onMount } from 'svelte';
  import {
    Content,
    Form,
    TextInput, TextArea, NumberInput,
    Checkbox,
    Select, SelectItem,
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

  // Form
  let menus = [];
  let detail = { name: "Dynamic List" };
  let fields = [];
  let form = {};
  let actions = [];
  
  // Call API get data
  onMount(async () => {
    try {
      let result = await mt.apiDynamicInfo(); // Call API
      menus = result.menus;
        detail = result.detail;
      fields = result.fields;
      form = result.form;
      actions = result.actions;
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

  <Form >
    <!-- FIELD -->
    {#each fields as field}
      {#if field.type === "TEXT"}
        <TextInput labelText={field.name} bind:value={form[field.code]} />
      {:else if field.type === "TEXTAREA"}
        <TextArea labelText={field.name} bind:value={form[field.code]} />
      {:else if field.type === "NUMBER"}
        <NumberInput label={field.name} bind:value={form[field.code]} allowEmpty />
      {:else if field.type === "CHECKBOX"}
        <Checkbox id={field.code} labelText={field.name} />
      {:else if field.type === "SELECTBOX"}
        <Select labelText={field.name} bind:selected={form[field.code]}>
          {#each field.content as content}
            <SelectItem value={content.key} text={content.value} />
          {/each}
        </Select>
      {/if}
    {/each}
    <!-- ACTION -->
    <ButtonSet>
      {#each actions as action}
        <Button on:click={() => mt.onButtonPress(action, detail, form)} >{action.name}</Button>
      {/each}
    </ButtonSet>
  </Form>

</Content>
