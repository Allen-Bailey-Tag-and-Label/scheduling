<script>
  // imports
  import { Button, ProgressIndicator } from '@components';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';
  
  // props (internal)
  const events = getEvents(current_component);
  
  // props (external)
  export let submitted = false;
  
  // props (dynamic)
  $: classes = twMerge('', $$props.class);
  $: disabled = submitted;
</script>

<Button class={classes} {disabled} type="submit">
  <div class="flex items-center justify-center relative">
    <div class="transition duration-200 {submitted ? 'opacity-0' : 'opacity-100'}">
      <slot/>
    </div>
    <ProgressIndicator class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1.5rem] h-[1.5rem] transition duration-200 {!submitted ? 'opacity-0' : 'opacity-100'}" />
  </div>
</Button>