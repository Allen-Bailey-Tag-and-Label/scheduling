<script>
  // imports
  import { Button, Icon, NavigationGroup, NavigationLink } from '@components';
  import { getEvents } from '@lib/actions';
  import { getFetchPostData } from '@lib/utilities';
  import { auth, navigation } from '@stores';
  import { X } from '@steeze-ui/heroicons';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // helpers
  const getUserRoutes = async () =>
    ({ routes } = await getFetchPostData('/api/auth/routes', { body: { token: $auth } }));
  const groupRoutes = () =>
    routes
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
      .reduce((obj, route) => {
        // check if group not in route
        if (!('group' in route)) route.group = '';

        // check for existing group
        if (!(route.group in obj)) obj[route.group] = [];

        // add route to group
        obj[route.group].push(route);

        return obj;
      }, {});

  // props (internal)
  let groups = [];
  let routes = [];
  const events = getEvents(current_component);

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'fixed z-[2] top-0 left-0 flex flex-col justify-between py-[.25rem] min-h-screen max-h-screen overflow-y-hidden bg-gray-50 dark:bg-gray-900 transform transition duration-200 lg:flex-col-reverse',
    $navigation ? 'translate-x-0' : '-translate-x-full',
    $$props.class
  );
  $: if ($auth) getUserRoutes();
  $: if (routes) groups = groupRoutes();
</script>

<nav class={classes} use:events>
  <slot>
    <div class="flex flex-col space-y-[1rem] flex-grow overflow-y-auto">
      {#each Object.keys(groups).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)) as group}
        <div class="flex flex-col">
          {#if group !== ''}
            <NavigationGroup>{group}</NavigationGroup>
          {/if}
          {#each groups[group] as { href, name }}
            <NavigationLink
              on:click={navigation.toggle}
              {href}
              tabindex={$navigation ? undefined : '-1'}>{name}</NavigationLink
            >
          {/each}
        </div>
      {/each}
      <NavigationLink
        on:click={() => {
          navigation.toggle();
          auth.signout();
        }}
        href="/signin"
        tabindex={$navigation ? undefined : '-1'}>Logout</NavigationLink
      >
    </div>
    <div class="px-[1.5rem]">
      <Button
        class="px-[.75rem] self-start ring-offset-0 bg-transparent ml-[-.75rem] lg:ml-[-1.25rem]"
        color="color-scheme"
        on:click={navigation.toggle}
        tabindex={$navigation ? undefined : '-1'}><Icon src={X} /></Button
      >
    </div>
  </slot>
</nav>
