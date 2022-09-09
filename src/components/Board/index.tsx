import { useEffect, useReducer, useState } from 'react';
import { Character } from '../../core/Classes/Character';
import { Obstacle } from '../../core/Classes/Obstacle';
import { Positionable } from '../../core/Classes/Positionable';
import { defaultState, Game } from '../../core/game';
import { onKeyPress } from '../../core/keyboard';
import { scrollToSelected } from '../../core/movement';
import { reducer } from '../../state/reducer';
import RxCharacter from '../Character';
import RxObstacle from '../Obstacle';
import RxPositionable from '../Positionable';
import './style.scss';

type Props = {
	startRunning: boolean;
	allies: Partial<Character>[];
	enemies: Partial<Character>[];
	obstacles: Partial<Obstacle>[];
	selected: Character['id'];
	size: {
		width: number;
		height: number;
	};
};
const fillState = (partialState: Partial<Game>) => {
	const game: Game = {
		...defaultState,
		...partialState,
	};
	return game;
};
const fillMap = <T extends Positionable>(partials: Partial<T>[], constructor: (partial: Partial<T>) => T) =>
	partials.reduce((map, partial) => {
		const full = constructor(partial);
		map.set(full.id, full);
		return map;
	}, new Map<T['id'], T>());
const arrLength = 100;
const debounceFactor = 10;
const actions: string[] = [];
while (actions.length < 50) {
	actions.push(`action${actions.length + 1}`);
}
// eslint-disable-next-line max-lines-per-function
export default function RxBoard({ startRunning, size, allies, enemies, obstacles, selected }: Props) {
	const [time, setTime] = useState(0);
	const [debouncer, setDebouncer] = useState(0);
	const [fps, setFps] = useState(0);
	const [fpsHistory, setFpsHistory] = useState([0]);
	const [frameTime, setFrameTime] = useState(0);
	const [frameTimes, setFrameTimes] = useState([0]);
	const [fullScreen, setFullScreen] = useState(false);
	const [game, dispatch] = useReducer(
		reducer,
		fillState({
			...defaultState,
			running: startRunning,
			allies: fillMap<Character>(allies, (partial) => new Character(partial)),
			enemies: fillMap<Character>(enemies, (partial) => new Character(partial)),
			obstacles: fillMap<Obstacle>(obstacles, (partial) => new Obstacle(partial)),
			selected,
		}),
	);
	useEffect(() => {
		window.requestAnimationFrame(async (newTime) => {
			setDebouncer(debouncer + 1);
			dispatch({
				type: 'animationFrame',
				time,
				newTime,
			});
			if (debouncer % debounceFactor === 0 || debouncer < arrLength) {
				// Frame times
				setFrameTime(newTime - time);
				while (frameTimes.length > arrLength - 1) {
					frameTimes.shift();
				}
				frameTimes.push(frameTime);
				setFrameTimes(frameTimes);
				// FPS
				setFps(Math.round(1000 / (newTime - time)));
				while (fpsHistory.length > arrLength - 1) {
					fpsHistory.shift();
				}
				fpsHistory.push(fps);
				setFpsHistory(fpsHistory);
			}

			setTime(newTime);
		});
	}, [time]);
	useEffect(() => {
		(window as any).dispatch = dispatch;
		(window as any).getState = () => game;
	}, []);
	return (
		<div
			className="board"
			style={{
				...size,
			}}
			tabIndex={-1}
			onKeyDown={(keyEvent) => {
				keyEvent.preventDefault();
				onKeyPress(keyEvent, dispatch, game);
			}}
			onKeyUp={(keyEvent) => {
				keyEvent.preventDefault();
				onKeyPress(keyEvent, dispatch, game);
			}}
			onBlur={() => {
				dispatch({ type: 'blur' });
			}}
		>
			<div className="menu">
				<button
					onClick={() => {
						dispatch({ type: 'switch' });
					}}
				>
					{game.running ? 'Stop' : 'Start'}
				</button>
				<select
					name="action"
					id="action"
					onChange={(e) => {
						game.allies.forEach((ally) => {
							ally.action = e.target.value as any;
						});
						dispatch({
							type: 'debug',
							game: {
								...game,
							},
						});
					}}
				>
					{actions.map((action, k) => (
						<option key={k} value={action}>
							{action}
						</option>
					))}
				</select>
				<button
					onClick={() => {
						game.allies.forEach((ally) => {
							ally.action = `action${parseInt(ally.action.replace(/\D/g, '')) + 1}` as any;
							console.log('RxBoard -> ally.action', ally.action);
						});
						dispatch({
							type: 'debug',
							game: {
								...game,
							},
						});
					}}
				>
					++{' '}
				</button>
				<button
					onClick={() => {
						if (fullScreen) {
							document.exitFullscreen();
						} else {
							document.documentElement.requestFullscreen();
						}
						setFullScreen(!fullScreen);
					}}
				>
					Full screen
				</button>
				<span>-{Math.floor(fpsHistory.reduce((sum, fps) => sum + fps) / arrLength)}-</span>
				<span>-={Math.floor(frameTimes.reduce((sum, ft) => sum + ft) / arrLength)}=-</span>
				<span>-{game.movementKeys.join()}-</span>
			</div>
			<div id="start" className="mark"></div>
			<div id="end" className="mark"></div>
			<div id="selected" className="mark"></div>
			<div id="line"></div>
			<div id="circle"></div>
			{[...game.allies.values()].map((ally, key) => (
				<RxPositionable selected={game.selected === ally.id} key={key} {...ally}>
					<RxCharacter
						{...ally}
						team="ally"
						select={() => {
							dispatch({
								type: 'select',
								selected: ally.id,
							});
							scrollToSelected(ally, true);
						}}
					/>
				</RxPositionable>
			))}
			{[...game.enemies.values()].map((enemy, key) => (
				<RxPositionable key={key} {...enemy}>
					<RxCharacter
						{...enemy}
						team="enemy"
						select={() => {
							dispatch({
								type: 'selectTarget',
								target: enemy.id,
							});
						}}
					/>
				</RxPositionable>
			))}
			{[...game.obstacles.values()].map((obstacle, key) => (
				<RxPositionable key={key} {...obstacle}>
					<RxObstacle {...obstacle} />
				</RxPositionable>
			))}
		</div>
	);
}
