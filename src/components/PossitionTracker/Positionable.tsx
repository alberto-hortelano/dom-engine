import './style.css';
import { useEffect, useState, PropsWithChildren } from 'react';
import { Orientation } from './movement';

export interface IPositionable {
	top: number;
	left: number;
	width: number;
	height: number;
	speed: number;
	orientation: Orientation;
	selected: boolean;
}

type Props = {
	select: () => void;
}

export default function Positionable({ children, top, left, width, height, orientation, selected, select }: PropsWithChildren<IPositionable & Props>) {

	return <div
		className={['itinerant', orientation].join(' ')}
		style={{ top, left, width, height }}
		onClick={select}
	>
		{orientation.join('-')}
		<br />
		{selected ? 'selected' : 'nope'}
		{children}
	</div>
}