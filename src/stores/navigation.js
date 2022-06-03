import { writable } from 'svelte/store';

const createStore = () => {
  const { subscribe, update } = writable(false);

  // toggle method
  const toggle = () => update((v) => (v = !v));

  return { toggle, subscribe };
};

export default createStore();
