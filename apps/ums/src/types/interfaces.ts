import type { z } from 'zod';
import type { userSchema, UserSchemaPartial } from './zodSchemas';

export type UserType = z.infer<typeof userSchema>;

export type AddUserFormData = UserType;

export type UserPartialType = z.infer<typeof UserSchemaPartial>;
