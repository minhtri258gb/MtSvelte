<script>
  import { onMount } from 'svelte';
  import {
    Header, HeaderNav, HeaderNavItem, HeaderNavMenu, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelDivider, HeaderPanelLink,
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
    Breadcrumb, BreadcrumbItem,
    SkipToContent, Content, Grid, Row, Column,
    Form,
    TextInput, TextArea, NumberInput,
    Checkbox,
    Select, SelectItem,
    Button,
  } from 'carbon-components-svelte';
  import mt from './script.js';

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // Form
  let detail = { name: "Dynamic List" };
  let fields = [];
  let form = {};
  let actions = [];
  
  // Call API get data
  onMount(async () => {

    mt.init();

    let result = await mt.apiDynamicInfo(); // Call API
    detail = result.detail;
    fields = result.fields;
    form = result.form;
    actions = result.actions;

  });

</script>

<svelte:head>
	<title>{detail.name}</title>
</svelte:head>

<Header
  persistentHamburgerMenu={true}
  company="Massan"
  platformName="Carbon Svelte"
  bind:isSideNavOpen
>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    <HeaderNavItem href="/" text="h Link 1" />
    <HeaderNavItem href="/" text="h Link 2" />
    <HeaderNavItem href="/" text="h Link 3" />
    <HeaderNavMenu text="Menu">
      <HeaderNavItem href="/" text="sh Link 1" />
      <HeaderNavItem href="/" text="sh Link 2" />
      <HeaderNavItem href="/" text="sh ink 3" />
    </HeaderNavMenu>
  </HeaderNav>
  <HeaderUtilities>
    <HeaderAction bind:isOpen transition={{ duration: 200 }}>
      <HeaderPanelLinks>
        <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink text="m Link 1" />
    <SideNavLink text="m Link 2" />
    <SideNavLink text="m Link 3" />
    <SideNavMenu text="m Menu">
      <SideNavMenuItem href="/" text="ms Link 1" />
      <SideNavMenuItem href="/" text="ms Link 2" />
      <SideNavMenuItem href="/" text="ms Link 3" />
    </SideNavMenu>
    <SideNavDivider />
    <SideNavLink text="m Link 4" />
  </SideNavItems>
</SideNav>

<Content>
  
  <Breadcrumb>
    <BreadcrumbItem href="/">Home</BreadcrumbItem>
    <BreadcrumbItem href="/reports">Example</BreadcrumbItem>
    <BreadcrumbItem href="/reports/2019" isCurrentPage>Components</BreadcrumbItem>
  </Breadcrumb>

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
    {#each actions as action}
      <Button on:click={() => mt.onButtonPress(action, detail, form)} >{action.name}</Button>
    {/each}
  </Form>

  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
      </Column>
    </Row>
  </Grid>
</Content>
