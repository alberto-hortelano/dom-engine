import { Character } from "./Classes/Character"
import { Itinerant } from "./Classes/Itinerant"
import { Obstacle } from "./Classes/Obstacle"
import { MovementKey } from "./movement"

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
	selected: 0,
}
export const getSelected = (game: Game) => game.allies.get(game.selected);
