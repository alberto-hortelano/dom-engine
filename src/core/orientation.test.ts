import { getNextOrientation, OrientationCode } from './orientation';

describe('getNextOrientation', () => {
	test('from East', () => {
		let step = 1;
		const orientations: OrientationCode[] = [];
		while (step <= 4) {
			orientations.push(getNextOrientation(OrientationCode.East, step++));
		}
		expect(orientations).toEqual([151, 155, 83, 87]);
	});
	test('from North', () => {
		let step = 1;
		const orientations: OrientationCode[] = [];
		while (step <= 4) {
			orientations.push(getNextOrientation(OrientationCode.North, step++));
		}
		expect(orientations).toEqual([155, 152, 68, 65]);
	});
	test('from NorthWest', () => {
		let step = 1;
		const orientations: OrientationCode[] = [];
		while (step <= 4) {
			orientations.push(getNextOrientation(OrientationCode.NorthWest, step++));
		}
		expect(orientations).toEqual([87, 65, 155, 148]);
	});
	test('step 0', () => {
		const orientation = getNextOrientation(OrientationCode.NorthWest, 0);
		expect(orientation).toEqual(OrientationCode.NorthWest);
	});
});
