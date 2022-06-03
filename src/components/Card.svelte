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
  $: classes = twMerge(
    'flex flex-col p-[1.5rem] rounded-[.5rem] bg-gray-50 dark:bg-gray-900 shadow-md shadow-gray-900/[.1] dark:shadow-gray-900/[.7]',
    $$props.class
  );
</script>

<div class={classes} use:events>
  <slot />
</div>
