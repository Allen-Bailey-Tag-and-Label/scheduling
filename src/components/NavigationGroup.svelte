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
    'whitespace-nowrap text-gray-900 dark:text-gray-50 uppercase px-[1.5rem] py-[.5rem] min-w-[15rem] font-bold',
    $$props.class
  );
</script>

<div class={classes} use:events>
  <slot />
</div>
