<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';
  
  // props (internal)
  const events = getEvents(current_component);
  
  // props (external)
  
  // props (dynamic)
  $: classes = twMerge('text-[1rem] leading-[1rem]', $$props.class);
</script>

<label class={classes} for={$$props.for} use:events>
  <slot/>
</label>