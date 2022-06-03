<script>
  // imports
  import { Input } from '@components';
  import { twMerge } from 'tailwind-merge';

  // handlers

  // props (internal)
  let focused = false;

  // props (external)
  export let key = '';
  export let value = '';

  // props (dynamic)
  $: classes = twMerge(
    'rounded-none ring-offset-0 bg-transparent dark:bg-transparent min-w-full py-[.5rem]',
    $$props.class
  );
</script>

<Input
  class={classes}
  name={key}
  on:blur={() => (focused = false)}
  on:change
  on:focus={() => (focused = true)}
  bind:value
  {...$$restProps}
/>
