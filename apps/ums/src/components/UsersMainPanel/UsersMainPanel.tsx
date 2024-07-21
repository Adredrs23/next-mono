import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from '@repo/ui/components';
import { type UserMainPanelProps } from './types';

export function UsersMainPanel({ children }: UserMainPanelProps): JSX.Element {
	return (
		<div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
			<Card x-chunk='dashboard-05-chunk-3'>
				<CardHeader className='px-7'>
					<CardTitle>User Details</CardTitle>
					<CardDescription>Get the details of selected user.</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-8'>{children}</CardContent>
			</Card>
		</div>
	);
}
