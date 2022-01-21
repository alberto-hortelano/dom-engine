import { Character } from "./Classes/Character";
import { twoPointsDist } from "./geometry";

export const selectTarget = (character: Character, enemies: Character[]) => {
	let index: number = -1;
	let minDist = 200;
	for (let i = 0; i < enemies.length; i++) {
		const dist = twoPointsDist(character, enemies[i]);
		if (dist < minDist) {
			minDist = dist;
			index = i;
		}
	}
	return index;
}
