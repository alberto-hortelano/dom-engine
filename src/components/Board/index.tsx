import './style.css';
import { useEffect, useState, KeyboardEvent, Dispatch } from 'react';
import Character from '../Character';
import Itinerant, { ItinerantProps } from '../Itinerant';
import Collider from '../Collider';
import PossitionTracker from '../PossitionTracker';

type Props = {
	initialCharacters: Pick<ItinerantProps, 'top' | 'left' | 'speed'>[],
	size: {
		width: number;
		height: number;
	}
}

const loop = (newTime: number, setTime: Dispatch<React.SetStateAction<number>>) => {
	setTime(newTime);
	window.requestAnimationFrame(time => loop(time, setTime));
}
export default function Board({ size, initialCharacters }: Props) {
	const [characters, setCharacters] = useState(initialCharacters);
	const [selectedCharacter, setSelectedCharacter] = useState(initialCharacters[0]);
	const [keyEvent, setKeyEvent] = useState<KeyboardEvent>();
	const [time, setTime] = useState(0);
	useEffect(() => {
		// window.requestAnimationFrame(time => loop(time, setTime));
	}, []);
	return <div
		id="board"
		style={size}
		tabIndex={-1}
		onKeyDown={(e) => {
			setKeyEvent(e);
		}}
		onKeyUp={(e) => {
			setKeyEvent(e);
		}}
	>
		{
			characters.map((character, key) => <Itinerant
				key={key}
				time={time}
				selected={selectedCharacter === character}
				select={() => setSelectedCharacter(character)}
				keyEvent={keyEvent}
				top={character.top}
				left={character.left}
				speed={character.speed}
			>
				<Collider
				>
					<Character
					// checkColision={() => {

					// }}
					/>
				</Collider>
			</Itinerant>)
		}

	</div>
}
