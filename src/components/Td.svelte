<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { getDataTypeOptions } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  let dataType;
  const events = getEvents(current_component);
  let format = (v) => v;

  // props (external)
  export let type = 'string';

  // props (dynamic)
  $: if (type) {
    dataType = getDataTypeOptions(type);
    format = dataType.format;
  }
  $: classes = twMerge('whitespace-nowrap px-[1rem] py-[.5rem]', dataType.classes, $$props.class);
</script>

<td class={classes} use:events>
  <slot {format} />
</td>
