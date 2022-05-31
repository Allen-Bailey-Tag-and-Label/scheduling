<script>
  // imports
  import { NavigationLink } from '@components';
  import { getEvents } from '@lib/actions';
  import { getFetchPostData } from '@lib/utilities';
  import { auth } from '@stores';
  import { current_component } from 'svelte/internal';
  import { twMerge } from 'tailwind-merge';

  // helpers
  const getUserRoutes = async() => {
    const asdf = await getFetchPostData('/api/auth/routes', { body : { token: $auth } });
    console.log(asdf)
  }

  // props (internal)
  let data = [];
  const events = getEvents(current_component);
  const links = [
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/open-orders', text: 'Open Orders' },
    { href: '/upload', text: 'Upload' },
    { href: '/work-orders', text: 'Work Orders' }
  ];

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-col justify-between py-[2rem] min-h-screen bg-gray-900/[.05] dark:bg-gray-50/[.05]',
    $$props.class
  );
  $: if ($auth) getUserRoutes();
</script>

<nav class={classes} use:events>
  <slot>
    <div class="flex flex-col">
      {#each links as { href, text }}
      <NavigationLink {href}>{text}</NavigationLink>
      {/each}
    </div>
    <NavigationLink on:click={auth.signout} href='/signin'>Logout</NavigationLink>
    </slot>
</nav>
