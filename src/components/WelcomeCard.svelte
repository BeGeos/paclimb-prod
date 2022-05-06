<script>
	export let visible;
	export let handleOpen;
</script>

<div
	class="max-w-[90%] md:max-w-xl mx-auto rounded-lg bg-white/80 text-center p-8 my-16 scale-0 shadow-2xl"
	class:visible
	on:click={(e) => e.stopPropagation()}
>
	<h4 class="text-xl mb-2 font-bold">Hi Climbers!</h4>
	<p class="mb-6 font-normal">
		Here you can look for and explore all the crags in Finale Ligure. This area is very disorienting
		but once inside the map you will have an overall point of view.
	</p>
	<h1 class="md:text-5xl text-3xl font-bold cursor-pointer" on:click={handleOpen}>
		Explore the 3D Map!
	</h1>
</div>

<style>
	.visible {
		transform: scale(1);
	}
</style>
