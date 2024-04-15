
# If / else
```svelte
{#if data.page.hasBack == 1 && !isPopup}
	<Button size="small" kind="tertiary" on:click={() => MtDynamic.doActionBack() } >Quay lại</Button>
{/if}
```

# For
```svelte
<!-- For in list -->
{#each data.actions as action, i}
	<Button size="small" kind="tertiary" on:click={() => self.onAction(action, cbkAction)} >{action.name}</Button>
{/each}

<!-- For in range -->
{#each {length: 3} as _, i}
	<li>{i + 1}</li>
{/each}
```

# Variable
```svelte
{variable}
```
