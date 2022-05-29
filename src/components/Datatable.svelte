<script>
  // imports
  import { Icon, Pagination, ProgressIndicator, Table, Tbody, Th, Thead } from '@components';
  import { sanitizeTableColumns } from '@lib/utilities';
  import { ChevronDown } from '@steeze-ui/heroicons';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  // helpers
  const sortRows = (key) => {
    if (!sortable) return;
    sortKey = key;
    if (previousSortKey !== sortKey) sortDirection = 1;
    if (previousSortKey === sortKey) sortDirection = -1 * sortDirection;
    rows = [...rows].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * sortDirection;
      if (a[sortKey] > b[sortKey]) return 1 * sortDirection;
      return 0;
    });
  };

  // props (internal)
  let loaded = false;

  // props (external)
  export let currentPage = 0;
  export let columns = [];
  export let pagination = true;
  export let sortDirection = 1;
  export let sortKey =
    columns.length > 0 &&
    typeof columns[0] === 'object' &&
    !Array.isArray(columns[0]) &&
    columns[0] !== undefined &&
    'key' in columns[0]
      ? columns[0].key
      : undefined;
  export let sortable = true;
  export let rows = [];
  export let rowsPerPage = 10;

  // props (dynamic)
  $: classes = twMerge('flex flex-col', $$props.class);
  $: thClasses = sortable ? 'cursor-pointer hover:text-gray-900 dark:hover:text-gray-50' : '';
  $: if (columns) columns = sanitizeTableColumns(columns);
  $: totalPages = Math.ceil(rows.length / rowsPerPage);
  $: totalRows = rows.length;
  $: if ((currentPage + 1) * rowsPerPage > totalRows) currentPage = totalPages - 1;
  $: previousSortKey = sortKey;
  $: startRowIndex = !pagination ? 0 : rowsPerPage * currentPage;
  $: endRowIndex = !pagination ? rows.length : rowsPerPage * (currentPage + 1);
  $: paginatedRows = [...rows].slice(startRowIndex, endRowIndex);

  // lifecycle
  onMount(async () => {
    previousSortKey = undefined;
    if (typeof sortKey === 'string') sortRows(sortKey);
    if (Array.isArray(sortKey)) {
      const sortKeyArray = sortKey;
      sortKeyArray.map((key) => sortRows(key));
    }
    loaded = true;
  });
</script>

<div class={classes}>
  <slot>
    {#if !loaded}
      <div class="flex items-center justify-center">
        <ProgressIndicator />
      </div>
    {:else}
      <Table>
        <Thead>
          {#each columns as { key, title, type = 'string' }}
            <Th class={thClasses} on:click={() => sortRows(key)} {type}>
              {#if sortable}
                <div class="flex justify-center items-center space-x-[.5rem]">
                  <div>{title}</div>
                  <Icon
                    class="{sortKey === key ? 'scale-[1]' : 'scale-[0]'} {sortDirection === 1
                      ? 'rotate-0'
                      : 'rotate-180'}"
                    src={ChevronDown}
                  />
                </div>
              {:else}
                {title}
              {/if}
            </Th>
          {/each}
        </Thead>
        <Tbody {columns} bind:rows={paginatedRows} />
      </Table>
      {#if pagination && totalPages > 0}
        <Pagination bind:currentPage bind:rowsPerPage bind:totalPages bind:totalRows />
      {/if}
    {/if}
  </slot>
</div>
