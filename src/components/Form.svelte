<script>
  // imports
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';
  
  // props (internal)
  const events = getEvents(current_component);
  
  // props (external)
  
  // props (dynamic)
  $: classes = twMerge('flex flex-col space-y-[2rem]', $$props.class);
</script>

<form class={classes} use:events>
  <slot/>
</form>