<script>
  // imports
  import { goto } from '$app/navigation';
  import { Header, HeadTitle, Overlay, ProgressIndicator, Navigation } from '@components';
  import { getFetchPostData } from '@lib/utilities';
  import { auth, navigation, routeChange } from '@stores';
  import { beforeUpdate } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import '../app.css';

  // handlers

  // helpers

  // props (internal)

  // props (external)

  // props (dynamic)
  $: classes = twMerge(
    'flex flex-col-reverse min-h-screen max-h-screen overflow-hidden lg:flex-row',
    $$props.class
  );
  $: loadingClasses = twMerge(
    'z-[1] absolute flex items-center justify-center top-0 left-0 w-full h-full transition duration-200 bg-gray-50 dark:bg-gray-900',
    !$routeChange ? 'opacity-0 pointer-events-none' : 'opacity-[1] pointer-events-auto'
  );

  // lifecycle
  beforeUpdate(async () => {
    $routeChange = true;
    try {
      const { token } = await getFetchPostData('/api/auth/verify', { body: { token: $auth } });
      auth.signin(token);
    } catch (message) {
      auth.signout();
      goto('/signin');
    }
  });
</script>

<HeadTitle />

<div class={classes}>
  <Header />
  <Overlay show={$navigation} on:click={navigation.toggle} />
  <Navigation />
  <div class="relative max-h-screen overflow-y-auto flex-grow">
    <slot />
    <div class={loadingClasses}>
      <ProgressIndicator />
    </div>
  </div>
</div>
