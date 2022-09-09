import { Character } from '../core/Classes/Character';
import { Game, getSelected } from '../core/game';
import { MovementKeyEvent } from '../core/keyboard';
import { moveCharacters, onMovementKey, scrollToSelected } from '../core/movement';

export type Action =
	| {
			type: 'animationFrame';
			time: number;
			newTime: number;
	  }
	| {
			type: 'move';
			keyEvent: MovementKeyEvent;
	  }
	| {
			type: 'select';
			selected: Character['id'];
	  }
	| {
			type: 'selectTarget';
			target: Character['id'];
	  }
	| {
			type: 'blur';
	  }
	| {
			type: 'switch';
	  }
	| {
			type: 'debug'; // DEBUGGING
			game: Partial<Game>;
	  };
// eslint-disable-next-line max-lines-per-function
export const reducer = (game: Game, action: Action): Game => {
	const selected = getSelected(game);
	switch (action.type) {
		case 'switch':
			return {
				...game,
				running: !game.running,
			};
		case 'animationFrame':
			if (!game.running) {
				return game;
			}
			moveCharacters(game.allies, game.enemies, game.obstacles, action.newTime - action.time);
			if (selected?.moving) {
				scrollToSelected(selected);
			}
			return {
				...game,
			};
		case 'select':
			if (selected) selected.moving = false;
			return {
				...game,
				selected: action.selected,
			};
		case 'selectTarget':
			if (selected) {
				selected.target = action.target;
			}
			return {
				...game,
			};
		case 'blur':
			if (selected) selected.moving = false;
			return {
				...game,
				movementKeys: [],
			};
		case 'move':
			game.movementKeys = onMovementKey(
				action.keyEvent.code,
				action.keyEvent.type === 'keydown',
				game.movementKeys,
				selected,
			);
			return {
				...game,
			};
		case 'debug':
			return {
				...game,
				...action.game,
			};
		default:
			console.error('WRONG ACTION', action);
			return game;
	}
};
