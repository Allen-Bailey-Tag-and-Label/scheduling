<script>
  // imports
  // import {  } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)

  // props (dynamic)
  $: classes = twMerge('spinner-rotate w-[6.25rem] h-[6.25rem]', $$props.class);
</script>

<svg class={classes} viewBox="25 25 50 50" use:events>
  <circle
    class="spinner-dash"
    cx="50"
    cy="50"
    r="20"
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    stroke-miterlimit="10"
  />
</svg>

<style>
  @keyframes spinner-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
  @keyframes spinner-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner-dash {
    animation: spinner-dash 1.5s ease-in-out infinite;
  }
  .spinner-rotate {
    animation: spinner-rotate 2s linear infinite;
  }
</style>
