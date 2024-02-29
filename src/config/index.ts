import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  default_student_pass: process.env.DEFAULT_STUDENT_PASS,
  bcrypt_salt_number: process.env.BCRYPT_SALT_NUMBER,
  store_id: process.env.STORE_ID,
  store_password: process.env.STORE_PASSWORD,
  frontend_deploy_link: process.env.FRONTEND_DEPLOY_LINK,
  frontend_local_link: process.env.FRONTEND_LOCAL_LINK,
  jwt: {
    secret_key: process.env.SECRET_KEY,
    refresh_secret_key: process.env.REFRESH_SECRET_KEY,
    expires_in_secret_key: process.env.EXPIRES_IN_SECRET_KEY,
    expires_in_refresh_key: process.env.EXPIRES_IN_REFRESH_KEY,
  },
};
