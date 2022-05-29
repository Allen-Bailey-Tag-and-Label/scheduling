<script>
  // imports
  import { NavigationLink } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);
  const links = [
    { href: '/', text: 'Dashboard' },
    { href: '/open-orders', text: 'Open Orders' },
    { href: '/upload', text: 'Upload' },
    { href: '/work-orders', text: 'Work Orders' }
  ];

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-col py-[2rem] min-h-screen bg-gray-900/[.05] dark:bg-gray-50/[.05]',
    $$props.class
  );
</script>

<nav class={classes} use:events>
  <slot>
    {#each links as { href, text }}
      <NavigationLink {href}>{text}</NavigationLink>
    {/each}
  </slot>
</nav>
