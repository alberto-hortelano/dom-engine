import { Itinerant } from "./Itinerant";

export class Character extends Itinerant {
	race: string;
	action: 'iddle' | 'run' | 'walk' | 'attack' | 'defend';
	target: Character['id'] | null;
	constructor(partial: Partial<Character> = {}) {
		super(partial);
		this.race = partial.race || 'character';
		this.action = partial.action || 'iddle';
		this.target = partial.target || null;
	}
}
