'use client';

import { useState } from 'react';
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
} from '@repo/ui/components';
import type { ZodFormattedError } from 'zod';
import type { UserPartialType, UserType } from '@/types/interfaces';
import { AddUserStep1Schema, AddUserStep2Schema } from '@/types/zodSchemas';
import { UserActionTile } from '../UserActionTile';

export function AddUserModal(): JSX.Element {
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

	const handlePrevStep = (): void => {
		// We will simply allow the user to go back to step 1 if they are on step 2, no need to validate
		setCurrentStep(currentStep - 1);
	};

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
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
				const userStep1ZodErrors = result.error.format();
				console.log(userStep1ZodErrors);
				setErrors(userStep1ZodErrors);
				return false;
			}
		} else {
			const result = AddUserStep2Schema.safeParse(formData);
			if (!result.success) {
				const userStep2ZodErrors = result.error.format();
				console.log(userStep2ZodErrors);
				setErrors(userStep2ZodErrors);
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
										className={errors?.name ? 'border-red-500' : ''}
										id='name'
										onChange={handleInputChange}
										placeholder='Enter name'
										value={formData.name}
									/>
									{errors?.name ? (
										<Errors errors={errors.name._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='email'>Email</Label>
									<Input
										className={errors?.email ? 'border-red-500' : ''}
										id='email'
										onChange={handleInputChange}
										placeholder='Enter email'
										type='email'
										value={formData.email}
									/>
									{errors?.email ? (
										<Errors errors={errors.email._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='phone'>Phone</Label>
									<Input
										className={errors?.phone ? 'border-red-500' : ''}
										id='phone'
										onChange={handleInputChange}
										placeholder='Enter phone number'
										type='tel'
										value={formData.phone}
									/>
									{errors?.phone ? (
										<Errors errors={errors.phone._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='address'>Address</Label>
									<Input
										className={errors?.address ? 'border-red-500' : ''}
										id='address'
										onChange={handleInputChange}
										placeholder='Enter address'
										value={formData.address}
									/>
									{errors?.address ? (
										<Errors errors={errors.address._errors} />
									) : null}
								</div>
							</div>
						)}
						{currentStep === 2 && (
							<div className='grid gap-4'>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='role'>Role</Label>
									<Select
										// id="role"
										// className={errors?.role ? 'border-red-500' : ''}
										onValueChange={(role) => {
											setFormData({ ...formData, role });
										}}
										value={formData.role}
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
									{errors?.role ? (
										<Errors errors={errors.role._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='github'>Github</Label>
									<Input
										className={errors?.github ? 'border-red-500' : ''}
										id='github'
										onChange={handleInputChange}
										placeholder='Enter Github username'
										value={formData.github}
									/>
									{errors?.github ? (
										<Errors errors={errors.github._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='linkedin'>LinkedIn</Label>
									<Input
										className={errors?.linkedin ? 'border-red-500' : ''}
										id='linkedin'
										onChange={handleInputChange}
										placeholder='Enter LinkedIn profile URL'
										value={formData.linkedin}
									/>
									{errors?.linkedin ? (
										<Errors errors={errors.linkedin._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='skypeid'>Skype ID</Label>
									<Input
										className={errors?.skypeid ? 'border-red-500' : ''}
										id='skypeid'
										onChange={handleInputChange}
										placeholder='Enter Skype ID'
										value={formData.skypeid}
									/>
									{errors?.skypeid ? (
										<Errors errors={errors.skypeid._errors} />
									) : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='dob'>Date of Birth</Label>
									<Input
										className={errors?.dob ? 'border-red-500' : ''}
										id='dob'
										onChange={handleInputChange}
										placeholder='Enter date of birth'
										type='date'
										value={formData.dob}
									/>
									{errors?.dob ? <Errors errors={errors.dob._errors} /> : null}
								</div>
								<div className='grid grid-cols-1 gap-2'>
									<Label htmlFor='doj'>Date of Joining</Label>
									<Input
										className={errors?.doj ? 'border-red-500' : ''}
										id='doj'
										onChange={handleInputChange}
										placeholder='Enter date of joining'
										type='date'
										value={formData.doj}
									/>
									{errors?.doj ? <Errors errors={errors.doj._errors} /> : null}
								</div>
							</div>
						)}
					</div>
				</form>
				<DialogFooter className='flex justify-between border-t pt-4'>
					{currentStep > 1 && (
						<Button onClick={handlePrevStep} variant='outline'>
							Previous
						</Button>
					)}
					{currentStep < 2 && <Button onClick={handleNextStep}>Next</Button>}
					{currentStep === 2 && <Button type='submit'>Save User</Button>}
				</DialogFooter>
				<div className='mt-4'>
					<Progress className='w-full' value={(currentStep / 2) * 100} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

interface ErrorsType {
	errors: string[];
}

function Errors({ errors }: ErrorsType): JSX.Element | null {
	if (!errors.length) return null;

	return (
		<div className='flex  gap-2'>
			{errors.map((errorMessage, index) => (
				// eslint-disable-next-line react/no-array-index-key -- just using the index as the key
				<span className='text-red-500 text-sm' key={errorMessage + index}>
					<span className={index === 0 ? 'hidden' : 'inline-block'}>|</span>{' '}
					{errorMessage}
				</span>
			))}
		</div>
	);
}
