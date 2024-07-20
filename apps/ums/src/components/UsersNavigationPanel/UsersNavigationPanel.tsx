import { Copy } from 'lucide-react';
import {
	Card,
	Button,
	CardTitle,
	CardHeader,
	CardFooter,
	CardContent,
	CardDescription,
} from '@repo/ui/components';
import { UserTile } from '@/components/UserTile';

export interface UserType {
	id: string;
	jobTitle: string;
	name: string;
	avatarUrl: string;
	activeStatus: boolean;
	email: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	dateOfBirth: string;
	dateOfJoining: string;
	address: string;
	phoneNumber: string;
	website: string;
	company: string;
	skypeId: string;
}

type UsersListType = Pick<UserType, 'id' | 'name' | 'avatarUrl' | 'jobTitle'>;

export function UsersNavigationPanel({
	usersList,
}: {
	usersList: UsersListType[];
}): JSX.Element {
	return (
		<div>
			<Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
				<CardHeader className='flex flex-row items-start bg-muted/50'>
					<div className='grid gap-0.5'>
						<CardTitle className='group flex items-center gap-2 text-lg'>
							Users
							<Button
								className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
								size='icon'
								variant='outline'
							>
								<Copy className='h-3 w-3' />
								<span className='sr-only'>Copy Users List</span>
							</Button>
						</CardTitle>
						<CardDescription>
							One stop shop to manage all your users.
						</CardDescription>
					</div>
				</CardHeader>
				<Card x-chunk='dashboard-01-chunk-5'>
					<CardHeader>
						<CardTitle>Active Users</CardTitle>
					</CardHeader>
					<CardContent className='grid gap-x-8 gap-y-4'>
						{usersList.map(({ avatarUrl, jobTitle, name, id }) => (
							<UserTile
								designation={jobTitle}
								id={id}
								key={id}
								name={name}
								profileImageurl={avatarUrl}
							/>
						))}
					</CardContent>
				</Card>
				<CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
					<div className='text-xs text-muted-foreground'>
						Updated{' '}
						<time dateTime='2023-11-23'>{new Date().toLocaleString()}</time>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
