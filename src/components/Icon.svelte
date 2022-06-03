<script>
  // imports
  import { Icon } from '@steeze-ui/svelte-icon';
  import { twMerge } from 'tailwind-merge';

  // props (internal)

  // props (external)
  export let theme = 'solid';
  export let src;

  // props (dynamic)
  $: classes = twMerge('block transform transition duration-200 w-[20px] h-[20px]', $$props.class);
</script>

<Icon class={classes} {src} {theme} />
