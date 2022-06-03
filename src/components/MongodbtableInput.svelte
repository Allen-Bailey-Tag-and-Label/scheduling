<script>
  // imports
  import { DatatableInput } from '@components';
  import { fetchPost } from '@lib/utilities';
  import { twMerge } from 'tailwind-merge';

  // props (internal)

  // props (external)
  export let changeHandler = async () => {
    // destructure row
    const { _id } = row;

    // create update
    const update = {};
    update[key] = value;

    // update doc
    const response = await fetchPost('/api/db/updateOne', { body: { collection, _id, update } });
  };
  export let collection = '';
  export let key = '';
  export let row = {};
  export let value = '';

  // props (dynamic)
  $: classes = twMerge(
    'rounded-none ring-offset-0 bg-transparent dark:bg-transparent min-w-full',
    $$props.class
  );
</script>

<DatatableInput class={classes} on:change={changeHandler} name={key} bind:value {...$$restProps} />
