<script>
	import { createEventDispatcher } from 'svelte';
	import WelcomeCard from '../components/WelcomeCard.svelte';
	export let visible;

	const dispatch = createEventDispatcher();

	const openMap = () => {
		dispatch('openMap');
	};
</script>

<div class="py-8 min-h-screen my-16" on:click={openMap}>
	<WelcomeCard {visible} handleOpen={openMap} />
</div>
