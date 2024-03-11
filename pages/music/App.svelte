<script>
  import "carbon-components-svelte/css/g90.css";
  import {
    Button,
    DataTable,
    Toolbar,
    ToolbarContent,
    ToolbarSearch,
    ToolbarMenu,
    ToolbarMenuItem,
  } from "carbon-components-svelte";
  import { Client, cacheExchange, fetchExchange } from '@urql/svelte';
  import { Math } from 'mathjax-svelte';

  const client = new Client({
    url: 'http://localhost:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  });

  // const client = new Client({
  //   url: 'http://localhost:3000/graphql',
  //   exchanges: [cacheExchange, fetchExchange],
  //   fetchOptions: () => {
  //     const token = getToken();
  //     return {
  //       headers: { authorization: token ? `Bearer ${token}` : '' },
  //     };
  //   },
  // });

  let rows = [
    {
      id: "a",
      name: "Load Balancer 3",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "b",
      name: "Load Balancer 1",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "c",
      name: "Load Balancer 2",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
    {
      id: "d",
      name: "Load Balancer 6",
      protocol: "HTTP",
      port: 3000,
      rule: "Round robin",
    },
    {
      id: "e",
      name: "Load Balancer 4",
      protocol: "HTTP",
      port: 443,
      rule: "Round robin",
    },
    {
      id: "f",
      name: "Load Balancer 5",
      protocol: "HTTP",
      port: 80,
      rule: "DNS delegation",
    },
  ]
</script>

<div class="left">
  <h2 class="title">Music player</h2>
  <Math t={`E = {mc^2}`} />
  
</div>
<div class="right">
  <DataTable
    headers={[
      { key: "name", value: "Name" },
      { key: "protocol", value: "Protocol", sort: false },
      { key: "port", value: "Port", sort: false },
      { key: "rule", value: "Rule" },
    ]}
    {rows} size="short" sortable stickyHeader
  >
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
        <Button>Create balancer</Button>
      </ToolbarContent>
    </Toolbar>
  </DataTable>
</div>

<style>
  .left {
    width: 25%;
    height: 100vh;
    float: left;
    background-color: #373738;
  }
  .right {
    width: 75%;
    height: 100vh;
    float: left;
  }
  .title {
    text-align: center;
  }
</style>