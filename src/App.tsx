import { View, ViewGroup, Border } from './components.website.kit/components'
import './App.css';

function App() {
	return (
		<View width='250px' height='250px' backgroundColor={['00', 'FF', '00']} styling={
			<Border border={{ borderRadius: '10px'}} />
		} />
	);
}

export default App;
