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
} from '@repo/ui/components';
import type { UserType } from '@/components/UsersNavigationPanel';
import { getInitials } from '@/utlls';

export function UserContentPanel({
	userDetails,
}: {
	userDetails: UserType;
}): JSX.Element {
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

	const initials = getInitials(name);

	return (
		<>
			<div className='flex items-center'>
				<Avatar className='mr-4'>
					<AvatarImage src={avatarUrl} />
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
				<div>
					<h3 className='text-lg font-medium'>{name}</h3>
					<div className='text-muted-foreground'>
						<span className='font-medium'>Designation:</span> {jobTitle}
					</div>
					<div className='text-muted-foreground'>
						<span className='font-medium'>Status:</span>{' '}
						<Badge variant={activeStatus ? 'outline' : 'destructive'}>
							{activeStatus ? 'Active' : 'Inactive'}
						</Badge>
					</div>
				</div>
			</div>
			<Tabs defaultValue='profile'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='contact'>Contact</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<div className='w-full pl-6'>
						<div className='space-y-4'>
							<div className='flex items-center'>
								<label className='w-24 font-medium' htmlFor='dateOfBirth'>
									Date of Birth:
								</label>
								<Input
									className='w-full'
									id='dateOfBirth'
									readOnly
									value={new Date(dateOfBirth).toLocaleDateString()}
								/>
							</div>
							<div className='flex items-center'>
								<label className='w-24 font-medium' htmlFor='dateOfJoining'>
									Joined:
								</label>
								<Input
									className='w-full'
									id='dateOfJoining'
									readOnly
									value={new Date(dateOfJoining).toLocaleDateString()}
								/>
							</div>
							<div className='flex items-start'>
								<label className='w-24 font-medium' htmlFor='address'>
									Address:
								</label>
								<Textarea
									className='w-full'
									id='address'
									readOnly
									value={address}
								/>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='contact'>
					<div className='w-full pl-6'>
						<div className='space-y-4'>
							<div className='flex items-center'>
								<label className='w-24 font-medium' htmlFor='phoneNumber'>
									Mobile:
								</label>
								<Input
									className='w-full'
									id='phoneNumber'
									readOnly
									value={phoneNumber}
								/>
							</div>
							<div className='flex items-center'>
								<label className='w-24 font-medium' htmlFor='skypeId'>
									Skype ID:
								</label>
								<Input
									className='w-full'
									id='skypeId'
									readOnly
									value={skypeId}
								/>
							</div>
							<div className='flex items-center'>
								<label className='w-24 font-medium' htmlFor='email'>
									Email:
								</label>
								<Input className='w-full' id='email' readOnly value={email} />
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</>
	);
}
