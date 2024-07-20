import {
	Textarea,
	Input,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Badge,
} from '@/components/Atoms';

import { UserType } from '@/components/UsersNavigationPanel';

export const UserContentPanel = ({
	userDetails,
}: {
	userDetails: UserType;
}) => {
	const {
		activeStatus,
		avatarUrl,
		email,
		jobTitle,
		name,
		phoneNumber,
		address,
		dateOfBirth,
		dateOfJoining,
		skypeId,
	} = userDetails;

	const getInitials = (name: string) => {
		const names = name.split(' ');
		return names.map((n) => n.charAt(0)).join('');
	};

	const initials = getInitials(name);

	return (
		<>
			<div className="flex items-center">
				<Avatar className="mr-4">
					<AvatarImage src={avatarUrl} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div>
					<h3 className="text-lg font-medium">{name}</h3>
					<div className="text-muted-foreground">
						<span className="font-medium">Designation:</span> {jobTitle}
					</div>
					<div className="text-muted-foreground">
						<span className="font-medium">Status:</span>{' '}
						<Badge variant={activeStatus ? 'outline' : 'destructive'}>
							{activeStatus ? 'Active' : 'Inactive'}
						</Badge>
					</div>
				</div>
			</div>
			<Tabs defaultValue="profile">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="contact">Contact</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<div className="w-full pl-6">
						<div className="space-y-4">
							<div className="flex items-center">
								<label className="w-24 font-medium">Date of Birth:</label>
								<Input
									readOnly
									value={new Date(dateOfBirth).toLocaleDateString()}
									className="w-full"
								/>
							</div>
							<div className="flex items-center">
								<label className="w-24 font-medium">Joined:</label>
								<Input
									readOnly
									value={new Date(dateOfJoining).toLocaleDateString()}
									className="w-full"
								/>
							</div>
							<div className="flex items-start">
								<label className="w-24 font-medium">Address:</label>
								<Textarea readOnly value={address} className="w-full" />
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="contact">
					<div className="w-full pl-6">
						<div className="space-y-4">
							<div className="flex items-center">
								<label className="w-24 font-medium">Mobile:</label>
								<Input readOnly value={phoneNumber} className="w-full" />
							</div>
							<div className="flex items-center">
								<label className="w-24 font-medium">Skype ID:</label>
								<Input readOnly value={skypeId} className="w-full" />
							</div>
							<div className="flex items-center">
								<label className="w-24 font-medium">Email:</label>
								<Input readOnly value={email} className="w-full" />
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</>
	);
};
