<script>
  // imports
  import { goto } from '$app/navigation';
  import { A, ButtonSubmit, Form, Input, InputContainer, Label, RouteTitle } from '@components';
  import { getFetchPostData } from '@lib/utilities';
  import { auth, routeChange } from '@stores';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  
  // handlers
  const submitHandler = async e => {
    e.preventDefault();
    submitted = true;
    error = undefined;
    try {
      const formData = new FormData(e.target);
      const data = {};
      for (let field of formData) {
        const [key, value] = field;
        data[key] = value;
      }
      const { on, token } = await getFetchPostData('/api/auth/signin', { body : data })
      auth.signin(token)
      goto(on.signin)
      
    } catch (message) {
      error = message;
    }
    submitted = false;
  }
  
  // helpers
  
  // props (internal)
  const inputs = [
    { name: 'username', value: 'bmcaleavey' },
    { name: 'password', type: 'password', value: 'Superma3+' }
  ]
  let error = undefined;
  let submitted = false;
  
  // props (external)
  
  // props (dynamic)
  $:console.log($auth);
  
  // lifecycle
  onMount(async() => {
    $routeChange = false;
  });
</script>

<div class="min-h-screen min-w-screen flex items-center justify-center">
  <Form class="w-full max-w-xs" on:submit={submitHandler}>
    <RouteTitle>Signin</RouteTitle>
    <div class="flex flex-col space-y-[1rem]">
      {#each inputs as { name, type = 'text', value }}
        <InputContainer>
          <Label for={name}>Username</Label>
          <Input error={error !== undefined} {name} {type} bind:value />
        </InputContainer>
      {/each}
    <A class="self-end" href="/forgot-password">Forgot Password</A>
    {#if error !== undefined}
      <div class="text-red-500" transition:slide>{error}</div>
      {/if}
    </div>
    <ButtonSubmit bind:submitted type="submit">Signin</ButtonSubmit>
  </Form>
</div>