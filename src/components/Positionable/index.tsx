import './style.css';
import { PropsWithChildren } from 'react';
import { Positionable } from '../../core/Classes/Positionable';

type Props = {
	selected?: boolean;
};

export default function RxPositionable({
	children,
	size,
	top,
	left,
	selected,
}: PropsWithChildren<Positionable & Props>) {
	return (
		<div
			className={`positionable ${selected ? 'selected' : ''}`}
			style={{
				top,
				left,
				width: size,
				height: size,
				zIndex: parseInt(`${top}`),
			}}
		>
			{children}
		</div>
	);
}
