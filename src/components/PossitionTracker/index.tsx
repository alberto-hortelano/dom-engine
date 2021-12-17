import './style.css';
import { useEffect, useState, KeyboardEvent, Dispatch, useReducer } from 'react';
import { MovementKey, changeMovementKeys, movementKeysToOrientation, KeyCodes } from './movement';
import Positionable, { IPositionable } from './Positionable';

type Props = {
	startRunning: boolean,
	initialPositionables: IPositionable[],
	size: {
		width: number;
		height: number;
	}
}
const reducer = (state: State, action: Action) => {
	if (!state.running) {
		return state;
	}
	switch (action.type) {
		case 'animationFrame':
			if (Math.random() < 0.01) {
			}
			break;
		case 'keyPressed':
			state.movementKeys = changeMovementKeys(action.keyEvent.key, action.keyEvent.type === 'keydown', state.movementKeys);
			break;
		default:
			console.error('WRONG ACTION', action)
			return state;
	}
	return { ...state };
}
type State = {
	running: boolean,
	movementKeys: MovementKey[],
}
type Action = {
	type: 'animationFrame',
	time: number,
	newTime: number,
} | {
	type: 'keyPressed',
	keyEvent: KeyboardEvent<HTMLDivElement>,
}
const initialState: State = {
	running: false,
	movementKeys: [],
}
export default function PossitionTracker({ startRunning, size, initialPositionables }: Props) {
	const [time, setTime] = useState(0);
	const [lastTime, setLastTime] = useState(0);
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		window.requestAnimationFrame(newTime => {
			dispatch({
				type: 'animationFrame',
				time,
				newTime
			});
			if (time === newTime) {
				console.error('AAA')
			}
			setLastTime(time)
			setTime(newTime);
		});
	}, [time]);
	return <div
		className="possitionTracker"
		style={size}
		tabIndex={-1}
		onKeyDown={(keyEvent) => {
			dispatch({
				type: 'keyPressed',
				keyEvent,
			})
		}}
		onKeyUp={(keyEvent) => {
			dispatch({
				type: 'keyPressed',
				keyEvent,
			})
		}}
	>
		<div className='menu'>
			{/* <button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button> */}
			<span>-{Math.round(1000 / (time - lastTime))}-</span>
			<span>-{state.movementKeys.join()}-</span>
		</div>
		{/* {positionables.map((positionable, key) => <Positionable
			key={key}
			{...positionable}
			select={() => {
				if (selected) {
					selected.selected = false;
				}
				positionable.selected = true;
				select(positionable);
			}}
		></Positionable>)} */}
	</div>
}
