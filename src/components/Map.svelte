<script>
	// Svelte dependencies
	import { createEventDispatcher } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	// export let mapImage = '../../static/images/backgroundMap.png';

	// Font Awesome
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/index.es';

	// Components
	// import SearchBar from './SearchBar.svelte';
	import Card from './Card.svelte';
	import Popup from './Popup.svelte';
	import Dashboard from './Dashboard.svelte';

	// JS utils and functions
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import { mapbox, MapboxGeocoder, addCursorToLayers, addFlytTo } from '../utils/mapbox.js';

	// Global variables
	let BASE_STYLE_URL = import.meta.env.VITE_MAPBOX_BASE_STYLE_URL;
	let SATELLITE_ID = import.meta.env.VITE_MAPBOX_SATELLITE_ID;
	let OUTDOOR_ID = import.meta.env.VITE_MAPBOX_OUTDOOR_ID;

	// External variables
	export let lat;
	export let lon;
	export let zoom;
	export let pitch;
	export let bearing;
	export let visible;

	// Internal variables
	let style = `${BASE_STYLE_URL}/${SATELLITE_ID}`;
	let outdoor = false;
	let satellite = true;
	let show = false;
	let interval;
	let container;
	let map;
	let navigationControl;
	let fullScreenControl;
	let geolocateControl;
	let geocoder;
	let dataWalls;
	let geocoderContainer;
	let roadName;
	let featureName;
	let featureLink;
	let x;
	let y;

	let dispatch = createEventDispatcher();

	const returnHome = () => {
		dataWalls = null;
		closePopup();
		dispatch('returnHome');
	};

	const loaded = () => {
		dispatch('loaded');
	};

	const closePopup = () => {
		show = false;
	};

	const addEventFalesie = (map) => {
		map.on('click', 'falesieetichetta5', (e) => {
			dataWalls = e.features[0];
			show = false;
		});
	};

	const addEventParking = (map) => {
		map.on('click', 'park', (e) => {
			return;
		});
	};

	const addPopupOnClick = (map, layer) => {
		map.on('click', layer, (e) => {
			let feature = e.features[0];
			roadName = feature.properties.ClimbRoad;
			featureName = feature.properties.nome_cpark
				? feature.properties.nome_cpark
				: feature.layer.id;
			featureLink = feature.properties.GoogleLink
				? feature.properties.GoogleLink
				: feature.properties.Googl;
			x = e.point.x;
			y = e.point.y;
			show = true;
		});
	};

	const closeCardWhenDrag = (map) => {
		map.on('mousedown', (e) => {
			dataWalls = null;
		});

		map.on('touchstart', (e) => {
			dataWalls = null;
		});
	};

	const addClosePopup = (map) => {
		map.on('mousedown', (e) => {
			if (show) {
				show = false;
			}
		});

		map.on('touchstart', (e) => {
			if (show) {
				show = false;
			}
		});
	};

	const flyToPark = (x, y) => {
		dataWalls = null;
		map.flyTo({
			center: [x, y]
		});
	};

	// TODO
	const forwardGeocoder = (query) => {
		const matchingFeatures = [];
		for (const feature of customData.features) {
			// Handle queries with different capitalization
			// than the source data by calling toLowerCase().
			if (feature.properties.title.toLowerCase().includes(query.toLowerCase())) {
				feature['place_name'] = `🏔 ${feature.properties.title}`;
				feature['center'] = feature.geometry.coordinates;
				feature['place_type'] = ['crag'];
				matchingFeatures.push(feature);
			}
		}
		return matchingFeatures;
	};

	const checkLoadedMap = (map) => {
		if (map.loaded()) {
			clearInterval(interval);
			return loaded();
		}
	};

	// Map logic
	const createMap = () => {
		// Add map
		map = new mapbox.Map({
			container,
			style,
			center: [lon, lat],
			zoom,
			pitch,
			bearing
		});

		// Introducing controls
		navigationControl = new mapbox.NavigationControl();
		fullScreenControl = new mapbox.FullscreenControl();
		geolocateControl = new mapbox.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			// When active the map will receive updates to the device's location as it changes.
			trackUserLocation: true,
			// Draw an arrow next to the location dot to indicate which direction the device is heading.
			showUserHeading: true
		});
		geocoder = new MapboxGeocoder({
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			placeholder: 'Search...',
			zoom: 15,
			mapboxgl: mapbox
		});

		closeCardWhenDrag(map);
		addClosePopup(map);

		// Adding event on click for popups
		addEventFalesie(map);
		addEventParking(map);

		// Change layer cursor when hover
		addCursorToLayers(map, 'falesieetichetta5');
		addCursorToLayers(map, 'castel_finalborgo');
		addCursorToLayers(map, 'park');
		addCursorToLayers(map, 'settoribiglabel');

		// Add animation to fly to location when clicked on layer
		addFlytTo(map, 'settoribiglabel');

		// Add popups to layers
		addPopupOnClick(map, 'castel_finalborgo');
		addPopupOnClick(map, 'park');

		interval = setInterval(checkLoadedMap, 150, map);
	};

	const addControls = () => {
		// Add geolocate control on map
		if (map) {
			map.addControl(geolocateControl);

			// Add the control to the map.
			map.addControl(fullScreenControl);
			map.addControl(navigationControl);

			geocoderContainer.appendChild(geocoder.onAdd(map));
		}
	};

	const removeControls = () => {
		if (geolocateControl && fullScreenControl && navigationControl && geocoder) {
			// Remove controls
			map.removeControl(geolocateControl);
			map.removeControl(fullScreenControl);
			map.removeControl(navigationControl);
			map.removeControl(geocoder);
		}
	};

	const changeStyle = (option) => {
		outdoor = !outdoor;
		satellite = !satellite;
		if (option === 'satellite') {
			map.setStyle(`${BASE_STYLE_URL}/${SATELLITE_ID}`);
		}

		if (option === 'outdoor') {
			map.setStyle(`${BASE_STYLE_URL}/${OUTDOOR_ID}`);
		}
		return;
	};

	onMount(() => {
		createMap();
	});

	onDestroy(() => {
		if (map) map.remove();
	});

	// Reactive variables
	$: {
		if (visible) {
			addControls();
		} else {
			removeControls();
		}
	}
