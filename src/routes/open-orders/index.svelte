<script>
  // imports
  import { Datatable, RouteContainer } from '@components';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';

  // helpers
  const openOrdersReduce = (arr, row) => {
    // destructure row
    const { orderNumber } = row;

    // add item count
    row.totalItems = 1;

    // find orderNumber
    const orderNumberIndex = arr.findIndex((elem) => elem.orderNumber === orderNumber);

    // check if orderNumber is not in arr
    if (orderNumberIndex === -1) arr.push(row);

    // check if orderNumber is in arr
    if (orderNumberIndex !== -1) {
      arr[orderNumberIndex].totalItems++;
      arr[orderNumberIndex].extendedPrice += row.extendedPrice;
    }

    return arr;
  };

  // props (internal)
  const columns = [
    { classes: 'text-center', key: 'orderType', title: 'Order Type', type: 'string' },
    { key: 'orderNumber', title: 'Order Number', type: 'number' },
    { key: 'totalItems', title: 'Total Items', type: 'number' },
    { key: 'extendedPrice', title: 'Extend Price', type: 'currency' },
    { key: 'orderDate', title: 'Order Date', type: 'date' },
    { key: 'originalDate', title: 'Original Date', type: 'date' },
    { key: 'rescheduleDate', title: 'Reschedule Date', type: 'date' }
  ];

  // props (external)
  export let openOrders = [];

  // props (dynamic)
  $: rows = [...openOrders].reduce(openOrdersReduce, []);

  // lifecycle
  onMount(async () => {
    $routeChange = false;
  });
</script>

<svelte:head>
  <title>Open Orders | Allen-Bailey Tag & Label</title>
</svelte:head>

<RouteContainer
  class="sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full 2xl:max-w-full"
  title="Open Orders"
>
  <Datatable class="w-full" {columns} {rows} />
</RouteContainer>
