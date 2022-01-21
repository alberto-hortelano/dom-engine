import { Character } from "./Classes/Character";
import { Obstacle, isLineShaped, getAbsoluteLinePosition } from "./Classes/Obstacle";
import { Obstacles, Characters } from "./game";
import { twoPointsDist, Line, pointLineCollision } from "./geometry";

export const collision = (character: Character, positionable: Character | Obstacle) => {
	const dist = twoPointsDist(character, positionable);
	if (2 * dist < character.size + positionable.size) {
		if (positionable instanceof Character) {
			return true;
		} else if (isLineShaped(positionable)) {
			const collide = characterObstacleCollision(character, positionable);
			return collide;
		}
		return false;
	} else {
		return false;
	}
}
export const characterObstacleCollision = (character: Character, obstacle: Obstacle & { shape: Line }) => {
	const absoluteLine = getAbsoluteLinePosition(obstacle);
	const startDist = twoPointsDist(character, absoluteLine.start);
	const endDist = twoPointsDist(character, absoluteLine.end);
	if (2 * startDist < character.size) {
		return true;
	}
	if (2 * endDist < character.size) {
		return true;
	}
	return pointLineCollision(startDist, endDist, absoluteLine, character.size);
}
export const checkCollisions = (character: Character, obstacles: Obstacles, characters: Characters) => {
	const collideObstacle = [...obstacles.values()].find(obstacle => collision(character, obstacle)) || false;
	if (collideObstacle) {
		return collideObstacle;
	}
	const collideCharacter = [...characters.values()].find(otherCharacter => character.id !== otherCharacter.id && collision(character, otherCharacter));
	if (collideCharacter) {
		return collideCharacter;
	}
	return false;
}