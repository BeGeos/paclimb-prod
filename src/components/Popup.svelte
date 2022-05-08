<script>
	export let handleClose;

	export let roadName;
	export let featureName;
	export let featureLink;
	export let show;
	export let x;
	export let y;
</script>

<div
	class={`fixed bg-white bottom-0 left-0 min-w-full max-h-fit translate-y-full z-40 p-2 rounded-md scale-0 pr-6 font-Voltaire lg:min-w-fit lg:bottom-[${y}] lg:left-[${x}]`}
	class:show
>
	<span
		class="absolute right-2 top-1 cursor-pointer text-2xl"
		on:click={(e) => {
			e.stopPropagation();
			handleClose();
		}}>&times;</span
	>
	{#if roadName}
		<h3 class="m-0">{roadName}</h3>
	{/if}
	<div class="flex items-center justify-between gap-4 p-2 border border-black/40 rounded-lg">
		<p class="m-0 text-xl">{featureName}</p>
		<a href={featureLink} class="p-2 shadow-lg rounded-md" target="_blank" rel="noopener noreferrer"
			>To get there</a
		>
	</div>
</div>

<style>
	.show {
		transition: transform 0.3s ease;
		transform: scale(1);
		animation: slideIn 0.2s ease-in forwards;
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			tranform: translateY(0%);
		}
	}
</style>
