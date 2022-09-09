import { Character } from '../core/Classes/Character';
import { Game } from '../core/game';
import { reducer } from './reducer';

describe('reducer', () => {
	test('switch', () => {
		const initialState = {
			running: false,
		} as Game;
		const expectedState = {
			running: true,
		} as Game;

		const newState = reducer(initialState, {
			type: 'switch',
		});
		expect(newState).toEqual(expectedState);
	});
	// describe.only('keyPressed', () => {
	// 	test('Space', () => {
	// 		const target = new Character();
	// 		const selected = new Character({ target });
	// 		const enemies = [target];
	// 		const initialState = {
	// 			enemies,
	// 			selected,
	// 		} as Game;
	// 		const expectedState = JSON.parse(JSON.stringify(initialState)) as Game;
	// 		(expectedState.selected as Character).target = null;
	// 		const keyEvent = {
	// 			code: 'Space',
	// 			type: 'keydown',
	// 		} as React.KeyboardEvent<HTMLDivElement>
	// 		console.log("test -> initialState", initialState);
	// 		const newState = reducer(initialState, {
	// 			type: 'keyPressed',
	// 			keyEvent,
	// 		})
	// 		console.log("test -> newState", newState);
	// 		console.log("test -> expectedState", expectedState);
	// 		expect(newState).toEqual(expectedState);
	// 	});
	// });
});
