import { Character } from "../core/Classes/Character"
import { Obstacle } from "../core/Classes/Obstacle"
import { Line } from "../core/geometry"
import { OrientationCode, xMultiplier, yMultiplier } from "../core/orientation"

const defaultCharacter: Partial<Character> = {
	size: 40,
}

export const allies: Partial<Character>[] = [{
	...defaultCharacter,
	top: 400,
	left: 300,
},
{
	...defaultCharacter,
	top: 200,
	left: 700,
	orientation: OrientationCode.SouthEast,
}
]

export const selected = 0;

export const enemies: Partial<Character>[] = [
	{
		...defaultCharacter,
		top: 460,
		left: 450,
		orientation: OrientationCode.SouthEast,
	}, {
		...defaultCharacter,
		top: 300,
		left: 750,
	}
]
const fillWall = (amount: number, top: number, left: number) => {
	const size = 60;
	const walls: Partial<Obstacle>[] = [];
	const radius = size / 2;
	const shape = new Line({
		top: 10 - radius,
		left: 0 - radius,
	}, {
		top: 40 - radius,
		left: size - radius,
	})
	while (amount) {
		amount--;
		top += xMultiplier * size;
		left += yMultiplier * size;
		if (amount % 10 === 0) {
			continue
		}
		walls.push({
			top,
			left,
			size,
			orientation: OrientationCode.NorthWest,
			className: 'wall',
			shape,
		})
	}
	return walls;
}
export const obstacles: Partial<Obstacle>[] = fillWall(30, 200, 200);
