const isMovementKey = (key: string): key is MovementKey => ['w', 'a', 's', 'd'].includes(key);
export type MovementKey = 'w' | 'a' | 's' | 'd';
const factor = 0.707;
export const changeDirection = (key: string, add: boolean, movement: MovementKey[]) => {
	if (!isMovementKey(key)) {
		return movement;
	}
	const index = movement.indexOf(key);
	if (index > -1) {
		movement.splice(index, 1);
	}
	if (add) {
		movement.push(key);
	}
	return [...movement];
}
export const movementToClass = (mov: MovementKey[]) => {
	const lastKey = mov[mov.length - 1];
	const prevKey = mov[mov.length - 2];
	if (!prevKey) {
		return lastKey;
	}
	const result: string[] = [];
	result[+ (prevKey < 'e')] = prevKey;
	result[+ (lastKey < 'e')] = lastKey;
	const className = result.join(result[0] && result[1] ? '-' : '')
	return className
}
export const movementClassToDirection = (className: string = '') => {
	switch (className) {
		case 'w':
			return [-1, 0];
		case 'w-d':
			return [-factor, factor];
		case 'd':
			return [0, 1];
		case 's-d':
			return [factor, factor];
		case 's':
			return [1, 0];
		case 's-a':
			return [factor, -factor];
		case 'a':
			return [0, -1];
		case 'w-a':
			return [-factor, -factor];
		default:
			return [0, 0];
	}
}

