<script>
  // imports
  import { Button, Icon } from '@components';
  import { getEvents } from '@lib/actions';
  import { ChevronDown, ChevronDoubleDown } from '@steeze-ui/heroicons';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const buttonClasses = 'px-[1.25rem]';
  const events = getEvents(current_component);

  // props (external)
  export let currentPage = 0;
  export let totalPages = 0;

  // props (dynamic)
  $: classes = twMerge(
    'flex w-full justify-center items-center space-x-[.5rem] lg:justify-end',
    $$props.class
  );
  $: startIndex = Math.max(currentPage - 2, 0);
  $: endIndex = Math.min(currentPage + 2, totalPages - 1);
</script>

<div class={classes} use:events>
  <slot>
    {#if currentPage !== 0}
      <Button
        class="{buttonClasses} px-[.875rem] py-[.875rem]"
        on:click={() => (currentPage = 0)}
        color={'color-scheme'}><Icon class="rotate-90" src={ChevronDoubleDown} /></Button
      >
      <Button
        class="{buttonClasses} px-[.875rem] py-[.875rem]"
        on:click={() => (currentPage = currentPage - 1)}
        color={'color-scheme'}><Icon class="rotate-90" src={ChevronDown} /></Button
      >
    {/if}
    {#if totalPages > 0}
      {#each Array(Math.min(endIndex - startIndex + 1, 5)) as _, i}
        <Button
          class={twMerge(buttonClasses, startIndex + i !== currentPage ? 'hidden lg:block' : '')}
          on:click={() => (currentPage = startIndex + i)}
          color={startIndex + i !== currentPage ? 'color-scheme' : 'blue'}
          >{startIndex + i + 1}</Button
        >
      {/each}
    {/if}
    {#if currentPage !== totalPages - 1}
      <Button
        class="{buttonClasses} px-[.875rem] py-[.875rem]"
        on:click={() => (currentPage = currentPage + 1)}
        color={'color-scheme'}><Icon class="-rotate-90" src={ChevronDown} /></Button
      >
      <Button
        class="{buttonClasses} px-[.875rem] py-[.875rem]"
        on:click={() => (currentPage = totalPages - 1)}
        color={'color-scheme'}><Icon class="-rotate-90" src={ChevronDoubleDown} /></Button
      >
    {/if}
  </slot>
</div>
