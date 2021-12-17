import { changeMovementKeys, factor, MovementKey, movementKeysToOrientation } from './movement';

/**
 * KeyCodes:
 * w: 87
 * d: 68
 * s: 83
 * a: 65
 * w  ↑
 * wd ↗
 * d  →
 * sd ↘
 * s  ↓
 * sa ↙
 * a  ←
 * wa ↖
 */
describe('changeDirection', () => {
	test('adds movement', () => {
		const movement: MovementKey[] = [65, 68, 83]
		const result: MovementKey[] = [65, 68, 83, 87]
		expect(changeMovementKeys('w', true, movement)).toStrictEqual(result);
	});
	test('replaces movement', () => {
		const movement: MovementKey[] = [65, 68, 83]
		const result: MovementKey[] = [68, 83, 65]
		expect(changeMovementKeys('a', true, movement)).toStrictEqual(result);
	});
	test('removes movement', () => {
		const movement: MovementKey[] = [65, 68, 83]
		const result: MovementKey[] = [68, 83]
		expect(changeMovementKeys('a', false, movement)).toStrictEqual(result);
	});
	test('complex', () => {
		let movement: MovementKey[] = [87];
		movement = changeMovementKeys('a', true, movement);
		movement = changeMovementKeys('a', false, movement);
		movement = changeMovementKeys('a', true, movement);
		expect(movement).toStrictEqual([87, 65]);
	});
});
describe('movementKeysToOrientation', () => {
	test('North', () => {
		const movementKeys: MovementKey[] = [87]; // w
		const result = movementKeysToOrientation(movementKeys);
		expect(result).toStrictEqual([-1, 0]);
	});
	test('movementKeysToOrientation', () => {
		const movementKeys: MovementKey[] = [87, 65, 83, 68]; // wasd
		const result = movementKeysToOrientation(movementKeys);
		expect(result).toStrictEqual([factor, factor]);
	});
});
