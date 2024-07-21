import {
	WelcomeEmail as WelcomeEmailTemplate,
	type WelcomeEmailProps,
} from '@repo/ui/components';

export function WelcomeEmail({
	username,
}: Pick<WelcomeEmailProps, 'username'>): JSX.Element {
	return <WelcomeEmailTemplate username={username} />;
}
