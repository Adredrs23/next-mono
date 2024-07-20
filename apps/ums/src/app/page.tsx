import Link from 'next/link';

import { Button } from '@/components/Atoms';

export default function Page() {
	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
			<h1>Welcome to the Enix Demo App</h1>
			<p>This is a demo app for Enix project.</p>
			<p>
				Click on the links below to navigate to the different pages and see it
				in action.
			</p>
			<Button variant="outline">
				<Link href="/users">Users</Link>
			</Button>
		</div>
	);
}
