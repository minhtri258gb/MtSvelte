<script>
  import {
    Accordion, AccordionItem,
    Breadcrumb, BreadcrumbItem,
    Breakpoint,
    Button,
    Checkbox,
    ClickableTile,
    CodeSnippet,
    Column,
    Content,
    ComboBox,
    ComposedModal,
    ContentSwitcher,
    ContextMenu, ContextMenuDivider, ContextMenuGroup, ContextMenuOption,
    CopyButton,
    DataTable,
    DatePicker, DatePickerInput,
    Dropdown,
    ExpandableTile,
    FileUploaderButton,

    Grid,

    Header, HeaderNav, HeaderNavItem, HeaderNavMenu,
    
    ModalHeader, ModalBody, ModalFooter,

    Row,
    SelectItem,
    SkipToContent,
    SideNav, SideNavItems, SideNavMenu, SideNavMenuItem, SideNavLink, SideNavDivider,
    Switch,
    TimePicker, TimePickerSelect,
    Tag,
    TreeView,
  } from 'carbon-components-svelte'
  import CopyFile from "carbon-icons-svelte/lib/CopyFile.svelte";
  import Cut from "carbon-icons-svelte/lib/Cut.svelte";
  
  let isSideNavOpen = false;

  let size;
  let events = [];

  let checked = false;

  let activeId = "";
  let selectedIds = [];
  let children = [
    { id: 0, text: "AI / Machine learning" },
    {
      id: 1,
      text: "Analytics",
      children: [
        {
          id: 2,
          text: "IBM Analytics Engine",
          children: [
            { id: 3, text: "Apache Spark" },
            { id: 4, text: "Hadoop" },
          ],
        },
        { id: 5, text: "IBM Cloud SQL Query" },
        { id: 6, text: "IBM Db2 Warehouse on Cloud" },
      ],
    },
    {
      id: 7,
      text: "Blockchain",
      children: [{ id: 8, text: "IBM Blockchain Platform" }],
    },
    {
      id: 9,
      text: "Databases",
      children: [
        { id: 10, text: "IBM Cloud Databases for Elasticsearch" },
        { id: 11, text: "IBM Cloud Databases for Enterprise DB" },
        { id: 12, text: "IBM Cloud Databases for MongoDB" },
        { id: 13, text: "IBM Cloud Databases for PostgreSQL" },
      ],
    },
    {
      id: 14,
      text: "Integration",
      disabled: true,
      children: [{ id: 15, text: "IBM API Connect", disabled: true }],
    },
  ];
  
</script>


<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
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

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/reports">Example</BreadcrumbItem>
  <BreadcrumbItem href="/reports/2019" isCurrentPage>Components</BreadcrumbItem>
</Breadcrumb>


<Content>
  <Grid>
    <Row>
      <Column>
        <h1>Welcome</h1>
      </Column>
    </Row>
  </Grid>
</Content>


<Accordion>
  <AccordionItem title="Natural Language Classifier">
    <p>
      Natural Language Classifier uses advanced natural language processing and
      machine learning techniques to create custom classification models. Users
      train their data and the service predicts the appropriate category for the
      inputted text.
    </p>
  </AccordionItem>
  <AccordionItem title="Natural Language Understanding">
    <p>
      Analyze text to extract meta-data from content such as concepts, entities,
      emotion, relations, sentiment and more.
    </p>
  </AccordionItem>
  <AccordionItem title="Language Translator">
    <p>
      Translate text, documents, and websites from one language to another.
      Create industry or region-specific translations via the service's
      customization capability.
    </p>
  </AccordionItem>
</Accordion>


<Breakpoint bind:size on:change={(e) => (events = [...events, e.detail])} />


<Button>Primary button</Button>
<Button kind="secondary">Secondary button</Button>


<Checkbox labelText="Label text" />


<ClickableTile href="https://www.carbondesignsystem.com/">Carbon Design System</ClickableTile>


