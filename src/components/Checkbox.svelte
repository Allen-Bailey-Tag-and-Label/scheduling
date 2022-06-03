<script>
  // imports
  import { Icon } from '@components';
  import { getEvents } from '@lib/actions';
  import { getInputClasses } from '@lib/utilities';
  import { Check, Minus } from '@steeze-ui/heroicons';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let checked = false;
  export let indeterminate = false;
  export let disabled = false;
  export let rounded = true;
  export let size = 'icon';

  // props (dynamic)
  $: color = !checked && !indeterminate ? 'color-scheme' : 'blue';
  $: classes = twMerge(
    getInputClasses({ color, disabled, rounded, size }),
    'relative flex items-center justify-center cursor-pointer inline-block p-[.25rem] focus-within:ring-blue-500/[.3]',
    $$props.class
  );
</script>

<label class={classes} use:events>
  <slot>
    <input type="checkbox" class="w-0 opacity-0 absolute" bind:checked bind:indeterminate />
    <Icon
      class="transition duration-200 pointer-events-none {!checked ? 'scale-0' : 'scale-[1]'}"
      src={Check}
    />
    <Icon
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform transition duration-200 pointer-events-none {!indeterminate
        ? 'scale-0'
        : 'scale-[1]'}"
      src={Minus}
    />
  </slot>
</label>
