<script>
  // imports
  import { Datatable, RouteContainer, RoutingSteps, Select } from '@components';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';

  // helpers
  const routingFilter = (row) => true;
  const routingMap = (row) => {
    // add totalLabor to props-steps
    row['props-steps'] = { ...row['props-steps'], totalLabor: row.totalLabor };

    return row;
  };
  const routingReduce = (arr, row) => {
    // destructure row
    const { orderNumber, woNumber } = row;

    // find woNumber index
    const woNumberIndex = arr.findIndex((elem) => elem.woNumber === woNumber);

    // add fields
    const propsSteps = {
      actualLabor: row.actualLabor,
      description: row.description,
      operationStatus: row.operationStatus,
      standardLabor: row.standardLabor
    };

    // check if woNumber is not in arr
    if (woNumberIndex === -1) {
      // add fields
      row['props-steps'] = {
        steps: [propsSteps]
      };
      row['props-currentLocation'] = {
        class:
          'py-[.4375rem] rounded-none ring-offset-0 bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent',
        options: currentLocationOptions,
        value: row.currentLocation
      };
      row.totalLabor = row.standardLabor;

      // find orderNumber index
      const orderNumberIndex = openOrders.findIndex((elem) => elem.orderNumber === orderNumber);

      // check if orderNumber is in openOrders
      if (orderNumberIndex !== -1) {
        row.originalDate = openOrders[orderNumberIndex].originalDate;
        row.rescheduleDate = openOrders[orderNumberIndex].rescheduleDate;
      }

      // check if orderNumber is not in openOrders
      if (orderNumberIndex === -1) {
        row.originalDate = row.requestDate;
        row.rescheduleDate = row.requestDate;
      }

      arr.push(row);
    }

    // check if woNumber is in arr
    if (woNumberIndex !== -1) {
      arr[woNumberIndex]['props-steps'].steps.push(propsSteps);
      arr[woNumberIndex].totalLabor += row.standardLabor;
    }

    return arr;
  };

  // props (internal)
  const columns = [
    { key: 'woNumber', title: 'WO Number', type: 'number' },
    { key: 'orderNumber', title: 'Order Number', type: 'number' },
    { key: 'orderDate', title: 'Order Date', type: 'date' },
    { key: 'originalDate', title: 'Original Date', type: 'date' },
    { key: 'rescheduleDate', title: 'Reschedule Date', type: 'date' },
    { key: 'totalLabor', title: 'Total Hours', type: 'number-fixed2' },
    {
      classes: 'text-center p-[1px]',
      component: Select,
      key: 'currentLocation',
      title: 'Current Location',
      type: 'component'
    },
    {
      classes: 'min-w-[300px]',
      component: RoutingSteps,
      key: 'steps',
      title: 'Steps',
      type: 'component'
    }
  ];
  let currentLocationOptions = [];

  // props (external)
  export let openOrders = [];
  export let routings = [];

  // props (dynamic)
  $: if (openOrders)
    currentLocationOptions = [
      ...new Set([...routings].map(({ currentLocation }) => currentLocation))
    ].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  $: rows = [...routings].filter(routingFilter).reduce(routingReduce, []).map(routingMap);

  // lifecycle
  onMount(async () => {
    $routeChange = false;
  });
</script>

<RouteContainer
  class="sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full 2xl:max-w-full"
  title="Work Orders"
>
  <Datatable class="w-full" {columns} {rows} sortKey={['woNumber', 'orderDate']} />
</RouteContainer>