<CodeSnippet code="yarn add -D carbon-components-svelte" />


<ComboBox
  titleText="Contact"
  placeholder="Select contact method"
  items={[
    { id: "0", text: "Slack" },
    { id: "1", text: "Email" },
    { id: "2", text: "Fax" },
  ]}
/>


<!-- <ComposedModal open>
  <ModalHeader label="Changes" title="Confirm changes" />
  <ModalBody hasForm>
    <Checkbox labelText="I have reviewed the changes" bind:checked />
  </ModalBody>
  <ModalFooter primaryButtonText="Proceed" primaryButtonDisabled={!checked} />
</ComposedModal> -->


<ContentSwitcher>
  <Switch text="Latest news" />
  <Switch text="Trending" />
</ContentSwitcher>


<ContextMenu>
  <ContextMenuOption
    indented
    labelText="Copy"
    shortcutText="Ctrl+C"
    icon={CopyFile}
  />
  <ContextMenuOption indented labelText="Cut" shortcutText="Ctrl+X" icon={Cut} />
  <ContextMenuDivider />
  <ContextMenuOption indented labelText="Export as">
    <ContextMenuGroup labelText="Export options" bind:selectedIds>
      <ContextMenuOption id="pdf" labelText="PDF" />
      <ContextMenuOption id="txt" labelText="TXT" />
      <ContextMenuOption id="mp3" labelText="MP3" />
    </ContextMenuGroup>
  </ContextMenuOption>
  <ContextMenuDivider />
  <ContextMenuOption selectable labelText="Remove metadata" />
  <ContextMenuDivider />
  <ContextMenuGroup labelText="Style options">
    <ContextMenuOption id="0" labelText="Font smoothing" selected />
    <ContextMenuOption id="1" labelText="Reduce noise" />
    <ContextMenuOption id="2" labelText="Auto-sharpen" />
  </ContextMenuGroup>
  <ContextMenuDivider />
  <ContextMenuOption indented kind="danger" labelText="Delete" />
</ContextMenu>


<CopyButton text="Carbon svelte" />


<DataTable
  headers={[
    { key: "name", value: "Name" },
    { key: "protocol", value: "Protocol" },
    { key: "port", value: "Port" },
    { key: "rule", value: "Rule" },
  ]}
  rows={[
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
  ]}
/>


<DatePicker datePickerType="single" on:change dateFormat="d/m/Y">
  <DatePickerInput labelText="Meeting date" placeholder="dd/mm/yyyy" />
</DatePicker>


<Dropdown
  titleText="Contact"
  selectedId="0"
  items={[
    { id: "0", text: "Slack" },
    { id: "1", text: "Email" },
    { id: "2", text: "Fax" },
  ]}
/>


<ExpandableTile>
  <div slot="above">
    <div>Above the fold content here</div>
    <br />
    <br />
    <div>More above the fold content</div>
  </div>
  <div slot="below">Below the fold content here</div>
</ExpandableTile>


<FileUploaderButton labelText="Add file" />


<TimePicker labelText="Cron job" placeholder="hh:mm">
  <TimePickerSelect value="pm">
    <SelectItem value="am" text="AM" />
    <SelectItem value="pm" text="PM" />
  </TimePickerSelect>
  <TimePickerSelect value="pdt">
    <SelectItem value="pdt" text="PDT" />
    <SelectItem value="gmt" text="GMT" />
  </TimePickerSelect>
</TimePicker>


<Tag>IBM Cloud</Tag>


<TreeView
  labelText="Cloud Products"
  {children}
  bind:activeId
  bind:selectedIds
  on:select={({ detail }) => console.log("select", detail)}
  on:toggle={({ detail }) => console.log("toggle", detail)}
  on:focus={({ detail }) => console.log("focus", detail)}
/>

<div>Active node id: {activeId}</div>
<div>Selected ids: {JSON.stringify(selectedIds)}</div>

<style>
  div {
    margin-top: var(--cds-spacing-05);
  }
</style>
