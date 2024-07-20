import { z } from 'zod';
import validator from 'validator';

// import { exactlyNYearsAgoDate } from '@/utlls';

export const userSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required!' })
		.max(50, { message: 'Name is too long' }),
	email: z.string().email({ message: 'Invalid email address' }),
	// phone: z
	// 	.string()
	// 	.min(10, 'Phone number is too short')
	// 	.max(15, 'Phone number is too long'),
	phone: z
		.string()
		.refine(validator.isMobilePhone, { message: 'Invalid phone number' }),
	address: z
		.string()
		.min(1, { message: 'Address is required' })
		.max(100, { message: 'Address is too long' }),
	role: z
		.string()
		.min(1, { message: 'Role is required' })
		.max(10, { message: 'Role is too long' }),
	github: z
		.string()
		.url()
		.min(1, { message: 'Github is required' })
		.max(50, { message: 'Github is too long' }),
	linkedin: z
		.string()
		.url()
		.min(1, { message: 'LinkedIn is required' })
		.max(100, { message: 'LinkedIn is too long' }),
	skypeid: z
		.string()
		.min(1, { message: 'Skype ID is required' })
		.max(50, { message: 'Skype ID is too long' }),
	// dob: z.date().max(exactlyNYearsAgoDate(18)).min(new Date('1900-01-01')),
	dob: z.string().date(),
	doj: z.string().date(),
});

export const UserSchemaPartial = userSchema.partial();

export const AddUserStep1Schema = userSchema.pick({
	name: true,
	email: true,
	phone: true,
	address: true,
});

export const AddUserStep2Schema = userSchema.pick({
	role: true,
	github: true,
	linkedin: true,
	skypeid: true,
	dob: true,
	doj: true,
});
