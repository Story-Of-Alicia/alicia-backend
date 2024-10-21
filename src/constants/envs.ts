import * as dotenv from 'dotenv';

dotenv.config();
export const ENV_VARS = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT
};