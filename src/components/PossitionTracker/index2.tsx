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
// const buildUpdateFps = (fps: number[], setFps: Dispatch<React.SetStateAction<number[]>>) => (time: number) => {
// 	fps.push(time);
// 	if (fps.length > 10) {
// 		fps.shift();
// 	}
// 	setFps([...fps]);
// }
// const loop = (newTime: number, setTime: Dispatch<React.SetStateAction<number>>, updateFps: (time: number) => void, running: boolean) => {
// 	setTime(newTime);
// 	updateFps(newTime);
// 	running && window.requestAnimationFrame(time => loop(time, setTime, updateFps, running));
// }
const movementKeysReducer = (state: { movementKeys: MovementKey[] }, action: {
	time?: number,
	selected?: IPositionable,
	keyEvent?: KeyboardEvent,
	setPositionables?: Dispatch<React.SetStateAction<IPositionable[]>>,
	positionables?: IPositionable[],
}) => {
	if (!action.selected || !action.keyEvent) {
		console.log('RESET')
		return { movementKeys: [] };
	}
	console.log("movementKeysReducer -> selected.orientation", action.selected.orientation.join('-'));
	action.selected.orientation = movementKeysToOrientation(state.movementKeys);
	action.setPositionables && action.setPositionables(JSON.parse(JSON.stringify(action.positionables)))
	return { movementKeys: changeMovementKeys(action.keyEvent.key, action.keyEvent.type === 'keydown', state.movementKeys) }
}
const fpsReducer = (state: { fps: number[] }, action: {
	time: number,
}) => {
	state.fps.push(action.time);
	if (state.fps.length > 10) {
		state.fps.shift();
	}
	return { fps: [...state.fps] };
}



const reducer = (state: { movementKeys: MovementKey[] }, action: {
	keyEvent: KeyboardEvent,
	time: number,
}) => {
	const movementKeys = changeMovementKeys(action.keyEvent.key, action.keyEvent.type === 'keydown', state.movementKeys)
	return { movementKeys };
}
const reducer2 = (state: {
	movementKeys: MovementKey[],
	time: number,
	selected?: IPositionable,
}, action: {
	keyEvent: KeyboardEvent,
	positionables: IPositionable[],
}) => {
	if (!state.selected || !action.keyEvent) {
		console.log('RESET')
		return { movementKeys: [] };
	}
	console.log("movementKeysReducer -> selected.orientation", state.selected.orientation.join('-'));
	state.selected.orientation = movementKeysToOrientation(state.movementKeys);
	return { movementKeys: changeMovementKeys(action.keyEvent.key, action.keyEvent.type === 'keydown', state.movementKeys), time: state.time, selected: state.selected }
}
type InitialState = {
	movementKeys: MovementKey[],
}
const initialState: InitialState = {
	movementKeys: [],
}
export default function PossitionTracker({ startRunning, size, initialPositionables }: Props) {
	// const [state, dispatch] = useReducer(reducer, {
	// 	movementKeys: [],
	// 	time: 0,
	// 	selected: initialPositionables.find(positionable => positionable.selected),
	// });


	const [state, dispatch] = useReducer(reducer, initialState);


	const [running, setRunning] = useState(startRunning);
	const [fps, setFps] = useReducer(fpsReducer, { fps: [] });
	const [positionables, setPositionables] = useState<IPositionable[]>(initialPositionables);
	const [keyEvent, setKeyEvent] = useState<KeyboardEvent>();
	const [time, setTime] = useState(0);
	const [lastTime, setLastTime] = useState(time);
	const [selected, select] = useState<IPositionable | undefined>(positionables.find(positionable => positionable.selected));
	const [movementKeys, setMovementKeys] = useReducer(movementKeysReducer, { movementKeys: [] });
	useEffect(() => {
		if (!running) {
			setTime(0);
			setLastTime(() => 0);
			return;
		}
		if (!time) {
			window.requestAnimationFrame(setTime);
			return;
		}
		if (!lastTime) {
			setLastTime(() => time);
			window.requestAnimationFrame(setTime);
			return;
		}
		setFps({ time });
		const difTime = time - lastTime;
		setPositionables(positionables => {
			positionables.forEach(positionable => {
				const speedTime = positionable.speed * difTime;
				positionable.top = positionable.top + speedTime * positionable.orientation[0];
				positionable.left = positionable.left + speedTime * positionable.orientation[1];
			});
			return JSON.parse(JSON.stringify(positionables))
		})
		setLastTime(() => time);
		window.requestAnimationFrame(setTime);
	}, [time, lastTime, running]);
	useEffect(() => {
		if (keyEvent) {
			dispatch({
				keyEvent, time
			});
		}
		// setMovementKeys({ keyEvent, selected, setPositionables, positionables })
		// setMovementKeys(mov => {
		// 	if (!selected || !keyEvent) {
		// 		console.log('RESET')
		// 		return [];
		// 	}
		// 	console.log("useEffect -> selected.orientation", selected.orientation.join('-'));
		// 	selected.orientation = movementKeysToOrientation(movementKeys);
		// 	setPositionables(JSON.parse(JSON.stringify(positionables)))
		// 	return changeMovementKeys(keyEvent.key, keyEvent.type === 'keydown', mov)
		// });
	}, [keyEvent]);
	return <div
		className="possitionTracker"
		style={size}
		tabIndex={-1}
		onKeyDown={(e) => {
			setKeyEvent(e);
		}}
		onKeyUp={(e) => {
			setKeyEvent(e);
		}}
	>
		<div className='menu'>
			<button onClick={() => setRunning(!running)}>{running ? 'Stop' : 'Start'}</button>
			<p style={{
				position: 'absolute',
				top: 0,
				left: 0,
			}}>-{Math.round(10000 / (fps.fps[9] - fps.fps[0]))}-{fps.fps.length}-{movementKeys.movementKeys.join()}-</p>
		</div>
		{positionables.map((positionable, key) => <Positionable
			key={key}
			{...positionable}
			select={() => {
				if (selected) {
					selected.selected = false;
				}
				positionable.selected = true;
				select(positionable);
			}}
		></Positionable>)}
	</div>
}
