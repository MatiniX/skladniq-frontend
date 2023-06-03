import { areaMUs, lengthMUs, storageUnits, volumeMUs, weightMUs } from '$lib/constants';

export const getStorageUnit = (value: string) => {
	const index = storageUnits.findIndex((s) => s.value === value);
	return storageUnits[index];
};

export const getWeightMU = (value: number) => {
	const index = weightMUs.findIndex((mu) => mu.value === value);
	return weightMUs[index];
};

export const getLengthMU = (value: number) => {
	const index = lengthMUs.findIndex((mu) => mu.value === value);
	return lengthMUs[index];
};

export const getAreaMU = (value: number) => {
	const index = areaMUs.findIndex((mu) => mu.value === value);
	return areaMUs[index];
};

export const getVolumeMU = (value: number) => {
	const index = volumeMUs.findIndex((mu) => mu.value === value);
	return volumeMUs[index];
};

export const getMetricUnit = (unit: string, value: number) => {
	switch (unit) {
		case 'weight':
			return getWeightMU(value);
		case 'length':
			return getLengthMU(value);
		case 'area':
			return getAreaMU(value);
		case 'volume':
			return getVolumeMU(value);

		default:
			return undefined;
	}
};

export const getMetricUnitPostfix = (unit: string, value: number) => {
	const metricUnit = getMetricUnit(unit, value);
	if (metricUnit) {
		const postfixStart = metricUnit?.text.indexOf('(');
		const postfixEnd = metricUnit?.text.indexOf(')');
		return metricUnit?.text.substring(postfixStart! + 1, postfixEnd);
	}
	return '';
};
