import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

export const ErrorFallback: React.ComponentType<{ error: Error }> = ({
	error,
}) => (
	<div>
		<h1>Something went wrong!!!</h1>
		<pre>{error.message}</pre>
	</div>
);

export const ErrorBoundary: React.ComponentType<{
	children: React.ReactNode;
}> = ({ children }) => (
	<ReactErrorBoundary FallbackComponent={ErrorFallback}>
		{children}
	</ReactErrorBoundary>
);
