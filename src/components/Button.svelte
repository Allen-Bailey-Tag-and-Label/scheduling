<script>
  // imports
  import { getEvents } from '@lib/actions';
  import { getInputClasses } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let color = 'blue';
  export let disabled = false;
  export let rounded = true;
  export let size = 'normal';
  export let type = 'button'

  // props (dynamic)
  $: classes = twMerge(getInputClasses({ color, disabled, rounded, size }), $$props.class);
</script>

<button class={classes} {disabled} {type} use:events>
  <slot />
</button>
