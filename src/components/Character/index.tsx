import './style.css';
import { orientationToClass } from '../../core/orientation';
import { Character } from '../../core/Classes/Character';

type Props = {
	team: string,
	selected?: boolean,
	select: () => void,
}

export default function RxCharacter({ orientation, moving, team, select }: Character & Props) {
	return <div
		className={[
			'character',
			team,
			orientationToClass(orientation),
			moving ? 'move' : 'iddle',
		].join(' ')}
		onClick={select}
	></div>
}
