import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI = process.env.MONGODB_URI;
export const SECURITY_SECRET = process.env.SECURITY_SECRET;
export const NODE_ENV = process.env.NODE_ENV;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;
export const SENDER_EMAIL = process.env.SENDER_EMAIL;
