import { Character } from './Classes/Character';

type Msg = {
	allies: Character[];
	enemies: Character[];
	newTime: number;
	time: number;
};

type Resolver = {
	resolve: (value: Msg) => void;
	reject: (reason?: any) => void;
};

const messageResolvers = new Map<string, Resolver>();

const worker = new Worker('./index.js', {
	type: 'module',
});
const getEvtName = (evnt: MessageEvent<Msg>) => `${evnt.type}-${evnt.data.newTime}`;
worker.addEventListener('message', (evnt: MessageEvent<Msg>) => {
	const evntName = getEvtName(evnt);
	const resolver = messageResolvers.get(getEvtName(evnt));
	if (!resolver) {
		console.error('No Listener for message', evntName, evnt);
		return;
	}
	const { resolve, reject } = resolver;
	resolve(evnt.data);
	console.log('message:', evnt.data);
});
worker.addEventListener('error', (evnt) => {
	console.error('worker error:', evnt);
});
export const getMessage = (evnt: MessageEvent<Msg>) =>
	new Promise((resolve, reject) => {
		messageResolvers.set(getEvtName(evnt), { resolve, reject });
	});
