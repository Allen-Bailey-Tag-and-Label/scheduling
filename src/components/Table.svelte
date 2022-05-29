<script>
  // imports
  import { Tbody, Thead } from '@components';
  import { getEvents } from '@lib/actions';
  import { sanitizeTableColumns } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let columns = [];
  export let rows = [];

  // props (dynamic)
  $: classes = twMerge(
    'relative shadow-md shadow-gray-900/[.1] bg-white dark:bg-gray-900 dark:shadow-gray-900/[.7]',
    $$props.class
  );
</script>

<table class={classes} use:events>
  <slot>
    <Thead columns={sanitizeTableColumns(columns)} />
    <Tbody {columns} {rows} />
  </slot>
</table>
