import { Border, Radius, Stroke, View } from './components.website.kit/components'
import './App.css';
import React from 'react';

function App(): React.JSX.Element {
	return (
		<View height='25vh' width='25vw' backgroundColor={'white'} style={
			<Border>
				<Stroke strokeWidth={'2px'} strokeColor={[122, 122, 0]} />
				<Radius radius={['50%', '50%', '10%', '10%']} />
			</Border>
		} />
	);
}

export default App;