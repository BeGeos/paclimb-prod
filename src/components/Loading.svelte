<script>
	export let loading;
</script>

{#if loading}
	<div class="fixed inset-0 z-50 bg-white flex items-center justify-center">
		<div>Loading...</div>
		<div class="h-5 w-5 rounded-full animate-spin border-t-4 border-t-sky-blue" />
	</div>
{/if}
