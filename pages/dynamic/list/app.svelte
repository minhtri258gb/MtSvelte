<script>
  import {
    TimePicker,
    TimePickerSelect,
    SelectItem,
  } from 'carbon-components-svelte'

  const urlParams = new URLSearchParams(window.location.search);
  let page = urlParams.get('page');
  console.log("page:", page);
</script>

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
