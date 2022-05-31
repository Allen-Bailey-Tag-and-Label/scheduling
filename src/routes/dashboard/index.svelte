<script>
  // imports
  import { RouteContainer } from '@components';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';
  
  // handlers
  
  // helpers
  
  // props (internal)
  
  // props (external)
  
  // props (dynamic)
  
  // lifecycle
  onMount(async() => {
    $routeChange = false;
  });
</script>

<RouteContainer title="Dashboard">
</RouteContainer>