</script>

<div
	class="fixed inset-0 max-h-screen z-10 max-w-[100vw] bg-white -z-20"
	class:isForeground={visible}
>
	<!-- <img src={mapImage} alt="background-map" class="min-w-full object-cover" /> -->
	<Dashboard {visible}>
		<!-- <SearchBar /> -->
		<div class="absolute bottom-10 left-5" class:light={satellite} class:dark={outdoor}>
			<button class="py-2 px-4" class:active={satellite} on:click={() => changeStyle('satellite')}
				>Satellite</button
			>
			<button class="py-2 px-4" class:active={outdoor} on:click={() => changeStyle('outdoor')}
				>Outdoor</button
			>
		</div>
		<div class="absolute bottom-10 right-5" class:light={satellite} class:dark={outdoor}>
			<button class="flex items-center gap-4 md:text-2xl" on:click={returnHome}>
				<Fa icon={faArrowLeft} />
				<span class="hidden md:block">Return Home</span>
			</button>
		</div>
	</Dashboard>
	<div bind:this={container} class="absolute inset-0 -z-10">
		{#if map}
			<div
				id="geocoder"
				class="absolute left-[50%] top-5 -translate-x-2/4"
				bind:this={geocoderContainer}
			/>
			<slot />
		{/if}
	</div>
</div>

<Card
	data={dataWalls}
	on:flyToPark={(e) => {
		let x = e.detail.x;
		let y = e.detail.y;
		flyToPark(x, y);
	}}
/>
<Popup {roadName} {featureName} {featureLink} {show} {x} {y} handleClose={closePopup} />

<style>
	.active {
		background-color: var(--clr-primary);
		border-radius: 0.5rem;
		border: none;
		color: white;
		box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
	}

	.isForeground {
		z-index: 20;
	}

	.light {
		color: white;
	}

	.dark {
		color: black;
	}
</style>
