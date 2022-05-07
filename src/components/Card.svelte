<script>
	import { onMount } from 'svelte';

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

	let slider;
	let small = true;
	let medium = false;
	let large = false;
	let touchstartY = 0;
	let touchendY = 0;

	// Utils functions
	const handleSwipe = () => {
		if (touchendY < touchstartY) {
			if (small) {
				small = false;
				medium = true;
				large = false;
			} else if (medium) {
				small = false;
				medium = false;
				large = true;
			} else {
				return;
			}
		}

		if (touchendY > touchstartY) {
			if (small) {
				return;
			} else if (medium) {
				small = true;
				medium = false;
				large = false;
			} else {
				small = false;
				medium = true;
				large = false;
			}
		}
	};

	const changeSize = () => {
		small = !small;
		medium = !medium;
	};

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

	onMount(() => {
		slider.addEventListener(
			'touchstart',
			(e) => {
				touchstartY = e.changedTouches[0].screenY;
			},
			false
		);

		slider.addEventListener(
			'touchend',
			(e) => {
				touchendY = e.changedTouches[0].screenY;
				handleSwipe();
			},
			false
		);
	});
</script>

<div
	class="fixed bottom-0 left-0 text-sm font-Voltaire bg-white rounded-lg rounded-b-none shadow-xl flex flex-col gap-4 p-6 z-40 scale-0 overflow-y-auto translate-y-full lg:rounded-b-lg lg:left-[10%] lg:bottom-[25%] lg:text-base card-container"
	class:active
	class:small
	class:medium
	class:large
	id="card"
>
	<div class="fixed top-0 left-0 min-w-full h-8 lg:hidden" id="slider" bind:this={slider} />
	<div class="flex justify-between items-center">
		<h3 class="uppercase">{sector}</h3>
		<span
			class="text-2xl cursor-pointer"
			on:click={() => {
				active = !active;
				small = true;
				medium = false;
				large = false;
			}}>&times;</span
		>
	</div>
	<h2>{wall}</h2>
	{#if parking}
		<div class="p-4 border rounded-lg border-black/40 flex flex-col gap-4" id="parking">
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
	<div class="p-4 border rounded-lg border-black/40" id="routes">
		<h5 class="mb-2">Routes & Grades</h5>
		<CardLink link={wallLink} text="Google it!" />
	</div>
	<div class="p-4 border rounded-lg border-black/40" id="guides">
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
</div>

<style>
	/* Global Styles */
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

	.card-container {
		width: 100%;
	}

	/* Responsive Card Styles */
	#slider::after {
		content: '';
		position: absolute;
		display: block;
		height: 0.375rem;
		width: 3rem;
		border-radius: 100vw;
		background-color: rgba(0, 0, 0, 0.3);
		margin: 0.3rem auto;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.small {
		max-height: 30%;
	}

	.small #guides,
	.small #parking,
	.small #routes {
		opacity: 0;
		transform: scale(0);
		display: none;
	}

	.medium {
		max-height: 50%;
	}

	.medium #guides,
	.medium #parking,
	.medium #routes {
		opacity: 1;
		transform: scale(1);
		display: '';
	}

	.large {
		max-height: 80%;
	}

	@media (min-width: 1024px) {
		.card-container {
			width: min(90%, 25rem);
		}

		#card::after {
			display: none;
		}

		.small,
		.medium,
		.large {
			max-height: 38rem;
		}

		.small #guides,
		.medium #guides,
		.small #parking,
		.medium #parking,
		.small #routes,
		.medium #routes {
			display: block;
			opacity: 1;
			transform: scale(1);
		}

		.small #parking,
		.medium #parking {
			display: flex;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0%);
		}
	}
</style>
