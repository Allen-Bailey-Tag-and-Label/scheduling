<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';
  
  // props (internal)
  const events = getEvents(current_component);
  
  // props (external)
  export let href = '/';
  
  // props (dynamic)
  $: classes = twMerge('relative outline-none',
  'before:absolute before:rounded-[.25rem] before:w-[calc(100%+16px)] before:bottom-[-4px] before:h-[calc(100%+8px)] before:ring before:ring-transparent before:transiton before:duration-200 before:ml-[-8px] focus:before:ring-blue-500/[.3]',
  'after:absolute hover:after:bg-blue-600 focus:after:bg-blue-600 after:w-full after:bottom-[-4px] after:h-[1px] after:bg-blue-500 after:left-0 after:transition-all after:duration-200 hover:after:h-[calc(100%+8px)] hover:after:w-[calc(100%+16px)] hover:after:ml-[-8px] hover:after:rounded-[.25rem] after:z-[-1] focus:after:h-[calc(100%+8px)] focus:after:w-[calc(100%+16px)] focus:after:ml-[-8px] focus:after:rounded-[.25rem]',$$props.class);
</script>

<a class={classes} {href} use:events>
  <slot/>
</a>