<script>
  // imports
  import {
    Checkbox,
    DatatableCheckbox,
    DatatableInput,
    DatatableTopbar,
    Icon,
    Pagination,
    ProgressIndicator,
    Table,
    Tbody,
    Th,
    Thead
  } from '@components';
  import { sanitizeTableColumns } from '@lib/utilities';
  import { ChevronDown } from '@steeze-ui/heroicons';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  // handlers
  const checkboxClickHandler = (e) => {
    e.stopPropagation();
    paginatedRows = [...paginatedRows].map((row) => {
      row.__dtCheckbox = e.target.checked;
      return row;
    });
  };

  // helpers
  const formatColumns = (arr) => {
    // initiate checkbox column
    const checkboxColumn = {
      classes: 'max-w-[2.5rem] min-w-[2.5rem] py-0 text-center',
      component: DatatableCheckbox,
      key: '__dtCheckbox',
      title: ''
    };

    // update columns to component if undefined
    arr = arr.map(({ classes = undefined, component = undefined, type = 'string', ...column }) => {
      // check if component is undefined
      if (component === undefined) {
        // check if classesis undefined
        if (classes === undefined) classes = 'p-0';

        // update component
        component = DatatableInput;
      }

      return { classes, component, type, ...column };
    });

    // merge checkboxColumn and initial columns
    return [checkboxColumn, ...arr];
  };
  const formatColumnsRows = (arr) =>
    arr.map((row) => {
      return { __dtCheckbox: false, ...row };
    });
  const getFilteredRows = () =>
    [...rows].filter((row) => new RegExp(search, 'i').test(JSON.stringify(row)));
  const sortRows = (key) => {
    if (!sortable) return;
    sortKey = key;
    if (previousSortKey !== sortKey) sortDirection = 1;
    if (previousSortKey === sortKey) sortDirection = -1 * sortDirection;
    rows = [...rows].sort((a, b) => {
      if (a?.[sortKey] === undefined) return 1 * sortDirection;
      if (b?.[sortKey] === undefined) return -1 * sortDirection;
      if (a?.[sortKey] < b?.[sortKey]) return -1 * sortDirection;
      if (a?.[sortKey] > b?.[sortKey]) return 1 * sortDirection;
      return 0;
    });
  };
  const updateCheckbox = () => {
    // reset checkbox
    checkboxChecked = false;
    checkboxIndeterminate = false;

    // all rows checked
    if (paginatedRows.length === checkedRows.length) checkboxChecked = true;

    // indeterminate rows checked
    if (checkedRows.length !== 0 && checkedRows.length < paginatedRows.length)
      checkboxIndeterminate = true;
  };

  // props (internal)
  let checkboxChecked = false;
  let checkboxIndeterminate = false;
  let loaded = false;
  let search = '';

  // props (external)
  export let currentPage = 0;
  export let columns = [];
  export let onRemove = () => (rows = [...rows].filter(({ __dtCheckbox }) => !__dtCheckbox));
  export let pagination = true;
  export let searchable = true;
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
  $: filteredRows = !searchable || search === '' ? rows : getFilteredRows();
  $: totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  $: totalRows = filteredRows.length;
  $: if ((currentPage + 1) * rowsPerPage > totalRows) currentPage = totalPages - 1;
  $: if (currentPage < 0) currentPage = 0;
  $: previousSortKey = sortKey;
  $: startRowIndex = !pagination ? 0 : rowsPerPage * currentPage;
  $: endRowIndex = !pagination ? filteredRows.length : rowsPerPage * (currentPage + 1);
  $: paginatedRows = [...filteredRows].slice(startRowIndex, endRowIndex);
  $: checkedRows = [...paginatedRows].filter(({ __dtCheckbox }) => __dtCheckbox);
  $: if (paginatedRows) updateCheckbox();
  $: on = { remove: onRemove };
  $: console.log(columns);

  // lifecycle
  onMount(async () => {
    previousSortKey = undefined;
    if (typeof sortKey === 'string') sortRows(sortKey);
    if (Array.isArray(sortKey)) {
      const sortKeyArray = sortKey;
      sortKeyArray.map((key) => sortRows(key));
    }
    columns = formatColumns(sanitizeTableColumns(columns));
    rows = formatColumnsRows(rows);
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
      <DatatableTopbar {checkedRows} {columns} {on} {searchable} bind:search />
      <div class="min-h-[14.8125rem] resize lg:min-h-[27.3125rem]">
        <Table>
          <Thead>
            {#each columns as { key, title, type = 'string' }}
              <Th
                class={twMerge(
                  thClasses,
                  key === '__dtCheckbox' ? 'resize-none p-0 max-w-[2.25rem] min-w-[2.25rem]' : ''
                )}
                on:click={() => {
                  if (key !== '__dtCheckbox') sortRows(key);
                }}
                {type}
              >
                {#if key === '__dtCheckbox'}
                  <Checkbox
                    bind:checked={checkboxChecked}
                    bind:indeterminate={checkboxIndeterminate}
                    on:change={checkboxClickHandler}
                  />
                {:else if sortable}
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
      </div>
      {#if pagination && totalPages > 0}
        <Pagination bind:currentPage bind:rowsPerPage bind:totalPages bind:totalRows />
      {/if}
    {/if}
  </slot>
</div>
