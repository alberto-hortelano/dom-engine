import { OrientationCode } from '../orientation';

let id = 1;

export class Positionable {
	id: number;
	top: number;
	left: number;
	size: number;
	orientation: OrientationCode;
	constructor(partial: Partial<Positionable> = {}) {
		this.id = partial.id || id++;
		this.top = partial.top || 0;
		this.left = partial.left || 0;
		this.size = partial.size || 0;
		this.orientation = partial.orientation || OrientationCode.South;
	}
}
