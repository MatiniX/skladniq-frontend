export const storageUnits = [
	{ value: 'quantity', text: 'Quantity' },
	{ value: 'weight', text: 'Weight' },
	{ value: 'length', text: 'Length' },
	{ value: 'area', text: 'Area' },
	{ value: 'volume', text: 'Volume' }
];

export const weightMUs = [
	{ value: 0.001, text: 'grams (g)', default: false },
	{ value: 1, text: 'kilograms (kg)', default: true },
	{ value: 1000, text: 'tons (t)', default: false }
];

export const lengthMUs = [
	{ value: 0.001, text: 'milimeter (mm)', default: false },
	{ value: 0.01, text: 'centimeter (cm)', default: false },
	{ value: 1, text: 'meter (m)', default: true },
	{ value: 1000, text: 'kilometer (km)', default: false }
];

export const areaMUs = [
	{ value: 0.000001, text: 'Square milimeters (mm^2)', default: false },
	{ value: 0.0001, text: 'Suare centimeters (cm^2)', default: false },
	{ value: 1, text: 'Square meters (m^2)', default: true },
	{ value: 1000000, text: 'Square kilometers (km^2)', default: false }
];

// TODO: vymyslieť ktoré jednotky uprednostniť
export const volumeMUs = [
	{ value: 0.001, text: 'Mililiter (ml)', default: false },
	{ value: 1, text: 'Liter (l)', default: true },
	{ value: 1000, text: 'Cubic meters (m^3)', default: false }
];
