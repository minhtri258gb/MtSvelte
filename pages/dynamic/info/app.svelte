<script>
  import { onMount } from 'svelte';
  import {
    Header, HeaderNav, HeaderNavItem, HeaderNavMenu, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelDivider, HeaderPanelLink,
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
    Breadcrumb, BreadcrumbItem,
    SkipToContent, Content, Grid, Row, Column,
    DataTable,
    Toolbar, ToolbarContent, ToolbarSearch, ToolbarMenu, ToolbarMenuItem,
    OverflowMenu, OverflowMenuItem,
    Button,
  } from 'carbon-components-svelte';
  import mt from './script.js';

  // Get params URL
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');
  let record = urlParams.get('record');

  // record null nếu ko có

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // DataTable
  let detail = {
    name: "Dynamic List"
  };
  let headers = [];
  let rows = [];
  let actions = [];
  

  // Call API get data
  onMount(async () => {
    try {
      let result = await mt.apiDynamicInfo(page, record); // Call API
      detail = result.detail;
      // headers = result.headers;
      // rows = result.rows;
      actions = result.actions;
    } catch (e) {
      console.error(e)
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

  <DataTable
    title={detail.name}
    headers={headers}
    rows={rows}
    size="medium"
  >
    <!-- Top Action -->
    <Toolbar>
      <ToolbarContent>
        <ToolbarSearch />
        <ToolbarMenu>
          <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
          <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
            API documentation
          </ToolbarMenuItem>
          <ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
        </ToolbarMenu>
        {#each actions as action, i}
          {#if action.type == 1}
          <Button on:click={() => mt.onButtonPress(actions[i])} >{action.name}</Button>
          {/if}
        {/each}
      </ToolbarContent>
    </Toolbar>
    <!-- Row Action -->
    <svelte:fragment slot="cell" let:cell let:row>
      {#if cell.key === "overflow"}
        <OverflowMenu flipped>
          {#each actions as action, i}
            {#if action.type == 2}
              <OverflowMenuItem text={action.name} on:click={() => mt.onButtonPress(actions[i], row)} />
            {/if}
          {/each}
        </OverflowMenu>
      {:else}{cell.value}{/if}
    </svelte:fragment>
  </DataTable>


  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
      </Column>
    </Row>
  </Grid>
</Content>
