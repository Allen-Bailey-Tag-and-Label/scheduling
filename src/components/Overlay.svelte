<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let show = false;

  // props (dynamic)
  $: classes = twMerge(
    'fixed top-0 left-0 z-[2] w-screen h-screen bg-black/[.7] dark:bg-black/[.3] transition duration-200 cursor-pointer',
    !show ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
    $$props.class
  );
</script>

<div class={classes} use:events>
  <slot />
</div>
