<script>
  import {
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
  } from 'carbon-components-svelte';

  export let isOpen;
  export let menus;

</script>

<SideNav bind:isOpen>
  <SideNavItems>
    {#each menus as menu1}
      {#if menu1.child != null}
        <SideNavMenu text={menu1.name}>
          {#each menu1.child as menu2}
            <SideNavMenuItem href={menu2.link} text={menu2.name} />
          {/each}
        </SideNavMenu>
      {:else}
        <SideNavLink text={menu1.name} />
      {/if}
    {/each}
    <SideNavDivider />
    <SideNavLink text="Test" href="/test/" />
    <SideNavLink text="Home" href="/home/" />
    <SideNavLink text="Music" href="/music/" />
  </SideNavItems>
</SideNav>
