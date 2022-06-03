<script>
  // imports
  import { Button, Card, Overlay, Icon } from '@components';
  import { getEvents } from '@lib/actions';
  import { X } from '@steeze-ui/heroicons';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // props (internal)
  const events = getEvents(current_component);

  // props (external)
  export let addOverlay = true;
  export let show = false;
  export let toggleModal = () => (show = !show);

  // props (dynamic)
  $: classes = twMerge(
    'z-[2] fixed p-[1.5rem] top-0 left-0 w-screen h-screen flex items-center justify-center transition duration-200 pointer-events-none',
    !show ? 'opacity-0' : 'opacity-100',
    $$props.class
  );
</script>

{#if addOverlay}
  <Overlay bind:show on:click={toggleModal} />
{/if}
<div class={classes} use:events>
  <slot>
    <Card
      class="max-w-[375px] space-y-[2rem] {!show ? 'pointer-events-none' : 'pointer-events-auto'}"
    >
      <div class="flex items-center justify-between">
        <div class="text-[1.25rem] leading-[1.25rem]"><slot name="title" /></div>
        <Button
          class="px-[.75rem] mr-[-.75rem] bg-transparent dark:bg-transparent ring-offset-0 bg-transparent self-end"
          color="color-scheme"
          on:click={toggleModal}
          tabindex={!show ? '-1' : undefined}><Icon src={X} /></Button
        >
      </div>
      <slot name="body" />
      <slot name="buttons" />
    </Card>
  </slot>
</div>
