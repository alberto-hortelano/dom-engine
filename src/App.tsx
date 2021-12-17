import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import PossitionTracker from './components/PossitionTracker';

function App() {
	return (
		<div className="App">
			{
				// running &&
				// <Board size={{ width: 2000, height: 2000 }} initialCharacters={[
				// 	{
				// 		top: 10,
				// 		left: 10,
				// 		speed: 0.2,
				// 	},
				// 	{
				// 		top: 260,
				// 		left: 10,
				// 		speed: 0.1,
				// 	}
				// ]} />
			}
			{
				<PossitionTracker
					startRunning={false}
					size={{ width: 2000, height: 2000 }}
					initialPositionables={[
						{
							top: 60,
							left: 10,
							width: 60,
							height: 60,
							speed: 0.2,
							orientation: [1, 0],
							selected: true,
						},
						{
							top: 260,
							left: 10,
							width: 60,
							height: 60,
							speed: 0.1,
							orientation: [0, 1],
							selected: false,
						}
					]} />
			}
		</div>
	);
}

export default App;
