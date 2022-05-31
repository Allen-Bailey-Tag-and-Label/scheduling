import { browser } from '$app/env';
import { writable } from 'svelte/store';

const createStore = () => {
  // get localstorage current value
  const initialValue = browser ? localStorage.getItem('auth') || '' : '';

  // destructure svelte store
  const { set, subscribe } = writable(initialValue);

  // signin method
  const signin = token => set(token);

  // signout method
  const signout = () => set('');

  // update subscribe method
  subscribe(v => {
    if (browser) localStorage.setItem('auth', v);
  })

  return {
    signin, signout, subscribe
  }
}

export default createStore();