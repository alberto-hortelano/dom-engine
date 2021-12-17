export type MovementKey = 87 | 68 | 83 | 65;
export type Orientation = [number, number];
export const KeyCodes: { [k: string]: MovementKey } = {
	w: 87,
	d: 68,
	s: 83,
	a: 65,
}
// 1 / sqrt(2)
export const factor = 0.707; // 0,707106781
const directions = new Map<number, Orientation>();
// w -> N ↑
directions.set(87, [-1, 0]);
// wd -> NE ↗
directions.set(155, [-factor, factor]);
// d -> E →
directions.set(68, [0, 1]);
// sd -> SE ↘
directions.set(151, [factor, factor]);
// s -> S ↓
directions.set(83, [1, 0]);
// sa -> SW ↙
directions.set(148, [factor, -factor]);
// a -> W ←
directions.set(65, [0, -1]);
// wa -> NW ↖
directions.set(152, [-factor, -factor]);

export const movementKeysToOrientation = (movementKeys: MovementKey[]) => {
	let sum = movementKeys[movementKeys.length - 1] || 0;
	sum += movementKeys[movementKeys.length - 2] || 0;
	return directions.get(sum) || [0, 0];
}
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
