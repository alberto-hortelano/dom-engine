import './style.scss';
import './human.scss';
import { orientationToClass } from '../../core/orientation';
import { Character } from '../../core/Classes/Character';

type Props = {
	team: string,
	selected?: boolean,
	select: () => void,
}

export default function RxCharacter({ race, orientation, action, team, select }: Character & Props) {
	return <div
		className={[
			race,
			team,
			orientationToClass(orientation),
			action,
		].join(' ')}
		onClick={select}
	></div>
}
