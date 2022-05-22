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
