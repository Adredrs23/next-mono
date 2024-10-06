import React from 'react';

const ErrorBoundary = React.lazy(() =>
	import('mfShell/ErrorBoundary').then((mod) => ({
		default: mod.ErrorBoundary,
	}))
);

const Button = React.lazy(() =>
	import('mfApp/Button').then((mod) => ({
		default: mod.Button,
	}))
);

export const App: React.FC = () => (
	<div>
		<h1>Hello from Module Federation App from the child test!!!</h1>
		<ErrorBoundary>
			<Button label='Test' />
		</ErrorBoundary>
	</div>
);
