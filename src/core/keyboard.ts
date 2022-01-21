
import { Action } from "../state/reducer";
import { Game } from "./game";
import { isMovementKeyCode, MovementKeyCode } from './movement';
import { KeyEvent } from "./types";

export type MovementKeyEvent = KeyEvent & { code: MovementKeyCode }
export const isMovementKeyEvent = (k: KeyEvent): k is MovementKeyEvent => isMovementKeyCode(k.code);
export const onKeyPress = (keyEvent: KeyEvent, dispatch: (action: Action) => void, game: Game) => {
	if (isMovementKeyEvent(keyEvent)) {
		dispatch({
			type: 'move',
			keyEvent
		})
	} else if (keyEvent.code === 'Space' && keyEvent.type === 'keydown') {
		// if (game.selected?.target) {
		// 	// dispatch({
		// 	// 	type: 'selectTarget',
		// 	// 	target: 
		// 	// })
		// } else {

		// }
	}
}
