/* eslint-disable max-lines-per-function */
import { Character } from './Classes/Character';
import { Obstacle } from './Classes/Obstacle';
import { characterObstacleCollision, collision } from './collision';
import { Line } from './geometry';

/**
 * KeyCodes:
 * w: 87
 * d: 68
 * s: 83
 * a: 65
 * w  ↑
 * wd ↗
 * d  →
 * sd ↘
 * s  ↓
 * sa ↙
 * a  ←
 * wa ↖
 */
describe('collision', () => {
	describe('collision', () => {
		test('between 2 characters', () => {
			const size = 20;
			const characterA = new Character({
				size,
				top: 300,
				left: 400,
			});
			console.log('test -> characterA', characterA);
			const characterB = new Character({
				size,
				top: 301,
				left: 401,
			});
			console.log('test -> characterB', characterB);
			const collide = collision(characterA, characterB);
			console.log('test -> collide', collide);
			expect(collide).toBeTruthy();
		});
	});
	describe.only('characterObstacleCollision', () => {
		test('returns true if the character is touching the line', () => {
			const character = new Character({
				size: 50,
				top: 300,
				left: 400,
			});
			console.log('test -> character', character);
			const obstacle = new Obstacle({
				size: 60,
				top: 300,
				left: 400,
				shape: new Line(
					{
						top: 14,
						left: 0,
					},
					{
						top: 30,
						left: 60,
					},
				),
			});
			console.log('test -> obstacle', obstacle);
			const collide = characterObstacleCollision(character, obstacle as Obstacle & { shape: Line });
			console.log('test -> collide', collide);
			expect(collide).toBeTruthy();
		});
	});
});
