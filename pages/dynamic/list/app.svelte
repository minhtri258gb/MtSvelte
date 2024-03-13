<script>
  import { onMount } from 'svelte'
  import {
    Header, HeaderNav, HeaderNavItem, HeaderNavMenu, HeaderUtilities, HeaderAction, HeaderPanelLinks, HeaderPanelDivider, HeaderPanelLink,
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
    Breadcrumb, BreadcrumbItem,
    SkipToContent, Content, Grid, Row, Column,
    DataTable,
  } from 'carbon-components-svelte'
  // import base64 from 'base-64'
  import mtConfig from '../../../libs/config.js'


  // Get params URL
  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');

  // Menu
  let isSideNavOpen = true;
  let isOpen = false;

  // DataTable
  let headers = [];
  let rows = [];
  

  // Call API get data
  onMount(async () => {

    let headersRequest = new Headers();

    // #TODO
    // headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
    
    let response = await fetch(mtConfig.baseUrl+'dynamic/list/'+page, { method:'POST', headers: headersRequest });
    if (response.status == 200) {
      let data = await response.json();
      headers = data.headers;
      rows = data.rows;
    }

  });

</script>

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
    title="Load balancers"
    description="Your organization's active load balancers."
    headers={headers}
    rows={rows}
  />

  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
      </Column>
    </Row>
  </Grid>
</Content>
