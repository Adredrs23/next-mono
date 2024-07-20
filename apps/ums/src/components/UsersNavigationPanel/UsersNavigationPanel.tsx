import { Copy } from 'lucide-react';

import {
	Card,
	Button,
	CardTitle,
	CardHeader,
	CardFooter,
	CardContent,
	CardDescription,
} from '@/components/Atoms';
import { UserTile } from '@/components/UserTile';

export type UserType = {
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
};

type UsersListType = Pick<UserType, 'id' | 'name' | 'avatarUrl' | 'jobTitle'>;

export const UsersNavigationPanel = ({
	usersList,
}: {
	usersList: UsersListType[];
}) => {
	return (
		<div>
			<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
				<CardHeader className="flex flex-row items-start bg-muted/50">
					<div className="grid gap-0.5">
						<CardTitle className="group flex items-center gap-2 text-lg">
							Users
							<Button
								size="icon"
								variant="outline"
								className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<Copy className="h-3 w-3" />
								<span className="sr-only">Copy Users List</span>
							</Button>
						</CardTitle>
						<CardDescription>
							One stop shop to manage all your users.
						</CardDescription>
					</div>
				</CardHeader>
				<Card x-chunk="dashboard-01-chunk-5">
					<CardHeader>
						<CardTitle>Active Users</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-x-8 gap-y-4">
						{usersList.map(({ avatarUrl, jobTitle, name, id }) => (
							<UserTile
								key={id}
								profileImageurl={avatarUrl}
								name={name}
								designation={jobTitle}
								id={id}
							/>
						))}
					</CardContent>
				</Card>
				<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
					<div className="text-xs text-muted-foreground">
						Updated{' '}
						<time dateTime="2023-11-23">{new Date().toLocaleString()}</time>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
