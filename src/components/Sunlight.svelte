<script>
	// Import utils
	import { parseTimeInterval, getPartOfDay, getStartPosition, getEndPosition } from '@utils';

	export let period;
	export let title;

	let periodStart;
	let periodEnd;
	let periodRatio;
	let periodStartPosition;
	let periodEndPosition;

	$: if (period) {
		[periodStart, periodEnd] = parseTimeInterval(period);
		periodRatio = getPartOfDay(periodStart, periodEnd);
		periodStartPosition = getStartPosition(periodStart);
		periodEndPosition = getEndPosition(periodEnd);
	}
</script>

<div class="flex gap-4 items-center">
	<p class="w-[20%] m-0 font-normal">{title}</p>
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
