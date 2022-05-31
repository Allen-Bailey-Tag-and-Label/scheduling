<script>
  // imports
  import { HeadTitle, ProgressIndicator } from '@components';
  import { routeChange } from '@stores';
  import { beforeUpdate } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import '../app.css';

  // handlers

  // helpers

  // props (internal)

  // props (external)

  // props (dynamic)
  $: loadingClasses = twMerge(
    'z-[1] absolute flex items-center justify-center top-0 left-0 w-full h-full transition duration-200 bg-gray-50 dark:bg-gray-900',
    !$routeChange ? 'opacity-0 pointer-events-none' : 'opacity-[1] pointer-events-auto'
  );

  // lifecycle
  beforeUpdate(() => {
    $routeChange = true;
  });
</script>

<HeadTitle />

<div class="flex">
  <div class="relative max-h-screen overflow-y-auto flex-grow">
    <slot />
    <div class={loadingClasses}>
      <ProgressIndicator />
    </div>
  </div>
</div>
