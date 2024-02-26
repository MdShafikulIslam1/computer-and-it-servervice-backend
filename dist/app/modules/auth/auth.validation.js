"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email must be required',
        }),
        password: zod_1.z.string({
            required_error: 'password must be required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
};
