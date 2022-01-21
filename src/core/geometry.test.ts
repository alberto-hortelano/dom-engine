import { Position, sameSide, __testing } from './geometry';

const { fastHypo } = __testing!;

describe('sameSide', () => {
	// line r ---- s
	const r: Position = {
		left: 0, top: 3
	}
	const s: Position = {
		left: 1, top: 0
	}
	const p: Position = {
		left: 2, top: 2
	}
	const sameSidePoint: Position = {
		left: 1, top: 1
	}
	const otherSidePoint: Position = {
		left: 0, top: 2
	}
	const testIt = (testPoint: Position) => sameSide(testPoint, p, r, s)
	test('two points are at the same side of a line', () => {
		const sameSideResult = testIt(sameSidePoint);
		expect(sameSideResult).toBeTruthy();
	});
	test('two points are at different sides of a line', () => {
		const sameSideResult = testIt(otherSidePoint);
		expect(sameSideResult).toBeFalsy();
	});
});
describe('fastHypot', () => {
	test('two points are at the same side of a line', () => {
		const percentage = (a: number, b: number) => {
			if (a > b) {
				const c = a;
				a = b;
				b = c;
			}
			return 100 - 100 * a / b;
		}
		const a = 600;
		const b = 400;
		const fast = fastHypo(a, b);
		const hypot = Math.hypot(a, b);
		const diff = percentage(fast, hypot);
		console.log("test -> hype", hypot, fast, diff);
	});
});