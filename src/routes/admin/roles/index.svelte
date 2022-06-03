<script>
  // imports
  import { InputContainer, Label, Mongodbtable, RouteContainer, Select } from '@components';
  import { getFetchPostData } from '@lib/utilities';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';

  // handlers
  const queryDB = async () => {
    const data = await Promise.all([
      getFetchPostData('/api/db/find', { body: { collection: 'roles' } }),
      getFetchPostData('/api/db/find', { body: { collection: 'routes' } })
    ]);
    roles = data[0];
    routes = data[1];
  };

  // helpers

  // props (internal)
  const columns = [];
  let roleId = '';
  let roles = [];
  let routes = [];

  // props (external)

  // props (dynamic)
  $: roleOptions = [
    { text: '', value: '' },
    ...[...roles].map(({ _id, name }) => {
      return { text: name, value: _id };
    })
  ].sort((a, b) => (a.text < b.text ? -1 : a.text > b.text ? 1 : 0));

  // lifecycle
  onMount(async () => {
    $routeChange = false;
  });
</script>

<RouteContainer title="Roles">
  {#await queryDB() then}
    <InputContainer class="self-start">
      <Label for="role">Role</Label>
      <Select name="role" options={roleOptions} bind:value={roleId} />
    </InputContainer>
  {/await}
</RouteContainer>
