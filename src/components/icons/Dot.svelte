<script>
	export let road;

	let mapper = {
		'verezzi road': '#eaf344',
		'perti road': '#38a800',
		'monte sordo road': '#57ceef',
		'ca de alice road': '#00e6a8',
		'boragni road': '#006eff',
		'le manie road': '#ffaa00',
		'capo noli road': '#a800e6'
	};

	$: dotColor = mapper[road.toLowerCase()];

	$: styles = `background-color: ${dotColor}`;
</script>

<div
	class="w-[1.5rem] h-[1.5rem] rounded-full border-2 border-white shadow flex items-center justify-center cursor-pointer"
	style={styles}
>
	<p class="text-white m-0">P</p>
</div>
