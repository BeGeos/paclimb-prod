import { writable } from 'svelte/store';

// Import falesie
import { features } from './files/falesie.json';

export const falesie = writable([]);

const loadFalesie = () => {
	falesie.set(features);
};

loadFalesie();
