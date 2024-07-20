'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@repo/ui/components';
import {
	DownloadIcon,
	UserCheckIcon,
	UserMinusIcon,
	UsersIcon,
} from 'lucide-react';
import { UserActionTile } from '@/components/UserActionTile';
import { AddUserModal } from '../AddUserModal';

export function UsersActionPanel(): JSX.Element {
	return (
		<div>
			<Card className='overflow-hidden' x-chunk='dashboard-05-chunk-4'>
				<CardHeader className='flex flex-row items-start bg-muted/50'>
					<div className='grid gap-0.5'>
						<CardTitle className='group flex items-center gap-2 text-lg'>
							User Management
						</CardTitle>
						<CardDescription>Manage your user accounts</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<div className='flex flex-1'>
						<div className='flex w-full flex-col space-y-1'>
							<UserActionTile actionLabel='View Users'>
								<UsersIcon className='h-5 w-5' />
							</UserActionTile>

							<AddUserModal />

							<UserActionTile actionLabel='Edit User'>
								<UserCheckIcon className='h-5 w-5' />
							</UserActionTile>

							<UserActionTile actionLabel='Export Users'>
								<DownloadIcon className='h-5 w-5' />
							</UserActionTile>

							<div className='border-t pt-2 mt-2'>
								<h4 className='text-sm font-semibold'>Admin Actions</h4>
								<div className='flex flex-col space-y-1 mt-2'>
									<UserActionTile actionLabel='Delete User'>
										<UserMinusIcon className='h-5 w-5' />
									</UserActionTile>
									<UserActionTile actionLabel='Activate/Deactivate User'>
										<UserCheckIcon className='h-5 w-5' />
									</UserActionTile>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
