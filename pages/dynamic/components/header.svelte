<script>
  import {
    Header,
    HeaderNav,
    HeaderNavMenu,
    HeaderNavItem,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderPanelDivider,
    SkipToContent,
  } from 'carbon-components-svelte';

  export let isSideNavOpen;
  export let isOpen;
  export let menus;

</script>


<Header
  persistentHamburgerMenu={true}
  company="Massan"
  platformName="Dynamic"
  bind:isSideNavOpen
>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderNav>
    {#each menus as menu1}
      {#if menu1.child != null}
        <HeaderNavMenu text={menu1.name}>
          {#each menu1.child as menu2}
            <HeaderNavItem text={menu2.name} href={menu2.link} />
          {/each}
        </HeaderNavMenu>
      {:else}
        <HeaderNavItem text={menu1.name} href={menu1.link} />
      {/if}
    {/each}
    <HeaderNavItem text="Dynamic Page" href="/dynamic/page/?type=LIST&code=MGR_LIST" />
    <HeaderNavItem text="Test" href="/test/" />
    <HeaderNavItem text="Exam" href="/example/components/" />
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
