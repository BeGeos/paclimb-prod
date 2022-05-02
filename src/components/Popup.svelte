<script>
	import { createEventDispatcher } from 'svelte';

	let dispatch = createEventDispatcher();

	const closePopup = () => {
		dispatch('closePopup');
	};

	export let roadName;
	export let featureName;
	export let featureLink;
	export let show;
	export let x;
	export let y;

	$: styles = `top: ${y}px; left: ${x}px`;
</script>

<div class="absolute bg-white z-40 p-2 rounded-md scale-0 pr-6" style={styles} class:show>
	<span class="absolute right-2 top-1 cursor-pointer" on:click={closePopup}>&times;</span>
	{#if roadName}
		<h3 class="m-0">{roadName}</h3>
	{/if}
	<div class="flex items-center justify-between gap-4">
		<p class="m-0">{featureName}</p>
		<a href={featureLink} class="underline" target="_blank" rel="noopener noreferrer"
			>To get there</a
		>
	</div>
</div>

<style>
	.show {
		transition: transform 0.3s ease;
		transform: scale(1);
	}
</style>
