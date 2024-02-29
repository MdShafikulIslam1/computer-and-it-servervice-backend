"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    default_student_pass: process.env.DEFAULT_STUDENT_PASS,
    bcrypt_salt_number: process.env.BCRYPT_SALT_NUMBER,
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
    jwt: {
        secret_key: process.env.SECRET_KEY,
        refresh_secret_key: process.env.REFRESH_SECRET_KEY,
        expires_in_secret_key: process.env.EXPIRES_IN_SECRET_KEY,
        expires_in_refresh_key: process.env.EXPIRES_IN_REFRESH_KEY,
    },
};
