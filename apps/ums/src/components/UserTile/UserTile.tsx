import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/Atoms';

export type UserTileProps = {
	profileImageurl?: string;
	name: string;
	designation: string;
	id: string;
};

export const UserTile: React.FC<UserTileProps> = ({
	id,
	name,
	designation,
	profileImageurl,
}) => {
	const getInitials = (name: string) => {
		const names = name.split(' ');
		return names.map((n) => n.charAt(0)).join('');
	};

	const initials = getInitials(name);

	return (
		<Link
			href={`/users/${id}`}
			className="flex items-center gap-4 hover:bg-muted/50 px-2 py-1 rounded"
		>
			<Avatar className="hidden h-9 w-9 sm:flex">
				<AvatarImage src={profileImageurl} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className="grid gap-1">
				<p className="text-sm font-medium leading-none">{name}</p>
				<p className="text-sm text-muted-foreground">{designation}</p>
			</div>
			<div className="ml-auto">
				<ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
			</div>
		</Link>
	);
};
