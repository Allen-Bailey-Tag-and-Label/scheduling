<script>
  // imports
  import { Button, Icon, Input, Modal, Overlay, Table, Tbody, Td, Tr } from '@components';
  import { Plus, Search, Trash } from '@steeze-ui/heroicons';
  import { getEvents } from '@lib/actions';
  import { current_component } from 'svelte/internal';
  import { scale } from 'svelte/transition';
  import { twMerge } from 'tailwind-merge';

  // handlers
  const modalRemoveClickHandler = async () => {
    await on.remove();
    modal.remove = false;
  };

  // props (internal)
  const events = getEvents(current_component);
  const modal = {
    create: false,
    remove: false
  };

  // props (external)
  export let checkedRows = [];
  export let columns = [];
  export let on = {
    remove: () => {}
  };
  export let search = '';
  export let searchable = true;

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-col-reverse pb-[1rem] lg:flex-row lg:items-center',
    $$props.class
  );
  $: addRows = [...columns].map((column) => {
    column.value = '';
    return column;
  });
</script>

<div class={classes} use:events>
  <slot>
    {#if searchable}
      <div class="relative mt-[1rem] lg:mt-0">
        <Input class="min-w-full" name="search" bind:value={search} />
        <Icon
          class="pointer-events-none absolute right-[.5rem] top-1/2 transform -translate-y-1/2"
          src={Search}
        />
      </div>
    {/if}
    <div class="flex space-x-[.5rem] items-center flex-grow justify-end">
      {#if checkedRows.length > 0}
        <div transition:scale>
          <Button color="error" on:click={() => (modal.remove = true)} size="icon"
            ><Icon src={Trash} /></Button
          >
        </div>
      {/if}
      <Button on:click={() => (modal.create = true)} size="icon"><Icon src={Plus} /></Button>
    </div>
  </slot>
</div>

<!-- MODAL - CREATE -->
<Modal bind:show={modal.create}>
  <svelte:fragment slot="title">Add</svelte:fragment>
  <svelte:fragment slot="body">
    <Table>
      <Tbody>
        {#each addRows as { classes = '', component = undefined, key, title = '', type = 'string', value = '', ...column }}
          <Tr>
            <Td>{title}</Td>
            <Td class={classes} {type}>
              {#if component !== undefined}
                <svelte:component this={component} {key} bind:value {...column} />
              {:else}
                <Input {type} bind:value />
              {/if}
            </Td>
          </Tr>
        {/each}
      </Tbody>
    </Table>
  </svelte:fragment>
</Modal>

<!-- MODAL - REMOVE -->
<Modal bind:show={modal.remove}>
  <div class="selection:bg-red-500" slot="body">
    Are you sure you want to <span
      class="font-bold text-red-500 selection:bg-white selection:text-red-500">delete</span
    >
    {checkedRows.length} row{checkedRows.length !== 1 ? 's' : ''}?
  </div>
  <div class="flex space-x-[.5rem]" slot="buttons">
    <Button
      class="flex-grow"
      color="color-scheme"
      on:click={() => (modal.remove = false)}
      tabindex={!modal.remove ? '-1' : undefined}>Cancel</Button
    >
    <Button
      class="flex-grow"
      color="error"
      on:click={modalRemoveClickHandler}
      tabindex={!modal.remove ? '-1' : undefined}>Delete</Button
    >
  </div>
</Modal>
