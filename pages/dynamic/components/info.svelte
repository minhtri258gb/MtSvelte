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
  import MtInfo from './info.js';

  export let code;

  let self = new MtInfo();
  let detail = {};
  let fields = [];
  let form = {};
  let actions = [];
  
  onMount(async () => {
    try {
      let result = await self.loadPage(code); // Call API
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
    <Button on:click={() => self.onAction(action, detail, form)} >{action.name}</Button>
  {/each}
  </ButtonSet>
</Form>
