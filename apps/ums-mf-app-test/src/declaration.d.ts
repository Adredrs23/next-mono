declare module 'mfShell/ErrorBoundary' {
	export const ErrorFallback: React.ComponentType<{ error: Error }>;
	export const ErrorBoundary: React.ComponentType<{
		children: React.ReactNode;
	}>;
}

declare module 'mfApp/Button' {
	export type ButtonProps = {
		variant?: 'primary' | 'secondary';
		label: string;
	};

	export const Button: React.ComponentType<ButtonProps>;
}
