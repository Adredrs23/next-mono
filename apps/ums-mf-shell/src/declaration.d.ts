declare module 'mfApp/Button' {
	export type ButtonProps = {
		variant?: 'primary' | 'secondary';
		label: string;
	};

	export const Button: React.ComponentType<ButtonProps>;
}