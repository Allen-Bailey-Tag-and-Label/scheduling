<script>
  // imports
  import { goto } from '$app/navigation';
  import { A, ButtonSubmit, Form, Input, InputContainer, Label, RouteTitle } from '@components';
  import { getFetchPostData } from '@lib/utilities';
  import { routeChange } from '@stores';
  import { onMount } from 'svelte';
  
  // handlers
  const submitHandler = async e => {
    e.preventDefault();
    submitted = true;
    try {
      const user = await getFetchPostData('/api/forgot-password', {body : {username}})
      
    } catch (message) {
    }
    submitted = false;
  }
  
  // helpers
  
  // props (internal)
  let submitted = false;
  let username = 'bmcaleavey';
  
  // props (external)
  
  // props (dynamic)
  
  // lifecycle
  onMount(async() => {
    $routeChange = false;
  });
</script>

<div class="min-h-screen min-w-screen flex items-center justify-center">
  <Form class="w-full max-w-xs" on:submit={submitHandler}>
    <RouteTitle>Forgot Password</RouteTitle>
    <div class="flex flex-col space-y-[1rem]">
      <InputContainer>
      <Label>Username</Label>
      <Input bind:value={username} />
    </InputContainer>
    <A class="self-end" href="/signin">Signin</A>
    </div>
    <ButtonSubmit bind:submitted type="submit">Request Password Reset</ButtonSubmit>
  </Form>
</div>