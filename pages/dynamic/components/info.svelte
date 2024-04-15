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

  export let data = {
    actions: []
  };
  export let isPopup = false;

  let self = new MtInfo();
  
  onMount(async () => {
    try {
      let result = self.processData(data.page, data.fields, data.form, data.actions, data.contents);
      data.fields = result.fields;
    }
    catch (e) {
      console.error(e)
    }
  });
  
</script>

<Form >
  <!-- FIELD -->
  {#each data.fields as field}
    {#if field.type === "TEXT"}
      <TextInput labelText={field.name} bind:value={data.form[field.code]} />
    {:else if field.type === "TEXTAREA"}
      <TextArea labelText={field.name} bind:value={data.form[field.code]} />
    {:else if field.type === "NUMBER"}
      <NumberInput label={field.name} bind:value={data.form[field.code]} allowEmpty />
    {:else if field.type === "CHECKBOX"}
      <Checkbox id={field.code} labelText={field.name} />
    {:else if field.type === "SELECTBOX"}
      <Select labelText={field.name} bind:selected={data.form[field.code]}>
      {#each field.content as content}
        <SelectItem value={content.key} text={content.value} />
      {/each}
      </Select>
    {/if}
  {/each}
  <!-- ACTION -->
  <ButtonSet>
    {#each data.actions as action}
      <Button size="small" kind="tertiary" on:click={() => self.onAction(action, data.page, data.form)} >{action.name}</Button>
    {/each}
      <Button size="small" kind="tertiary" on:click={() => self.onSave(data.page, data.form)} >Lưu</Button>
    {#if !isPopup}
      <Button size="small" kind="tertiary" on:click={() => MtDynamic.doActionBack()} >Quay lại</Button>
    {/if}
  </ButtonSet>
</Form>
