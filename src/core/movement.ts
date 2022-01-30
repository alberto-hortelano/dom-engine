import { Character } from "./Classes/Character";
import { Obstacle } from "./Classes/Obstacle";
import { checkCollisions } from "./collision";
import { Characters, Obstacles } from "./game";
import { getNextOrientation, OrientationCode, orientationToFactors } from "./orientation";

export type MovementKey = 87 | 65 | 83 | 68;
export type MovementKeyCode = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';
export const KeyCodes: { [k in MovementKeyCode]: MovementKey } = {
	KeyW: 87,
	KeyA: 65,
	KeyS: 83,
	KeyD: 68,
}
export const isMovementKeyCode = (k: string): k is MovementKeyCode => KeyCodes.hasOwnProperty(k);

const addLastMovementKeys = (movementKeys: MovementKey[]) => {
	let sum = movementKeys[movementKeys.length - 1] || 0;
	sum += movementKeys[movementKeys.length - 2] || 0;
	return sum;
}
const changeMovementKeys = (key: MovementKeyCode, add: boolean, movementKeys: MovementKey[]) => {
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
const moveCharacter = (character: Character, elapsedTime: number, orientation?: OrientationCode) => {
	const selected = document.getElementById('selected')!; // debugging
	const speed = character.target ? character.speed : 2 * character.speed;
	const speedTime = speed * elapsedTime;
	const movedCharacter = new Character({
		...character,
	})
	if (orientation) {
		movedCharacter.orientation = orientation;
	}
	const [topFactor, leftFactor] = orientationToFactors(movedCharacter.orientation);
	const top = movedCharacter.top + speedTime * topFactor;
	const left = movedCharacter.left + speedTime * leftFactor;
	movedCharacter.top = top;
	movedCharacter.left = left;
	selected.style.top = `${top}px`;
	selected.style.left = `${left}px`;
	return movedCharacter;
}
export const moveCharacters = (allies: Characters, enemies: Characters, obstacles: Obstacles, elapsedTime: number) => {
	[allies, enemies].forEach(characters => {
		characters.forEach(character => {
			if (character.moving) {
				let collide: false | Character | Obstacle = false;
				let step = 0;
				do {
					const orientation = getNextOrientation(character.orientation, step++);
					const movedCharacter = moveCharacter(character, elapsedTime, orientation);
					collide = checkCollisions(movedCharacter, obstacles, allies) || checkCollisions(movedCharacter, obstacles, enemies);
					if (!collide) {
						character.top = movedCharacter.top;
						character.left = movedCharacter.left;
						return collide;
					}
				} while (collide && step < 5);
			}
		})
	})
}
export const scrollToSelected = (selected: Character, smooth = false) => {
	const top = selected.top - (window.innerHeight - selected.size) / 2;
	const left = selected.left - (window.innerWidth - selected.size) / 2;
	if (smooth) {
		window.scrollTo({
			left,
			top,
			behavior: 'smooth'
		});
	} else {
		window.scrollTo(left, top);
	}
}
export const onMovementKey = (key: MovementKeyCode, add: boolean, movementKeys: MovementKey[], selected: Character | void) => {
	const newMovementKeys = changeMovementKeys(key, add, movementKeys);
	if (selected) {
		const orientation = addLastMovementKeys(newMovementKeys);
		if (orientation) {
			selected.orientation = orientation;
			selected.moving = true;
			selected.action = selected.target ? 'defend' : 'run';
		} else {
			selected.moving = false;
		}
	}
	return newMovementKeys;
}

export const __testing = (process.env.NODE_ENV === 'test') ? {
	moveCharacter, changeMovementKeys, addLastMovementKeys,
} : void 0;
