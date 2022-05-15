import mapbox from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const addCursorToLayers = (map, layer) => {
	map.on('mouseenter', layer, (e) => {
		map.getCanvas().style.cursor = 'pointer';
	});

	map.on('mouseleave', layer, (e) => {
		map.getCanvas().style.cursor = '';
	});
};

const addFlytTo = (map, layer) => {
	map.on('click', layer, (e) => {
		map.flyTo({
			center: e.features[0].geometry.coordinates,
			zoom: 15
		});
	});
};

export { mapbox, MapboxGeocoder, addCursorToLayers, addFlytTo };
