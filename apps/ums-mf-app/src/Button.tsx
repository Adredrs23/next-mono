export const Button: React.ComponentType<{
	variant: 'primary' | 'secondary';
	label: string;
}> = ({ label, variant = 'primary' }) => (
	<button type='button' className={'ums-btn--' + variant}>
		{label}
	</button>
);
