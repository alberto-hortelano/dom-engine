import { Character } from './Classes/Character';
import { Characters } from './game';
import { twoPointsDist } from './geometry';

export const selectTarget = (character: Character, enemies: Characters, minDist = 200) => {
	let enemyId: Character['id'] = 0;
	enemies.forEach((enemy) => {
		const dist = twoPointsDist(character, enemy);
		if (dist < minDist) {
			minDist = dist;
			enemyId = enemy.id;
		}
	});
	return enemyId;
};
