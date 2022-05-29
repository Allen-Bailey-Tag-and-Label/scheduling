<script>
  // imports
  import { getEvents } from '@lib/actions';
  import { getInputClasses } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let color = 'color-scheme';
  export let disabled = false;
  export let options = [];
  export let rounded = true;
  export let size = 'normal';
  export let value = '';

  // props (dynamic)
  $: if (options) {
    options = options.map((option) => {
      if (typeof option === 'string') return { text: option, value: option };
      return option;
    });
  }
  $: classes = twMerge(
    getInputClasses({ color, disabled, rounded, size }),
    'cursor-pointer',
    $$props.class
  );
</script>

<select class={classes} {disabled} bind:value use:events>
  <slot>
    {#each options as { text, value: optionValue }}
      <option selected={value === optionValue} value={optionValue}>{text}</option>
    {/each}
  </slot>
</select>
