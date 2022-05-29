<script>
  // imports
  import { page } from '$app/stores';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let href = '/';

  // props (dynamic)
  $: classes = twMerge(
    'whitespace-nowrap text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 px-[1.5rem] py-[.5rem] transition duration-200 min-w-[15rem] relative',
    'after:absolute after:h-full after:w-[1px] after:top-[0] after:right-[0] after:bg-blue-500 after:transition after:duration-200',
    $page.url.pathname !== href
      ? 'after:opacity-[0]'
      : 'cursor-default text-gray-900 dark:text-gray-100 after:opacity-[1]',
    $$props.class
  );
</script>

<a class={classes} {href} use:events>
  <slot />
</a>
