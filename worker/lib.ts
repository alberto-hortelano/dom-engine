import { Orientation, OrientationClass, MovementKey, ICharacter, Position } from "./types";

export const KeyCodes: { [k: string]: MovementKey } = {
	KeyW: 87,
	KeyD: 68,
	KeyS: 83,
	KeyA: 65,
}
// 1 / sqrt(2)
export const diagonalFactor = 0.707; // 0,707106781
const directions = new Map<number, { multiplier: Orientation, className: OrientationClass }>();
// w -> N ↑
directions.set(87, { multiplier: [-1, 0], className: 'north' });
// wd -> NE ↗
directions.set(155, { multiplier: [-diagonalFactor, diagonalFactor], className: 'north-east' });
// d -> E →
directions.set(68, { multiplier: [0, 1], className: 'east' });
// sd -> SE ↘
directions.set(151, { multiplier: [diagonalFactor, diagonalFactor], className: 'south-east' });
// s -> S ↓
directions.set(83, { multiplier: [1, 0], className: 'south' });
// sa -> SW ↙
directions.set(148, { multiplier: [diagonalFactor, -diagonalFactor], className: 'south-west' });
// a -> W ←
directions.set(65, { multiplier: [0, -1], className: 'west' });
// wa -> NW ↖
directions.set(152, { multiplier: [-diagonalFactor, -diagonalFactor], className: 'north-west' });

export const movementKeysToSum = (movementKeys: MovementKey[]) => {
	let sum = movementKeys[movementKeys.length - 1] || 0;
	sum += movementKeys[movementKeys.length - 2] || 0;
	return sum;
}
export const orientationToClass = (sum: number) => directions.get(sum)?.className || 'south';
export const orientationToMultipliers = (sum: number) => directions.get(sum)?.multiplier || [0, 0];
export const changeMovementKeys = (key: string, add: boolean, movementKeys: MovementKey[]) => {
	const keyCode = KeyCodes[key];
	if (!keyCode) {
		return movementKeys;
	}
	const index = movementKeys.indexOf(keyCode);
	if (index > -1) {
		movementKeys.splice(index, 1);
	}
	if (add) {
		movementKeys.push(keyCode);
	}
	return [...movementKeys];
}
export const moveCharacters = (characters: ICharacter[], elapsedTime: number) => {
	characters.forEach(character => {
		if (character.moving) {
			const speedTime = character.speed * elapsedTime;
			const [topMultiplier, leftMultiplier] = orientationToMultipliers(character.orientation);
			character.top = character.top + speedTime * topMultiplier;
			character.left = character.left + speedTime * leftMultiplier;
		}
	});
	return characters;
}
