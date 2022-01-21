export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type Mandatory<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type MovementKey = 87 | 68 | 83 | 65;
export type OrientationClass = 'north' | 'north-east' | 'east' | 'south-east' | 'south' | 'south-west' | 'west' | 'north-west' | 'iddle';
export type CharacterAction = 'iddle' | 'moving' | 'attacking';
export type Orientation = [number, number];
export type Position = { top: number, left: number };
export interface IPositionable {
	top: number;
	left: number;
	width: number;
	height: number;
	orientation: number;
}

export interface IItinerant extends IPositionable {
	speed: number;
	moving: boolean;
}

export interface ICharacter extends IItinerant {
	action: CharacterAction;
	target: ICharacter | void;
}

export type State = {
	running: boolean,
	movementKeys: MovementKey[],
	position: Position,
	positionables: IPositionable[],
	itinerants: IItinerant[],
	allies: ICharacter[],
	enemies: ICharacter[],
	selected: ICharacter | void,
}
