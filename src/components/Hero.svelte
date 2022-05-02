<script>
	import WelcomeCard from '../components/WelcomeCard.svelte';
	export let visible;
</script>

<div class="py-8 min-h-screen my-16">
	<WelcomeCard on:openMap {visible} />
</div>
