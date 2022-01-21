import { Factor, OrientationCode, orientationToFactors, xMultiplier, yMultiplier } from './orientation';
import { __testing, MovementKey, onMovementKey, KeyCodes, scrollToSelected, moveCharacters } from './movement';
import { Character } from './Classes/Character';

const {
	changeMovementKeys, addLastMovementKeys, moveCharacter,
} = __testing!;

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
describe('movement', () => {
	describe('changeDirection', () => {
		test('adds movement', () => {
			const movement: MovementKey[] = [65, 68, 83]
			const expected: MovementKey[] = [65, 68, 83, 87]
			const result = changeMovementKeys('KeyW', true, movement)
			expect(result).toStrictEqual(expected);
		});
		test('replaces movement', () => {
			const movement: MovementKey[] = [65, 68, 83]
			const expected: MovementKey[] = [68, 83, 65]
			const result = changeMovementKeys('KeyA', true, movement);
			expect(result).toStrictEqual(expected);
		});
		test('removes movement', () => {
			const movement: MovementKey[] = [65, 68, 83]
			const expected: MovementKey[] = [68, 83]
			const result = changeMovementKeys('KeyA', false, movement);
			expect(result).toStrictEqual(expected);
		});
		test('complex', () => {
			let movement: MovementKey[] = [87];
			const expected: MovementKey[] = [87, 65]
			movement = changeMovementKeys('KeyA', true, movement);
			movement = changeMovementKeys('KeyA', false, movement);
			movement = changeMovementKeys('KeyA', true, movement);
			expect(movement).toStrictEqual(expected);
		});
	});
	describe('movementKeysToOrientation', () => {
		test('North', () => {
			const movementKeys: MovementKey[] = [87]; // w
			const expected: [Factor, Factor] = [-1, 0]
			const result = orientationToFactors(addLastMovementKeys(movementKeys));
			expect(result).toStrictEqual(expected);
		});
		test('movementKeysToOrientation', () => {
			const movementKeys: MovementKey[] = [87, 65, 83, 68]; // wasd
			const expected: [Factor, Factor] = [xMultiplier, yMultiplier]
			const result = orientationToFactors(addLastMovementKeys(movementKeys));
			expect(result).toStrictEqual(expected);
		});
	});
	describe('onMovementKey', () => {
		test('add one key', () => {
			const movementKeys = onMovementKey('KeyW', true, []);
			expect(movementKeys).toEqual([KeyCodes.KeyW]);
		});
		test('move selected character north', () => {
			const character = new Character();
			onMovementKey('KeyW', true, [], character);
			expect(character.orientation).toEqual(OrientationCode.North);
			expect(character.moving).toBeTruthy();
		});
		test('move selected character from north to north east', () => {
			const character = new Character();
			onMovementKey('KeyW', true, [KeyCodes.KeyD], character);
			expect(character.orientation).toEqual(OrientationCode.NorthEast);
			expect(character.moving).toBeTruthy();
		});
		test('move selected character from north east to north', () => {
			const character = new Character();
			onMovementKey('KeyD', false, [KeyCodes.KeyD, KeyCodes.KeyW], character);
			expect(character.orientation).toEqual(OrientationCode.North);
			expect(character.moving).toBeTruthy();
		});
		test('stop selected character', () => {
			const character = new Character({ orientation: OrientationCode.North });
			onMovementKey('KeyD', false, [KeyCodes.KeyD], character);
			expect(character.orientation).toEqual(OrientationCode.North);
			expect(character.moving).toBeFalsy();
		});
	});
	describe('scrollToSelected', () => {
		const scrollToSpy = jest.spyOn(window, 'scrollTo');
		window.innerHeight = 100;
		window.innerWidth = 100;
		test('fast', () => {
			const top = 50;
			const left = 100;
			const character = new Character({ top, left });
			scrollToSelected(character)
			expect(scrollToSpy).toHaveBeenCalledWith(50, 0);
		});
		test('smooth', () => {
			const top = 50;
			const left = 100;
			const character = new Character({ top, left });
			scrollToSelected(character, true)
			expect(scrollToSpy).toHaveBeenCalledWith({ left: 50, top: 0, behavior: 'smooth' });
		});
	});
	describe.only('moveCharacter', () => {
		test('returns a moved character from a character', () => {
			jest.spyOn(document, 'getElementById').mockReturnValue({ style: { top: 0, left: 0 } } as any);
			const elapsedTime = 100;
			const character = new Character({
				top: 300,
				left: 400,
			});
			console.log("test -> character", character);
			const movedCharacter = moveCharacter(character, elapsedTime);
			console.log("test -> movedCharacter", movedCharacter);
			expect(moveCharacter).toBeTruthy();
		});
	});
});

