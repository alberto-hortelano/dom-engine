import { Positionable } from './Positionable';

export class Itinerant extends Positionable {
	speed: number;
	moving: boolean;
	constructor(partial: Partial<Itinerant> = {}) {
		super(partial);
		this.speed = partial.speed || 0.04;
		this.moving = partial.moving || false;
	}
}
