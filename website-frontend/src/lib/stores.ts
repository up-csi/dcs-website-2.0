import { writable } from 'svelte/store';

export const reloading = writable(false);
export const searchOpen = writable(false);
export const mobileOpen = writable(false);
export const searchInput = writable('');
export const contentSearchBarInput = writable('');
