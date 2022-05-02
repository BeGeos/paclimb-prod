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
	let parking2;
	let parkingLink2;
	let road;
	let pgVersante;

	$: if (data) {
		active = true;
		wall = data.properties.Falesie;
		sector = data.properties.Settore != ' ' ? data.properties.Settore : wall;
		wallLink = data.properties.cerca_Goo2;
		A51 = data.properties.A51eVol != ' ' ? data.properties.A51eVol : null;
		pgVersante = data.properties.Pg_Versant != ' ' ? data.properties.Pg_Versant : null;
		parking = data.properties.Climb_Park;
		parkingLink = data.properties.Link_Park;
		parking2 = data.properties.Climb_par2 != ' ' ? data.properties.Climb_par2 : null;
		parkingLink2 = data.properties.GoogleMap2 ? data.properties.GoogleMap2 : null;
		road = data.properties.ClimbRoad;
	} else {
		active = false;
	}

	$: console.log(data);
</script>

<div
	class="bg-white rounded-lg shadow-xl flex flex-col gap-4 fixed p-6 max-w-[90%] md:min-w-[28rem] scale-0 z-40 top-32 max-h-[38rem] overflow-y-auto"
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
				<Dot {road} />
				<p class="flex-1 font-light">{parking}</p>
				<CardLink link={parkingLink} text="to get there" />
			</div>
			{#if parking2}
				<div class="flex gap-4 items-center">
					<Dot {road} />
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
	h4,
	p {
		margin: 0;
		padding: 0;
	}

	.active {
		transition: transform 0.3s ease;
		transform: scale(1);
	}
</style>
