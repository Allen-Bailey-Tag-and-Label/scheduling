<script>
  // imports
  import { getEvents } from '@lib/actions';
  import { getDataTypeOptions } from '@lib/utilities';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  let dataType;
  const events = getEvents(current_component);

  // props (external)
  export let type = 'string';

  // props (dynamic)
  $: if (type) dataType = getDataTypeOptions(type);
  $: classes = twMerge(
    'transition duration-200 whitespace-nowrap bg-white sticky top-0 px-[1rem] z-[1] py-[.5rem] text-[.875rem] font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-900',
    dataType.classes,
    $$props.class
  );
</script>

<th class={classes} use:events><slot /></th>
