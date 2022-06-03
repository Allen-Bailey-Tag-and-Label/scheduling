<script>
  // imports
  import { Checkbox } from '@components';
  import { twMerge } from 'tailwind-merge';

  // props (internal)

  // props (external)
  export let value = false;

  // props (dynamic)
  $: classes = twMerge('', $$props.class);
</script>

<Checkbox class={classes} bind:checked={value} {...$$restProps} />
