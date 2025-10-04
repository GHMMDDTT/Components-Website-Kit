import React from 'react';
import { TextLabel$Content, TextLabel, TextLabel$Content$Style, Border, Stroke, Radius, View, LinearLayout } from './components.website.kit/components'
import './App.css';

function App(): React.JSX.Element {
	return (
		<LinearLayout width='100vw' height='100vh' orientation='horizontal'>
			<TextLabel height='100%' width='150px' margin={'1%'} content={
				<TextLabel$Content>
					Hello, <TextLabel$Content$Style style={'strong'}>User<TextLabel$Content$Style style={'italic'}>!</TextLabel$Content$Style></TextLabel$Content$Style>
				</TextLabel$Content>
			} />
			<TextLabel height='100%' width='150px' margin={'1%'} content={
				<TextLabel$Content>
					in this proyect!
				</TextLabel$Content>
			} />
			<LinearLayout width='150px' height='100%' orientation='vertical'>
				<TextLabel height='100%' width='150px' margin={'1%'} content={
					<TextLabel$Content>
						called: <TextLabel$Content$Style style={'strong'}>CWK<TextLabel$Content$Style style={'italic'}>!</TextLabel$Content$Style></TextLabel$Content$Style>
					</TextLabel$Content>
				} />
				<TextLabel height='100%' width='150px' margin={'1%'} content={
					<TextLabel$Content>
						Using LinearLayout:Horizontal
					</TextLabel$Content>
				} />
			</LinearLayout>
		</LinearLayout>
	);
}

export default App;