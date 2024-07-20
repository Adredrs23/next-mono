import type { Metadata } from 'next';

import {
	UsersMainPanel,
	UsersActionPanel,
	UsersNavigationPanel,
} from '@/components';

export const metadata: Metadata = {
	title: 'Enix Demo | Users',
	description: 'Demo for Enix',
};

// Fetching data from the server in the layoutd
async function getData() {
	const res = await fetch('http://localhost:3000/api/users', {
		cache: 'no-store',
	});

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	const getUsersResponse = await res.json();

	return getUsersResponse.data;
}

export default async function Users({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = await getData();

	return (
		<>
			<UsersNavigationPanel usersList={data} />
			<UsersMainPanel>{children}</UsersMainPanel>
			<UsersActionPanel />
		</>
	);
}
