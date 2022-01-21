import { Line, Shape } from "../geometry";
import { Positionable } from "./Positionable";

export class Obstacle extends Positionable {
	className: string;
	shape: Shape;
	constructor(partial: Partial<Obstacle> = {}) {
		super(partial);
		this.className = partial.className || '';
		this.shape = partial.shape || 0;
	}
}
export const getAbsoluteLinePosition = (obstacle: Obstacle & { shape: Line }) => ({
	start: {
		top: obstacle.top + obstacle.shape.start.top,
		left: obstacle.left + obstacle.shape.start.left,
	},
	end: {
		top: obstacle.top + obstacle.shape.end.top,
		left: obstacle.left + obstacle.shape.end.left,
	},
	width: obstacle.shape.width,
});
export const isLineShaped = (obstacle: Obstacle): obstacle is Obstacle & { shape: Line } => obstacle.shape instanceof Line;
