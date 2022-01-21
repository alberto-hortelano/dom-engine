import { Itinerant } from "./Itinerant";

export class Character extends Itinerant {
	action: 'iddle' | 'moving' | 'attacking';
	target: Character['id'] | null;
	constructor(partial: Partial<Character> = {}) {
		super(partial);
		this.action = partial.action || 'iddle';
		this.target = partial.target || null;
	}
}
