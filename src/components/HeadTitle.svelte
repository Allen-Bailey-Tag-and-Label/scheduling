<script>
  // imports
  import { page } from '$app/stores';

  // props (internal)
  const routeMap = (route) => route.split('-').map(wordMap).join(' ');
  const wordMap = (string) => (string === '' ? 'Home' : string[0].toUpperCase() + string.slice(1));

  // props (external)

  // props (dynamic)
  $: title = [
    ...$page.url.pathname.slice(1).split('/').map(routeMap).reverse(),
    'Employee Online Portal',
    'Allen-Bailey Tag & Label'
  ].join(' - ');
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
