<script>
  // imports
  import { Tr } from '@components';
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
  $: classes = twMerge('', $$props.class);
</script>

<tbody class={classes} use:events>
  <slot>
    {#each rows as row}
      <Tr columns={sanitizeTableColumns(columns)} bind:row />
    {/each}
  </slot>
</tbody>
