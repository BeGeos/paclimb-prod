<script>
	import { createEventDispatcher } from 'svelte';
	import WelcomeCard from '@components/WelcomeCard.svelte';

	const dispatch = createEventDispatcher();

	export let visible;

	const openMap = () => {
		dispatch('openMap');
	};
</script>

<div class="py-8 min-h-screen my-16" on:click={openMap}>
	<WelcomeCard {visible} handleOpen={openMap} />
</div>
