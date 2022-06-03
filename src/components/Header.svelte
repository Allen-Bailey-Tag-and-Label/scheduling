<script>
  // imports
  import { Button, Icon } from '@components';
  import { getEvents } from '@lib/actions';
  import { navigation } from '@stores';
  import { current_component } from 'svelte/internal';
  import { MenuAlt4 } from '@steeze-ui/heroicons';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-row justify-between py-[.25rem] px-[1.5rem] min-w-screen max-w-screen overflow-x-auto bg-gray-900/[.05] dark:bg-gray-50/[.05] min-h-[3.25rem] lg:flex-col lg:px-[.25rem] lg:min-w-0 lg:min-w-[3.25rem] lg:min-h-screen lg:items-start',
    $$props.class
  );
</script>

<header class={classes} use:events>
  <slot>
    <Button
      class="px-[.75rem] bg-transparent dark:bg-transparent ring-offset-0 bg-transparent"
      color="color-scheme"
      on:click={navigation.toggle}><Icon src={MenuAlt4} /></Button
    >
  </slot>
</header>
