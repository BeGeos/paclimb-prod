<script>
	import { createEventDispatcher } from 'svelte';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons/index.es';

	const dispatch = createEventDispatcher();

	const handleCloseResults = () => {
		dispatch('closeFilterResults');
	};

	const viewMap = () => {
		dispatch('viewMap');
	};
</script>

<div class="max-w-full text-2xl lg:text-base flex justify-between items-center">
	<div class="cursor-pointer" on:click={handleCloseResults}>
		<Fa icon={faArrowRight} />
	</div>
	<p
		class="m-0 text-sm cursor-pointer decoration-dotted hover:underline lg:text-base"
		on:click={viewMap}
	>
		View Map
	</p>
</div>
