import { UserContentPanel } from '@/components';

// Fetching data from the server in the layoutd
async function getUserDetail(userId: string) {
	const res = await fetch(`http://localhost:3000/api/users/${  userId}`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}
	const getUserDetailResponse = await res.json();

	return getUserDetailResponse.data;
}

export default async function UserDetails({
	params: { userId },
}: {
	params: { userId: string };
}) {
	const data = await getUserDetail(userId);

	return <UserContentPanel userDetails={data} />;
}
