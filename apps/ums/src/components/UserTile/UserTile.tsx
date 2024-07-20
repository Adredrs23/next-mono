import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components';
import { getInitials } from '@/utlls';

export interface UserTileProps {
	profileImageurl?: string;
	name: string;
	designation: string;
	id: string;
}

export function UserTile({
	id,
	name,
	designation,
	profileImageurl,
}: UserTileProps): JSX.Element {
	const initials = getInitials(name);

	return (
		<Link
			className='flex items-center gap-4 hover:bg-muted/50 px-2 py-1 rounded'
			href={`/users/${id}`}
		>
			<Avatar className='hidden h-9 w-9 sm:flex'>
				<AvatarImage src={profileImageurl} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className='grid gap-1'>
				<p className='text-sm font-medium leading-none'>{name}</p>
				<p className='text-sm text-muted-foreground'>{designation}</p>
			</div>
			<div className='ml-auto'>
				<ChevronRightIcon className='h-5 w-5 text-muted-foreground' />
			</div>
		</Link>
	);
}
