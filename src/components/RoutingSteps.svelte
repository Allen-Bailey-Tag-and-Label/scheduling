<script>
  // imports
  import { RoutingStep } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let steps = [];
  export let totalLabor = 0;

  // props (dynamic)
  $: classes = twMerge('flex items-center space-x-[3px]', $$props.class);
</script>

<div class={classes} use:events>
  <slot>
    {#each steps as step}
      <RoutingStep {...step} {totalLabor}
        >{step.description} - {step.actualLabor}/{step.standardLabor}</RoutingStep
      >
    {/each}
  </slot>
</div>
