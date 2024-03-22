<script>
  import { onMount } from 'svelte';
  import {
    Form,
    TextInput, TextArea, NumberInput,
    Checkbox,
    Select, SelectItem,
    ButtonSet, Button,
  } from 'carbon-components-svelte';
  import MtInfo from './info.js';
  import MtDynamic from '../dynamic';

  export let self = new MtInfo();
  export let page = {};
  export let fields = [];
  export let form = {};
  export let actions = [];
  export let contents = [];
  export let isPopup = false;
  
  onMount(async () => {
    try {
      let result = self.processData(page, fields, form, actions, contents);
      fields = result.fields;
    }
    catch (e) {
      console.error(e)
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
    <Button on:click={() => self.onAction(action, page, form)} >{action.name}</Button>
  {/each}
  <Button on:click={() => self.onSave(page, form)} >Lưu</Button>
  {#if !isPopup}
    <Button on:click={() => MtDynamic.doActionBack()} >Quay lại</Button>
  {/if}
  </ButtonSet>
</Form>
