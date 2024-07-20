'use client';

import { FC, useState } from 'react';
import { UserPlusIcon } from 'lucide-react';

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Button,
	Label,
	Input,
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Progress,
} from '@repo/ui';
import { UserPartialType, UserType } from '@/types/interfaces';
import { UserActionTile } from '../UserActionTile';
import {
	AddUserStep1Schema,
	AddUserStep2Schema,
	userSchema,
} from '@/types/zodSchemas';
import { set, ZodError, ZodFormattedError } from 'zod';

export function AddUserModal() {
	const [currentStep, setCurrentStep] = useState(1);
	const [errors, setErrors] =
		useState<ZodFormattedError<UserPartialType> | null>(null);

	const [formData, setFormData] = useState<UserType>({
		name: '',
		email: '',
		phone: '',
		address: '',
		role: '',
		github: '',
		linkedin: '',
		skypeid: '',
		dob: '',
		doj: '',
	});

	const handleInputChange = (e: { target: { id: string; value: string } }) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const handleNextStep = () => {
		if (!validate()) return;
		setCurrentStep(currentStep + 1);
		// Reset the form data for step 2
		setFormData(() => ({
			...formData,
			role: '',
			github: '',
			linkedin: '',
			skypeid: '',
			dob: '',
			doj: '',
		}));
		// Setting the form errors for step 1 to null as there are no errors to show when step 1 is complete and then only we allow the user to move to step 2
		setErrors(null);
	};

	const handlePrevStep = () => {
		// We will simply allow the user to go back to step 1 if they are on step 2, no need to validate
		setCurrentStep(currentStep - 1);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// validate the form data for step 2 by calling the validate function
		if (!validate()) return;

		console.log(formData);
	};

	const validate = () => {
		if (currentStep === 1) {
			const { name, email, phone, address } = formData;

			const result = AddUserStep1Schema.safeParse({
				name,
				email,
				phone,
				address,
			});

			if (!result.success) {
				const errors = result.error.format();
				console.log(errors);
				setErrors(errors);
				return false;
			}
		} else {
			const result = AddUserStep2Schema.safeParse(formData);
			if (!result.success) {
				const errors = result.error.format();
				console.log(errors);
				setErrors(errors);
				return false;
			}
		}

		return true;
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<UserActionTile actionLabel='Add User'>
					<UserPlusIcon className='h-5 w-5' />
				</UserActionTile>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[600px]'>
				<DialogHeader>
					<div className='flex items-center justify-between'>
						<DialogTitle>Add New User</DialogTitle>
					</div>
					<DialogDescription>
						Fill out the form to add a new user to the system.
					</DialogDescription>
					<div className='flex items-center justify-between mt-4'>
						<div className='flex items-center space-x-2'>
							<div
								className={`px-3 py-1 rounded-md text-sm font-medium ${
									currentStep === 1
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								Step 1
							</div>
							<div
								className={`px-3 py-1 rounded-md text-sm font-medium ${
									currentStep === 2
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								Step 2
							</div>
						</div>
					</div>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 py-4'>
						{currentStep === 1 && (
							<div className='grid gap-4'>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='name'>Name</Label>
									<Input
										id='name'
										placeholder='Enter name'
										value={formData.name}
										onChange={handleInputChange}
										className={errors?.name ? 'border-red-500' : ''}
									/>
									{errors?.name && <Errors errors={errors.name._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										id='email'
										type='email'
										placeholder='Enter email'
										value={formData.email}
										onChange={handleInputChange}
										className={errors?.email ? 'border-red-500' : ''}
									/>
									{errors?.email && <Errors errors={errors.email._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='phone'>Phone</Label>
									<Input
										id='phone'
										type='tel'
										placeholder='Enter phone number'
										value={formData.phone}
										onChange={handleInputChange}
										className={errors?.phone ? 'border-red-500' : ''}
									/>
									{errors?.phone && <Errors errors={errors.phone._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='address'>Address</Label>
									<Input
										id='address'
										placeholder='Enter address'
										value={formData.address}
										onChange={handleInputChange}
										className={errors?.address ? 'border-red-500' : ''}
									/>
									{errors?.address && (
										<Errors errors={errors.address._errors} />
									)}
								</div>
							</div>
						)}
						{currentStep === 2 && (
							<div className='grid gap-4'>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='role'>Role</Label>
									<Select
										// id="role"
										value={formData.role}
										// className={errors?.role ? 'border-red-500' : ''}
										onValueChange={(role) =>
											setFormData({ ...formData, role: role })
										}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='Select role' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='admin'>Admin</SelectItem>
											<SelectItem value='manager'>Manager</SelectItem>
											<SelectItem value='user'>User</SelectItem>
										</SelectContent>
									</Select>
									{errors?.role && <Errors errors={errors.role._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='github'>Github</Label>
									<Input
										id='github'
										placeholder='Enter Github username'
										value={formData.github}
										onChange={handleInputChange}
										className={errors?.github ? 'border-red-500' : ''}
									/>
									{errors?.github && <Errors errors={errors.github._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='linkedin'>LinkedIn</Label>
									<Input
										id='linkedin'
										placeholder='Enter LinkedIn profile URL'
										value={formData.linkedin}
										onChange={handleInputChange}
										className={errors?.linkedin ? 'border-red-500' : ''}
									/>
									{errors?.linkedin && (
										<Errors errors={errors.linkedin._errors} />
									)}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='skypeid'>Skype ID</Label>
									<Input
										id='skypeid'
										placeholder='Enter Skype ID'
										value={formData.skypeid}
										onChange={handleInputChange}
										className={errors?.skypeid ? 'border-red-500' : ''}
									/>
									{errors?.skypeid && (
										<Errors errors={errors.skypeid._errors} />
									)}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='dob'>Date of Birth</Label>
									<Input
										id='dob'
										type='date'
										placeholder='Enter date of birth'
										value={formData.dob}
										onChange={handleInputChange}
										className={errors?.dob ? 'border-red-500' : ''}
									/>
									{errors?.dob && <Errors errors={errors.dob._errors} />}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='doj'>Date of Joining</Label>
									<Input
										id='doj'
										type='date'
										placeholder='Enter date of joining'
										value={formData.doj}
										onChange={handleInputChange}
										className={errors?.doj ? 'border-red-500' : ''}
									/>
									{errors?.doj && <Errors errors={errors.doj._errors} />}
								</div>
							</div>
						)}
					</div>
				</form>
				<DialogFooter className='flex justify-between border-t pt-4'>
					{currentStep > 1 && (
						<Button variant='outline' onClick={handlePrevStep}>
							Previous
						</Button>
					)}
					{currentStep < 2 && <Button onClick={handleNextStep}>Next</Button>}
					{currentStep === 2 && (
						<Button type='submit' onClick={handleSubmit}>
							Save User
						</Button>
					)}
				</DialogFooter>
				<div className='mt-4'>
					<Progress value={(currentStep / 2) * 100} className='w-full' />
				</div>
			</DialogContent>
		</Dialog>
	);
}

type ErrorsType = {
	errors: Array<string>;
};

const Errors: FC<ErrorsType> = ({ errors }) => {
	if (!errors?.length) return null;

	return (
		<div className='flex  gap-2'>
			{errors.map((errorMessage, index) => (
				<span key={errorMessage + index} className='text-red-500 text-sm'>
					<span className={index == 0 ? 'hidden' : 'inline-block'}>|</span>{' '}
					{errorMessage}
				</span>
			))}
		</div>
	);
};
