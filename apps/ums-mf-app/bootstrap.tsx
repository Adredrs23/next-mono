import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './src/App';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const root = createRoot(document.getElementById('root')!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
