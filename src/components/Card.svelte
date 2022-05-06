<script>
	import CardLink from './CardLink.svelte';
	import Dot from './icons/Dot.svelte';

	export let data;
	let active;
	let sector;
	let wall;
	let wallLink;
	let A51;
	let parking;
	let parkingLink;
	let park1_road;
	let park1_x;
	let park1_y;
	let parking2;
	let parkingLink2;
	let park2_road;
	let park2_x;
	let park2_y;
	let pgVersante;

	$: if (data) {
		active = true;

		// Wall and guide details
		wall = data.properties.falesia;
		sector = data.properties.Settore != '-' ? data.properties.Settore : wall;
		wallLink = data.properties.link_wall;
		A51 = data.properties.A51_wall != '-' ? data.properties.A51_wall : null;
		pgVersante = data.properties.VSud_wall != '-' ? data.properties.VSud_wall : null;

		// Parking details
		parking = data.properties.park1;
		parkingLink = data.properties.park1_lk;
		park1_road = data.properties.park1_road;
		park1_x = parseFloat(data.properties.park1_x);
		park1_y = parseFloat(data.properties.park1_y);
		parking2 = data.properties.park2 != '-' ? data.properties.park2 : null;
		parkingLink2 = data.properties.park2_lk ? data.properties.park2_lk : null;
		park2_road = data.properties.park2_road;
		park2_x = parseFloat(data.properties.park2_x);
		park2_y = parseFloat(data.properties.park2_y);
	} else {
		active = false;
	}

	$: console.log(data);
</script>

<div
	class="bg-white lg:rounded-lg shadow-xl flex flex-col p-6 gap-4 fixed z-40 bottom-0 left-0 lg:left-[10%] lg:bottom-[25%] max-h-[40%] md:max-h-[38rem] scale-0 overflow-y-auto card-container translate-y-full"
	class:active
>
	<div class="flex justify-between items-center">
		<h3 class="uppercase">{sector}</h3>
		<span class="text-2xl cursor-pointer" on:click={() => (active = !active)}>&times;</span>
	</div>
	<h2>{wall}</h2>
	<div class="p-4 border rounded-lg border-black/40">
		<h5 class="mb-2">Routes & Grades</h5>
		<CardLink link={wallLink} text="Google it!" />
	</div>
	<div class="p-4 border rounded-lg border-black/40">
		<h5 class="mb-2">Climbing Guides</h5>
		<div class="flex font-light gap-4">
			{#if A51}
				<p class="flex-1">Finale 51©</p>
				<p>pag. {A51}</p>
			{/if}
		</div>
		<div class="flex font-light gap-4">
			{#if pgVersante}
				<p class="flex-1">Versante Sud©</p>
				<p>pag. {pgVersante}</p>
			{/if}
		</div>
	</div>
	{#if parking}
		<div class="p-4 border rounded-lg border-black/40 flex flex-col gap-4">
			<h5>Parking</h5>
			<div class="flex gap-4 items-center">
				<Dot road={park1_road} x={park1_x} y={park1_y} on:flyToPark />
				<p class="flex-1 font-light">{parking}</p>
				<CardLink link={parkingLink} text="to get there" />
			</div>
			{#if parking2}
				<div class="flex gap-4 items-center">
					<Dot road={park2_road} x={park2_x} y={park2_y} on:flyToPark />
					<p class="flex-1 font-light">{parking2}</p>
					<CardLink link={parkingLink2} text="to get there" />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	h2,
	h3,
	p {
		margin: 0;
		padding: 0;
	}
	.active {
		transform: scale(1);
		transition: all 0.2s ease;
		animation: slideIn 0.2s ease forwards;
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0%);
		}
	}

	.card-container {
		width: min(100%, 25rem);
	}
</style>
