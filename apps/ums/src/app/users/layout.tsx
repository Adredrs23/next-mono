import type { Metadata } from 'next';
import {
	UsersMainPanel,
	UsersActionPanel,
	UsersNavigationPanel,
} from '@/components';
import { trpc } from '../_trpc/client';

export const metadata: Metadata = {
	title: 'The DayOwls | Users',
	description: 'A social media flatform for writers.',
};

// Fetching data from the server in the layoutd
function getData(): number[] {
	const { data, error } = trpc.getTodos.useQuery();
	// const res = await fetch('http://localhost:3000/api/users', {
	// 	cache: 'no-store',
	// });

	if (error) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	if (!data) {
		throw new Error('Failed to fetch data');
	}

	return data;
}

export default function Users({
	children,
}: Readonly<{
	children: React.ReactNode;
}>): JSX.Element {
	const data = getData();

	return (
		<>
			<UsersNavigationPanel usersList={data} />
			<UsersMainPanel>{children}</UsersMainPanel>
			<UsersActionPanel />
		</>
	);
}
