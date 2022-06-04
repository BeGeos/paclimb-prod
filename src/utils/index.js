export const parseTimeInterval = (interval) => {
	if (interval === '-') return [];
	return interval.split('-').map((v) => parseInt(v));
};

export const getPartOfDay = (start, end, hoursOfDay = 24) => {
	let delta = end - start;
	if (isNaN(delta)) return 0;
	let ratio = (delta / hoursOfDay) * 100;
	if (ratio === 0) return 1;
	return Math.floor(ratio);
};

export const getStartPosition = (start, hoursOfDay = 24) => {
	return (start / hoursOfDay) * 100;
};

export const getEndPosition = (end, hoursOfDay = 24) => {
	return (end / hoursOfDay) * 100;
};

export const titleCase = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatFilterFormData = (data) => {
	return {
		area: data.get('area'),
		timeOfyear: {
			autumn: !!data.get('autumn'),
			winter: !!data.get('winter'),
			spring: !!data.get('spring'),
			summer: !!data.get('summer')
		},
		sunOptions: data.get('hours-of-day'),
		hoursOfDay: {
			min: +data.get('lower-suntime'),
			max: +data.get('upper-suntime')
		},
		exposure: {
			north: !!data.get('north'),
			'north-east': !!data.get('north-east'),
			east: !!data.get('east'),
			'south-east': !!data.get('south-east'),
			south: !!data.get('south'),
			'south-west': !!data.get('south-west'),
			west: !!data.get('west'),
			'north-west': !!data.get('north-west')
		}
	};
};

export const getSectorOptions = (sectors) => {
	return sectors.map((sector) => sector.properties.Settore.toLowerCase());
};
