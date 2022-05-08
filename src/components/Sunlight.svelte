<script>
	export let period;
	export let title;

	let hoursOfDay = 24;

	let periodStart;
	let periodEnd;
	let periodRatio;
	let periodStartPosition;
	let periodEndPosition;

	const parseTimeInterval = (interval) => {
		if (interval === '-') return [];
		return interval.split('-').map((v) => parseInt(v));
	};

	const getPartOfDay = (start, end) => {
		let delta = end - start;
		if (isNaN(delta)) return 0;
		let ratio = (delta / hoursOfDay) * 100;
		if (ratio === 0) return 1;
		return Math.floor(ratio);
	};

	const getStartPosition = (start) => {
		return (start / hoursOfDay) * 100;
	};

	const getEndPosition = (end) => {
		return (end / hoursOfDay) * 100;
	};

	$: if (period) {
		[periodStart, periodEnd] = parseTimeInterval(period);
		periodRatio = getPartOfDay(periodStart, periodEnd);
		periodStartPosition = getStartPosition(periodStart);
		periodEndPosition = getEndPosition(periodEnd);
		// DEBUG console.log(period, periodStart, periodEnd, periodRatio);
	}
</script>

<div class="flex gap-4 items-center">
	<p class="w-[20%]">{title}</p>
	<div class="h-3.5 flex-1 bg-deep-brown relative">
		{#if periodStart}
			<span class="font-light absolute -top-[140%]" style:left={`${periodStartPosition - 2}%`}
				>{periodStart}</span
			>
		{/if}
		<span
			class="absolute h-full bg-grey-brown"
			style:left={`${periodStartPosition}%`}
			style:width={`${periodRatio}%`}
		>
			<span class="h-full bg-sun-yellow w-[80%] block mx-auto" />
		</span>
		{#if periodStart != periodEnd}
			<span class="font-light absolute -top-[140%]" style:left={`${periodEndPosition}%`}
				>{periodEnd}</span
			>
		{/if}
	</div>
</div>

<style>
	p {
		margin: 0;
		font-weight: 400;
	}
</style>
