<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  let elem;
  const events = getEvents(current_component);
  let style = '';
  let windowWidth;

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'z-[1] rounded-[.25rem] py-[.25rem] px-[.75rem] bg-gray-50 shadow-sm dark:bg-gray-900 absolute top-[-1.5rem] left-1/2 transform transition duration-200 -translate-x-1/2 pointer-events-none scale-[0] group-hover:scale-[1]',
    $$props.class
  );
  $: if (elem || windowWidth) {
    const { left } = elem.getBoundingClientRect();
    const width = elem.offsetWidth;
    style = ` margin-left: ${
      left + width / 2 > windowWidth ? windowWidth - left - width / 2 : 0
    }px`;
  }
</script>

<svelte:window bind:outerWidth={windowWidth} />

<div class={classes} bind:this={elem} {style} use:events>
  <slot />
</div>
