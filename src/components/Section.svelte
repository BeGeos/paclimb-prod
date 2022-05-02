<script>
	export let id;
	export let position;
</script>

<section
	{id}
	class="py-8 min-h-screen"
	class:fixed={position === 'fixed'}
	class:relative={position === 'relative'}
>
	<slot />
</section>

<style>
	.fixed {
		position: fixed;
		inset: 0;
		z-index: 20;
	}
</style>
