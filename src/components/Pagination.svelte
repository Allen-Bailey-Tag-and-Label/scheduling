<script>
  // imports
  import { PaginationButtons, Select } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);
  const options = [
    { text: 1, value: 1 },
    { text: 5, value: 5 },
    { text: 10, value: 10 },
    { text: 25, value: 25 },
    { text: 50, value: 50 },
    { text: 100, value: 100 },
    { text: 'All', value: 999999999 }
  ];

  // props (external)
  export let currentPage = 0;
  export let rowsPerPage = 10;
  export let totalPages = 0;
  export let totalRows = 0;

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-col items-center justify-between max-w-full pt-[1rem] space-y-[1rem] lg:flex-row lg:space-y-0',
    $$props.class
  );
</script>

<div class={classes} use:events>
  <slot>
    <div class="flex items-center space-x-[1rem]">
      <Select {options} bind:value={rowsPerPage} />
      <div class="text-center whitespace-nowrap">
        Showing {currentPage * rowsPerPage + 1} - {Math.min(
          (currentPage + 1) * rowsPerPage,
          totalRows
        )} of {totalRows}
      </div>
    </div>
    <PaginationButtons bind:currentPage bind:rowsPerPage bind:totalPages />
  </slot>
</div>
