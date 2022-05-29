<script>
  // imports
  import { Th } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let columns = [];

  // props (dynamic)
  $: classes = twMerge('', $$props.class);
</script>

<thead class={classes} use:events>
  <slot>
    {#each columns as { classes = '', title, type = 'string' }}
      <Th class={classes} {type}>{title}</Th>
    {/each}
  </slot>
</thead>
