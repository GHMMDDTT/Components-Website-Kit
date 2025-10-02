import { TextLabel$Content, TextLabel, TextLabel$Content$Style } from './components.website.kit/components'
import './App.css';
import React from 'react';

function App(): React.JSX.Element {
	return (
		<TextLabel height='20px' width='20px' value={
			<TextLabel$Content>
				Hello <TextLabel$Content$Style style={'strong'}>World<TextLabel$Content$Style style={'underline'} color={[255, 0, 0]}>!!!</TextLabel$Content$Style></TextLabel$Content$Style>
			</TextLabel$Content>
		} />
	);
}

export default App;