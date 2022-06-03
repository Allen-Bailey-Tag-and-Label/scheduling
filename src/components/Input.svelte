<script>
  // imports
  // import {  } from '@components';
  import { getEvents, setType } from '@lib/actions';
  import { getInputClasses } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let color = 'color-scheme';
  export let disabled = false;
  export let error = false;
  export let name;
  export let rounded = true;
  export let size = 'normal';
  export let type = 'text';
  export let value = '';

  // props (dynamic)
  $: classes = twMerge(
    getInputClasses({ color, disabled, rounded, size }),
    !error
      ? ''
      : 'ring-offset-red-500 dark:ring-offset-red-500 focus:ring-red-500/[.3] selection:bg-red-500',
    $$props.class
  );
  $: dynamicSize = value ? value.length : 0;
</script>

<input
  class={classes}
  id={name}
  {name}
  size={dynamicSize}
  use:events
  use:setType={type}
  bind:value
/>
