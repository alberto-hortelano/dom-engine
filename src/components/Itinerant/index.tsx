import './style.css';
import { useEffect, useState, KeyboardEvent, PropsWithChildren } from 'react';
import { changeDirection, MovementKey, movementToClass, movementClassToDirection } from './movement';

export type ItinerantProps = PropsWithChildren<{
	time: number;
	selected: boolean;
	select: () => void,
	keyEvent?: KeyboardEvent,
	top: number;
	left: number;
	speed: number;
}>

export default function Itinerant({ children, time, selected, select, keyEvent, top, left, speed }: ItinerantProps) {
	const [lastTime, setLastTime] = useState(time);
	const [positionTop, setPositionTop] = useState(top);
	const [positionLeft, setPositionLeft] = useState(left);
	const [movement, setMovement] = useState<MovementKey[]>([]);
	const [orientation, setOrientation] = useState('');
	useEffect(() => {
		if (!selected || !keyEvent) {
			setMovement([])
			return;
		}
		console.log("useEffect -> keyEvent", keyEvent);
		setMovement(mov => changeDirection(keyEvent.key, keyEvent.type === 'keydown', mov));
	}, [keyEvent, selected]);
	useEffect(() => {
		const difTime = time - lastTime;
		const newOrientation = movementToClass(movement);
		const [topMultiplier, leftMultiplier] = movementClassToDirection(newOrientation);
		setOrientation(newOrientation);
		setLastTime(time);
		// setPositionTop(positionTop => positionTop + speed * difTime * topMultiplier);
		// setPositionLeft(positionLeft => positionLeft + speed * difTime * leftMultiplier);
	}, [movement, time, lastTime, speed, selected]);

	return <div
		className={['itinerant', orientation].join(' ')}
		onClick={select}
		style={{ top: positionTop, left: positionLeft }}>{
			orientation
		} - {selected ? 'selected' : 'nope'}
		{children}
	</div>
}
