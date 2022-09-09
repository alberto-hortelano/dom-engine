import './App.css';
import RxBoard from './Board';
import { allies, selected, enemies, obstacles } from '../state/game';

function App() {
	return (
		<div className="App">
			{
				<RxBoard
					startRunning={true}
					size={{ width: 2000, height: 2000 }}
					allies={allies}
					selected={selected}
					enemies={enemies}
					obstacles={obstacles}
				/>
			}
		</div>
	);
}

export default App;
