import { changeDirection, MovementKey, movementClassToDirection } from './movement';

describe('changeDirection', () => {
	test('adds movement', () => {
		const movement: MovementKey[] = ['a', 'd', 's']
		const result: MovementKey[] = ['a', 'd', 's', 'w']
		expect(changeDirection('w', true, movement)).toStrictEqual(result);
	});
	test('replaces movement', () => {
		const movement: MovementKey[] = ['a', 'd', 's']
		const result: MovementKey[] = ['d', 's', 'a']
		expect(changeDirection('a', true, movement)).toStrictEqual(result);
	});
	test('removes movement', () => {
		const movement: MovementKey[] = ['a', 'd', 's']
		const result: MovementKey[] = ['d', 's']
		expect(changeDirection('a', false, movement)).toStrictEqual(result);
	});
	test('complex', () => {
		let movement: MovementKey[] = ['w'];
		movement = changeDirection('a', true, movement);
		movement = changeDirection('a', false, movement);
		movement = changeDirection('a', true, movement);
		expect(movement.join()).toBe('w,a');
	});
});
describe('movementClassToDirection', () => {
	test('adds movement', () => {
		const movementClass = 'a';
		const direction = movementClassToDirection(movementClass);
		const result = [0, -1]
		expect(direction).toStrictEqual(result);
	});
});
