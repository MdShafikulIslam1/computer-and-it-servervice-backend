import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string(), // Ensure name is a non-empty string
  categoryId: z.string().uuid(), // Ensure categoryId is a valid UUID string
  fee: z.number().nonnegative(), // Ensure fee is a non-negative number
  durationInMinutes: z.number().positive(), // Ensure durationInMinutes is a positive number
  warranty: z.number().nonnegative(), // Ensure warranty is a non-negative number
  status: z.enum(['AVAILABLE', 'UNAVAILABLE', 'UPCOMING']), // Ensure status is one of the predefined strings
  description: z.string(), // Ensure description is a non-empty string
});

export const ServiceZodSchema = {
  serviceSchema,
};
