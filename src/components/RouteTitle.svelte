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
  $: classes = twMerge('font-bold text-[1.5rem]', $$props.class);
</script>

<h1 class={classes} use:events>
  <slot />
</h1>
