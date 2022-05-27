<script>
	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/index.es';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('closeFilters');
	};

	export let active;
</script>

<div
	class="fixed inset-0 rounded-r-lg rounded-b-lg bg-white shadow-lg p-4 -translate-x-full overflow-y-auto transition-transform md:max-w-md lg:max-h-[28rem] z-40"
	class:active
>
	<div class="flex justify-between items-center">
		<h2 class="font-bold m-0">Add Filter</h2>
		<span on:click={handleClose}>
			<Fa icon={faArrowLeft} size="2x" />
		</span>
	</div>
	<div class="my-4 flex flex-col gap-6">
		<div>
			<h5>Exposure</h5>
			<p>This is the filter for exposure</p>
		</div>
		<div>
			<h5>Sunlight</h5>
			<p>This is the filter for sunlight</p>
		</div>
	</div>
</div>

<style>
	.active {
		transform: translateX(0);
		transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
</style>
