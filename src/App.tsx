import { View } from './components.website.kit/components'
import './App.css';
import React from 'react';

function App(): React.JSX.Element {
	return (
		<View id='david' height='25vh' width='25vw' backgroundColor={[255, 0, 122]} onPressed={() => {
			console.log("Hello");
		}} onReleased={() => {
			console.log("World");
		}} />
	);
}

export default App;
