"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceZodSchema = void 0;
const zod_1 = require("zod");
const serviceSchema = zod_1.z.object({
    name: zod_1.z.string(), // Ensure name is a non-empty string
    categoryId: zod_1.z.string().uuid(), // Ensure categoryId is a valid UUID string
    fee: zod_1.z.number().nonnegative(), // Ensure fee is a non-negative number
    durationInMinutes: zod_1.z.number().positive(), // Ensure durationInMinutes is a positive number
    warranty: zod_1.z.number().nonnegative(), // Ensure warranty is a non-negative number
    status: zod_1.z.enum(['AVAILABLE', 'UNAVAILABLE', 'UPCOMING']), // Ensure status is one of the predefined strings
    description: zod_1.z.string(), // Ensure description is a non-empty string
});
exports.ServiceZodSchema = {
    serviceSchema,
};
