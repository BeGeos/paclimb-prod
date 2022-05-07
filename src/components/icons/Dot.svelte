<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let road;
	export let x;
	export let y;

	const flyToPark = () => {
		dispatch('flyToPark', {
			x,
			y: y - 0.003
		});
	};

	let mapper = {
		'verezzi road': '#eaf344',
		'perti road': '#38a800',
		'monte sordo road': '#57ceef',
		'boragni road': '#006eff',
		'le manie road': '#ffaa00',
		'capo noli road': '#a800e6',
		'bric road': '#00e6a8'
	};

	$: dotColor = mapper[road.toLowerCase()];

	$: styles = `background-color: ${dotColor}`;
</script>

<div
	class="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-white shadow-3xl flex items-center justify-center cursor-pointer"
	style={styles}
	on:click={flyToPark}
>
	<p class="text-white m-0">P</p>
</div>
