<script>
  import { onMount } from 'svelte';
  import {
    Header, HeaderNav, HeaderNavItem, HeaderNavMenu, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelDivider, HeaderPanelLink,
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
    Breadcrumb, BreadcrumbItem,
    SkipToContent, Content, Grid, Row, Column,
    Form, FormGroup,
    Checkbox,
    RadioButtonGroup, RadioButton,
    Select, SelectItem,
    Button,
  } from 'carbon-components-svelte';
  import mt from './script.js';

  // Get params URL
  mt.init();

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // DataTable
  let detail = { name: "Dynamic List" };
  let headers = [];
  let rows = [];
  let actionTop = [];
  let actionInline = [];
  

  // Call API get data
  onMount(async () => {
    try {
      let result = await mt.apiDynamicInfo(); // Call API
      detail = result.detail;
      // headers = result.headers;
      // rows = result.rows;
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

  <Form on:submit={(e) => mt.onFormSubmit(e)} >
    <FormGroup legendText="Checkboxes">
      <Checkbox id="checkbox-0" labelText="Checkbox Label" checked />
      <Checkbox id="checkbox-1" labelText="Checkbox Label" />
      <Checkbox id="checkbox-2" labelText="Checkbox Label" disabled />
    </FormGroup>
    <FormGroup legendText="Radio buttons">
      <RadioButtonGroup name="radio-button-group" selected="default-selected">
        <RadioButton
          id="radio-1"
          value="standard"
          labelText="Standard Radio Button"
        />
        <RadioButton
          id="radio-2"
          value="default-selected"
          labelText="Default Selected Radio Button"
        />
        <RadioButton
          id="radio-4"
          value="disabled"
          labelText="Disabled Radio Button"
          disabled
        />
      </RadioButtonGroup>
    </FormGroup>
    <FormGroup>
      <Select id="select-1" labelText="Select menu">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
      </Select>
    </FormGroup>
    {#each actionTop as action, i}
      {#if action.func_type === "SUBMIT"}
        <Button type="submit">{action.name}</Button>
      {:else}
        <Button on:click={() => mt.onButtonPress(action)} >{action.name}</Button>
      {/if}
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
