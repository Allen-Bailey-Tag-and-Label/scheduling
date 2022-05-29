<script>
  // imports
  import { Container, RouteTitle } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let title = '';

  // props (dynamic)
  $: classes = twMerge('', $$props.class);
</script>

<Container class={classes}>
  <div class="flex flex-col space-y-[1rem]">
    <RouteTitle>{title}</RouteTitle>
    <slot />
  </div>
</Container>
