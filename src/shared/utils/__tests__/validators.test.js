import { describe, it, expect } from 'vitest';
import { emailSchema, phoneSchema, loginFormSchema, registerFormSchema, contactFormSchema, alertFormSchema, } from '../validators';
describe('emailSchema', () => {
    it('accepts valid email', () => {
        expect(emailSchema.safeParse('user@example.com').success).toBe(true);
    });
    it('rejects invalid email', () => {
        expect(emailSchema.safeParse('not-an-email').success).toBe(false);
    });
    it('rejects empty string', () => {
        expect(emailSchema.safeParse('').success).toBe(false);
    });
});
describe('phoneSchema', () => {
    it('accepts +41 format', () => {
        expect(phoneSchema.safeParse('+41 79 123 45 67').success).toBe(true);
    });
    it('accepts 0041 format', () => {
        expect(phoneSchema.safeParse('0041 79 123 45 67').success).toBe(true);
    });
    it('accepts 0 prefix format', () => {
        expect(phoneSchema.safeParse('079 123 45 67').success).toBe(true);
    });
    it('allows empty string', () => {
        expect(phoneSchema.safeParse('').success).toBe(true);
    });
    it('allows undefined (optional)', () => {
        expect(phoneSchema.safeParse(undefined).success).toBe(true);
    });
    it('rejects non-Swiss format', () => {
        expect(phoneSchema.safeParse('+1 555 123 4567').success).toBe(false);
    });
});
describe('loginFormSchema', () => {
    it('accepts valid login', () => {
        const result = loginFormSchema.safeParse({
            email: 'user@example.com',
            password: 'mypassword',
        });
        expect(result.success).toBe(true);
    });
    it('rejects empty email', () => {
        const result = loginFormSchema.safeParse({
            email: '',
            password: 'mypassword',
        });
        expect(result.success).toBe(false);
    });
    it('rejects empty password', () => {
        const result = loginFormSchema.safeParse({
            email: 'user@example.com',
            password: '',
        });
        expect(result.success).toBe(false);
    });
});
describe('registerFormSchema', () => {
    const validData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'Password1',
        confirm_password: 'Password1',
    };
    it('accepts valid registration', () => {
        expect(registerFormSchema.safeParse(validData).success).toBe(true);
    });
    it('rejects password mismatch', () => {
        const result = registerFormSchema.safeParse({
            ...validData,
            confirm_password: 'Different1',
        });
        expect(result.success).toBe(false);
    });
    it('rejects short password', () => {
        const result = registerFormSchema.safeParse({
            ...validData,
            password: 'short',
            confirm_password: 'short',
        });
        expect(result.success).toBe(false);
    });
    it('rejects missing first name', () => {
        const result = registerFormSchema.safeParse({
            ...validData,
            first_name: '',
        });
        expect(result.success).toBe(false);
    });
});
describe('contactFormSchema', () => {
    const validContact = {
        contact_first_name: 'Jane',
        contact_last_name: 'Doe',
        contact_email: 'jane@example.com',
        message: 'I am interested in this property, please contact me.',
        inquiry_type: 'viewing',
    };
    it('accepts valid contact form', () => {
        expect(contactFormSchema.safeParse(validContact).success).toBe(true);
    });
    it('rejects short message', () => {
        const result = contactFormSchema.safeParse({
            ...validContact,
            message: 'Hi',
        });
        expect(result.success).toBe(false);
    });
    it('rejects missing inquiry type', () => {
        const result = contactFormSchema.safeParse({
            ...validContact,
            inquiry_type: '',
        });
        expect(result.success).toBe(false);
    });
});
describe('alertFormSchema', () => {
    it('accepts valid alert', () => {
        const result = alertFormSchema.safeParse({
            name: 'My Alert',
            frequency: 'daily',
        });
        expect(result.success).toBe(true);
    });
    it('accepts alert with all optional fields', () => {
        const result = alertFormSchema.safeParse({
            name: 'Full Alert',
            frequency: 'weekly',
            transaction_type: 'rent',
            canton_id: '1',
            city_id: '2',
            price_min: 500,
            price_max: 2000,
            rooms_min: 2,
        });
        expect(result.success).toBe(true);
    });
    it('rejects missing name', () => {
        const result = alertFormSchema.safeParse({
            name: '',
            frequency: 'daily',
        });
        expect(result.success).toBe(false);
    });
    it('rejects invalid frequency', () => {
        const result = alertFormSchema.safeParse({
            name: 'Alert',
            frequency: 'monthly',
        });
        expect(result.success).toBe(false);
    });
});
