import { Character } from "../core/Classes/Character"
import { Itinerant } from "../core/Classes/Itinerant"
import { Obstacle } from "../core/Classes/Obstacle"
import { MovementKey } from "../core/movement"

export type Obstacles = Map<Obstacle['id'], Obstacle>;
export type Itinerants = Map<Itinerant['id'], Itinerant>;
export type Characters = Map<Character['id'], Character>;

export type Game = {
	running: boolean,
	counter: number,
	movementKeys: MovementKey[],
	obstacles: Obstacles,
	itinerants: Itinerants,
	allies: Characters,
	enemies: Characters,
	selected: Character['id'],
}
export const defaultState: Game = {
	running: true,
	counter: 0,
	movementKeys: [],
	obstacles: new Map(),
	itinerants: new Map(),
	allies: new Map(),
	enemies: new Map(),
	selected: -1,
}
export const getSelected = (game: Game) => game.allies.get(game.selected);
