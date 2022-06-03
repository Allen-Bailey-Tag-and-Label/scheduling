<script>
  // imports
  import { Td } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let columns = [];
  export let row = {};

  // props (dynamic)
  $: classes = twMerge(
    'odd:bg-gray-900/[.05] transition duration-200 bg-transparent hover:bg-blue-500/[.1] dark:odd:bg-gray-50/[.05] dark:hover:bg-blue-500/[.1]',
    $$props.class
  );
</script>

<tr class={classes} use:events>
  <slot>
    {#each columns as { classes = '', component = undefined, key, type = 'string', ...column }}
      <Td class={classes} let:format {type}>
        {#if component !== undefined}
          <svelte:component this={component} {key} {row} bind:value={row[key]} {...column} />
        {:else}
          {format(row[key])}
        {/if}
      </Td>
    {/each}
  </slot>
</tr>
