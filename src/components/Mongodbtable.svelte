<script>
  // imports
  import { Datatable, MongodbtableInput } from '@components';
  import { sanitizeTableColumns } from '@lib/utilities';
  import { onMount } from 'svelte';

  // helpers
  const formatColumn = (arr) => {
    // update columns to component if undefined
    arr = arr.map(({ classes = undefined, component = undefined, type = 'string', ...column }) => {
      // check if no collection provided
      if (column.collection === undefined) column.collection = collection;

      // check if component is undefined
      if (component === undefined) {
        // check if classesis undefined
        if (classes === undefined) classes = 'p-0';

        // update component
        component = MongodbtableInput;
      }

      return { classes, component, type, ...column };
    });

    return arr;
  };

  // props (internal)

  // props (external)
  export let collection = undefined;
  export let columns = [];
  export let onRemove = () => (rows = [...rows].filter(({ __dtCheckbox }) => !__dtCheckbox));
  export let rows = [];

  // props (dynamic)

  // lifecycle
  onMount(async () => {
    columns = formatColumn(sanitizeTableColumns(columns));
  });
</script>

<Datatable bind:columns bind:rows {onRemove} {...$$restProps} />
