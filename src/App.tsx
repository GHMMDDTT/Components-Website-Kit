import React from 'react';
import { TextLabel$Content, TextLabel, TextLabel$Content$Style, Border, Stroke, Radius, View } from './components.website.kit/components'
import './App.css';

function App(): React.JSX.Element {
	return (
		<TextLabel height='100%' width='150px' backgroundColor={[0, 0, 0]} fontColor={[255, 255, 255]} content={
			<TextLabel$Content>
				Hello, <TextLabel$Content$Style style={'strong'}>World<TextLabel$Content$Style style={'italic'}>!</TextLabel$Content$Style></TextLabel$Content$Style>?
			</TextLabel$Content>
		} />
	);
}

export default App;