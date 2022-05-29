<script>
  // imports
  import { Dropzone, RouteContainer } from '@components';
  import { getFetchPostData, parseXLSX } from '@lib/utilities';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';

  // handlers
  const openOrdersDropHandler = async (e) => {
    const header = [
      'originator',
      'orderNumber',
      'lineNumber',
      'woNumber',
      'orderType',
      'product',
      'productDescription',
      'holdCode',
      'dealerNumber',
      'dealerName',
      'customerPO',
      'quantity',
      'quantityInInventory',
      'uom',
      'unitPrice',
      'lineType',
      'pricingUOM',
      'extendedPrice',
      'orderDate',
      'proofDate',
      'originalDate',
      'rescheduleDate',
      'shipDate',
      'pressNumber',
      'statusCode',
      'statusDescription',
      'dateMoved'
    ];
    const range = 'A2:AA9999';

    openOrders = await parseXLSX({ e, header, range });
  };
  const routingsDropHandler = async (e) => {
    const header = [
      'operationSequence',
      'businessUnit',
      'description',
      'operationStatus',
      'requestDate',
      'quantityOrdered',
      'standardLabor',
      'actualLabor',
      'remainingLabor',
      'orderDate',
      'woNumber',
      'orderNumber',
      'product',
      'woStatus',
      'productDescription',
      'accountNumber',
      'customerName',
      'dateMoved',
      'currentLocation'
    ];
    routings = await parseXLSX({ e, header });
  };
  const uploadData = async () => {
    if (uploading === false) {
      uploading = true;
      await getFetchPostData('/upload', {
        body: { openOrders, routings }
      });
      openOrders = [];
      routings = [];
      uploading = false;
    }
  };

  // helpers

  // props (internal)
  let openOrders = [];
  let routings = [];
  let uploading = false;

  // props (external)

  // props (dynamic)
  $: if (openOrders.length !== 0 && routings.length !== 0) uploadData();
  $: disabled = {
    openOrders: openOrders.length !== 0,
    routings: routings.length !== 0
  };

  // lifecycle
  onMount(async () => {
    $routeChange = false;
  });
</script>

<svelte:head>
  <title>Upload | Allen-Bailey Tag & Label</title>
</svelte:head>

<RouteContainer title="Upload">
  <div class="flex space-x-[1rem]">
    <Dropzone
      accept=".xlsx"
      class="flex-grow {openOrders.length === 0
        ? ''
        : 'focus:ring-green-500/[.3] bg-green-500/[.1] hover:bg-green-500/[.1] focus:bg-green-500/[.1] dark:bg-green-500/[.1] dark:hover:bg-green-500/[.1] dark:focus:bg-green-500/[.1]'}"
      disabled={disabled.openOrders}
      on:drop={openOrdersDropHandler}
      multiple={false}>Upload / Drop<br />Daily Open Orders Report</Dropzone
    >
    <Dropzone
      accept=".xlsx"
      class="flex-grow {routings.length === 0
        ? ''
        : 'focus:ring-green-500/[.3] bg-green-500/[.1] hover:bg-green-500/[.1] focus:bg-green-500/[.1] dark:bg-green-500/[.1] dark:hover:bg-green-500/[.1] dark:focus:bg-green-500/[.1]'}"
      disabled={disabled.routings}
      on:drop={routingsDropHandler}
      multiple={false}>Upload / Drop<br />Daily Routings Report</Dropzone
    >
  </div>
</RouteContainer>
