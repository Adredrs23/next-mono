import { Users2 } from 'lucide-react';

export default function UsersPage() {
	return (
		<div className="w-full">
			<div className="w-full h-auto flex flex-col items-center justify-center ">
				<Users2 className="size-24 opacity-50" />
				Select a user to view details
			</div>
		</div>
	);
}
