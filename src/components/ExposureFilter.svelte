<script>
	export let name;
	export let exposure;
	export let top = 'auto';
	export let bottom = 'auto';
	export let right = 'auto';
	export let left = 'auto';
	export let translate = '';

	let primaryExposure = ['N', 'S', 'E', 'W'];

	let sizeClass = primaryExposure.includes(exposure)
		? 'primary-btn-exposure'
		: 'secondary-btn-exposure';
</script>

<label class="block absolute" style:top style:left style:right style:bottom>
	<!-- <input type="hidden" {name} value="False" /> -->
	<input type="checkbox" {name} value="true" class="hidden peer" />
	<span
		class={`block select-none border border-black/40 peer-checked:bg-sky-blue peer-checked:text-white peer-checked:border-none ${sizeClass}`}
		style:transform={`translate${translate}`}>{exposure}</span
	>
</label>
