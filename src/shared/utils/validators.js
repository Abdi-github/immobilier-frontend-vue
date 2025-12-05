import { z } from 'zod';
export const emailSchema = z.string().email('Invalid email format');
export const phoneSchema = z
    .string()
    .regex(/^(\+41|0041|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Invalid Swiss phone number')
    .optional()
    .or(z.literal(''));
export const loginFormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
});
export const registerFormSchema = z
    .object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    phone: phoneSchema,
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
})
    .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
});
export const contactFormSchema = z.object({
    contact_first_name: z.string().min(1, 'First name is required'),
    contact_last_name: z.string().min(1, 'Last name is required'),
    contact_email: z.string().min(1, 'Email is required').email('Invalid email format'),
    contact_phone: phoneSchema,
    message: z.string().min(10, 'Message must be at least 10 characters'),
    inquiry_type: z.string().min(1, 'Please select an inquiry type'),
});
export const alertFormSchema = z.object({
    name: z.string().min(1, 'Alert name is required'),
    frequency: z.enum(['instant', 'daily', 'weekly']),
    transaction_type: z.enum(['rent', 'buy']).optional(),
    category_id: z.string().optional(),
    canton_id: z.string().optional(),
    city_id: z.string().optional(),
    price_min: z.number().optional(),
    price_max: z.number().optional(),
    rooms_min: z.number().optional(),
    rooms_max: z.number().optional(),
    surface_min: z.number().optional(),
    surface_max: z.number().optional(),
});
