import React from 'react';
import { TextLabel$Content, TextLabel, TextLabel$Content$Style, Border, Stroke, Radius } from './components.website.kit/components'
import './App.css';

function App(): React.JSX.Element {
	return (
		<TextLabel height='100%' width='125px' padding={['20px', '20px']} design={
			<Border>
				<Stroke strokeColor={[32, 32, 32]} strokeWidth='5px' />
				<Radius radius={['25px', '25px', '25px', '25px']} />
			</Border>
		} style='italic' fontColor={[255, 255, 255]} value={
			<TextLabel$Content>
				Hello, World!!!
			</TextLabel$Content>
		} backgroundColor={[12, 12, 12]} />
	);
}

export default App;