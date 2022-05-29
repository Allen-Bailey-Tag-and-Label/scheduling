<script>
  // imports
  import { Tooltip } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const barStatusClasses = {
    complete: 'bg-green-500',
    current: 'bg-blue-500',
    future: 'bg-gray-900 dark:bg-gray-50'
  };
  const containerStatusClasses = {
    complete: 'bg-green-500/[.1] ring-green-500',
    current: 'bg-blue-500/[.05] ring-blue-500',
    future: 'bg-gray-900/[.05] ring-gray-600 dark:bg-gray-50/[.05] dark:ring-gray-400'
  };
  const events = getEvents(current_component);

  // props (external)
  export let actualLabor = 0;
  export let operationStatus = 0;
  export let totalLabor = 0;
  export let standardLabor = 0;

  // props (dynamic)
  $: barClasses = twMerge('h-full', barStatusClasses[status]);
  $: barStyle = `width: ${
    totalLabor === 0 || operationStatus === 95
      ? 100
      : Math.min(100, (actualLabor / standardLabor) * 100)
  }%`;
  $: containerClasses = twMerge(
    'rounded-[.25rem] ring-1 h-[1.5rem] group flex',
    containerStatusClasses[status],
    $$props.class
  );
  $: containerStyle = `width: ${totalLabor === 0 ? 100 : (standardLabor / totalLabor) * 100}%`;
  $: status = operationStatus === 0 ? 'future' : operationStatus === 20 ? 'current' : 'complete';
</script>

<div class="relative" style={containerStyle}>
  <div class={containerClasses} use:events>
    <div class={barClasses} style={barStyle} />
    <Tooltip>
      <slot />
    </Tooltip>
  </div>
</div>
