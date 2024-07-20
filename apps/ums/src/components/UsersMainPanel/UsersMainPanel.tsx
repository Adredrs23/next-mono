import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from '@/components/Atoms';

export type UserDetailsProps = {
	children?: React.ReactNode;
};

export const UsersMainPanel: React.FC<UserDetailsProps> = ({ children }) => {
	return (
		<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
			<Card x-chunk="dashboard-05-chunk-3">
				<CardHeader className="px-7">
					<CardTitle>User Details</CardTitle>
					<CardDescription>Get the details of selected user.</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-8">{children}</CardContent>
			</Card>
		</div>
	);
};
