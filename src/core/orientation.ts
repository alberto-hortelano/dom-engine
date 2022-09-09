// Isometric proyection 27 deg
export const xMultiplier = 0.454;
export const yMultiplier = 0.891;
export const negXMultiplier = -0.454;
export const negYMultiplier = -0.891;

export type Factor =
	| 1
	| -1
	| 0
	| typeof xMultiplier
	| typeof negXMultiplier
	| typeof yMultiplier
	| typeof negYMultiplier;
export type OrientationClass =
	| 'north'
	| 'north-east'
	| 'east'
	| 'south-east'
	| 'south'
	| 'south-west'
	| 'west'
	| 'north-west';
type OrientationValues = { factors: [Factor, Factor]; className: OrientationClass };

// Addition of the two letters keycode (wasd)
export enum OrientationCode {
	North = 87,
	NorthEast = 155,
	East = 68,
	SouthEast = 151,
	South = 83,
	SouthWest = 148,
	West = 65,
	NorthWest = 152,
}

const orientationCodes = [87, 155, 68, 151, 83, 148, 65, 152];

const orientations = new Map<OrientationCode, OrientationValues>();
// w -> N ↑
orientations.set(OrientationCode.North, { factors: [-1, 0], className: 'north' });
// wd -> NE ↗
orientations.set(OrientationCode.NorthEast, { factors: [negXMultiplier, yMultiplier], className: 'north-east' });
// d -> E →
orientations.set(OrientationCode.East, { factors: [0, 1], className: 'east' });
// sd -> SE ↘
orientations.set(OrientationCode.SouthEast, { factors: [xMultiplier, yMultiplier], className: 'south-east' });
// s -> S ↓
orientations.set(OrientationCode.South, { factors: [1, 0], className: 'south' });
// sa -> SW ↙
orientations.set(OrientationCode.SouthWest, { factors: [xMultiplier, negYMultiplier], className: 'south-west' });
// a -> W ←
orientations.set(OrientationCode.West, { factors: [0, -1], className: 'west' });
// wa -> NW ↖
orientations.set(OrientationCode.NorthWest, { factors: [negXMultiplier, negYMultiplier], className: 'north-west' });

export const orientationToClass = (sum: number) => orientations.get(sum)?.className || 'south';
export const orientationToFactors = (sum: number) => orientations.get(sum)?.factors || [0, 0];
const stepMultiplier = [0, 1, -1, 2, -2, 3, -3, 4, -4];
export const getNextOrientation = function (orientation: OrientationCode, step: number) {
	const index =
		(orientationCodes.length + orientationCodes.indexOf(orientation) + stepMultiplier[step]) %
		orientationCodes.length;
	return orientationCodes[index];
};
