import { moveCharacters } from "./lib.js";
import { ICharacter, State } from "./types.js";

type Msg = {
	allies: ICharacter[],
	enemies: ICharacter[],
	newTime: number,
	time: number,
};
self.addEventListener("message", (evt: MessageEvent<Msg>) => {
	switch (evt.type) {
		case 'animationFrame':
			const allies = moveCharacters(evt.data.allies, evt.data.newTime - evt.data.time);
			const enemies = moveCharacters(evt.data.enemies, evt.data.newTime - evt.data.time);
			return {
				allies,
				enemies,
			};
		default:
			console.error('WRONG EVENT', evt);
			return evt;
	}
});
