export type Position = { top: number, left: number };
export type Shape = Line | Rectangle | number;
export class Line {
	width: number;
	constructor(readonly start: Position, readonly end: Position) {
		this.width = twoPointsDist(this.start, this.end);
	}
};
export interface Rectangle extends Line {
	height: number,
};

const roundPosition = (p: Position) => ({
	left: Math.round(p.left),
	top: Math.round(p.top),
})
const fastHypo = (a: number, b: number) => {
	if (a > b) {
		[a, b] = [b, a];
	}
	return Math.max(b, 0.918 * (b + (a >> 1)));
}
// const fastSqrt = (x: number) => {
// Round sqrt table 
// sqrt(x) = sqrt(exacta + resto)
// y = sqrt(exacta)
// sqrt(x) = y + resto / (2 * y + 1)
// }
/**
 * Area between line height and r to p lenght and the 
 * area between line width and r to p height
 */
const areas = (p: Position, diff: Position, r: Position) => diff.top * (p.left - r.left) + diff.left * (p.top - r.top);

/**
 * Check if Positions a and b are one the same side of the line between Positions r and s
 */
export const sameSide = (a: Position, b: Position, r: Position, s: Position) => {
	a = roundPosition(a);
	b = roundPosition(b);
	r = roundPosition(r);
	s = roundPosition(s);
	const rsDiff = {
		left: s.left - r.left,
		top: r.top - s.top
	};
	const aArea = areas(a, rsDiff, r);
	const bArea = areas(b, rsDiff, r);
	return aArea > 0 && bArea > 0 || aArea < 0 && bArea < 0;
}
export const addTwoPoints = (a: Position, b: Position) => ({
	top: a.top + b.top,
	left: a.left + b.left,
})
export const twoPointsDist = (a: Position, b: Position) => {
	const x = Math.abs(a.left - b.left);
	const y = Math.abs(a.top - b.top);
	return fastHypo(x, y);
}
export const triangleHeight = (base: number, sideA: number, sideB: number) => {
	const semiPerimeter = (base + sideA + sideB) / 2;
	return Math.sqrt(
		semiPerimeter *
		(semiPerimeter - base) *
		(semiPerimeter - sideA) *
		(semiPerimeter - sideB)
	) * 2 / base;
}
// Prints lines and points for debugging collisions
const printCollision = (start: Position, end: Position, collide: boolean) => {
	const startMark = document.getElementById('start')!;
	const endMark = document.getElementById('end')!;
	const line = document.getElementById('line')!;
	startMark.style.top = `${start.top}px`;
	startMark.style.left = `${start.left}px`;
	endMark.style.top = `${end.top}px`;
	endMark.style.left = `${end.left}px`;
	if (collide) {
		line.style.background = 'red';
		line.style.top = `${start.top}px`;
		line.style.left = `${start.left}px`;
	} else {
		line.style.background = '#ccc';
	}
}
export const pointLineCollision = (startDist: number, endDist: number, line: Line, minDist: number) => {
	const { start, end, width } = line;
	const sides = [width, startDist, endDist].sort();
	const biggestSide = sides.pop() as number;
	const side2 = sides.pop() as number;
	const side3 = sides.pop() as number;
	if (biggestSide ** 2 < side2 ** 2 + side3 ** 2) {
		return false;
	}
	const dist = triangleHeight(width, startDist, endDist);
	const collide = 2 * dist < minDist;
	printCollision(start, end, collide);
	return collide;
}
export const __testing = (process.env.NODE_ENV === 'test') ? {
	fastHypo
} : void 0;
