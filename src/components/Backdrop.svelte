<script>
	export let backdropColor;
	export let opacity;

	let styles = {
		bg: backdropColor,
		opacity: opacity || 0.8
	};

	let cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');
</script>

<div class="absolute inset-0 backdrop -z-10" style={cssVarStyles} />

<style>
	.backdrop {
		background-color: var(--bg, blue);
		opacity: var(--opacity);
		transform: scaleX(10);
	}
</style>
