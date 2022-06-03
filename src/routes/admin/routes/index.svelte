<script>
  // imports
  import { Mongodbtable, RouteContainer } from '@components';
  import { getFetchPostData } from '@lib/utilities';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';

  // handlers

  // helpers

  // props (internal)
  const columns = ['group', 'name', 'href'];

  // props (external)

  // props (dynamic)

  // lifecycle
  onMount(async () => {
    $routeChange = false;
  });
</script>

<RouteContainer title="Routes">
  {#await getFetchPostData('/api/db/find', { body: { collection: 'routes' } }) then rows}
    <Mongodbtable collection="routes" {columns} {rows} sortKey={['name', 'group']} />
  {/await}
</RouteContainer>
