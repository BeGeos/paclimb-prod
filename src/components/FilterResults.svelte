<script>
	import { createEventDispatcher } from 'svelte';

	// Font awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowRight } from '@fortawesome/free-solid-svg-icons/index.es';

	// Utils
	import { titleCase } from '@utils';

	export let results;

	const dispatch = createEventDispatcher();

	const handleCloseResults = () => {
		dispatch('closeFilterResults');
	};

	const viewMap = () => {
		dispatch('viewMap');
	};

	const handleFlyFromResults = (e, x, y) => {
		dispatch('flyFromResults', {
			x,
			y
		});
	};

	$: isResultsEmpty = Object.keys(results).length === 0;
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
<div class="my-8">
	{#if !isResultsEmpty}
		{#each Object.entries(results) as [sector, crags]}
			<h4 class="text-lg">{titleCase(sector)}</h4>
			{#each crags as crag}
				<div
					class="min-w-full hover:bg-light-blue cursor-pointer"
					on:click={(e) => handleFlyFromResults(e, crag.x, crag.y)}
				>
					<p class="p-2 m-0 font-normal text-base">{titleCase(crag.name)}</p>
				</div>
			{/each}
			<hr />
		{/each}
	{:else}
		<h3>No crag match your search</h3>
	{/if}
</div>
