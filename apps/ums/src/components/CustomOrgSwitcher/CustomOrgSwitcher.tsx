'use client';

import { useOrganizationList } from '@clerk/nextjs';

export function CustomOrgSwitcher(): JSX.Element {
	const { isLoaded, setActive, userMemberships } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	if (!isLoaded) {
		return <>Loading</>;
	}

	return (
		<>
			<ul>
				{userMemberships.data.map((mem) => (
					<li key={mem.id}>
						<span>{mem.organization.name}</span>
						<button
							onClick={() => {
								void setActive({ organization: mem.organization.id });
							}}
							type='button'
						>
							Select
						</button>
					</li>
				))}
			</ul>

			<button
				disabled={!userMemberships.hasNextPage}
				onClick={() => {
					userMemberships.fetchNext();
				}}
				type='button'
			>
				Load more
			</button>
		</>
	);
}
