import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(255, 'Email must be less than 255 characters');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password must be less than 72 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must include uppercase, lowercase, number and special character'
  );

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be less than 30 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores and dashes');

export function validateEmail(email: string): string | null {
  try {
    emailSchema.parse(email);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid email';
  }
}

export function validatePassword(password: string): string | null {
  try {
    passwordSchema.parse(password);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid password';
  }
}

export function validateUsername(username: string): string | null {
  try {
    usernameSchema.parse(username);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid username';
  }
}

export function validateForm<T extends Record<string, unknown>>(
  data: T,
  schema: z.ZodSchema<T>
): Record<keyof T, string> | null {
  try {
    schema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Partial<Record<keyof T, string>> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as keyof T] = err.message;
        }
      });
      return errors as Record<keyof T, string>;
    }
    return null;
  }
}