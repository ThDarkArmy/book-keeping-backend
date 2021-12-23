import { config } from "dotenv";

config()

export const MONGO_URI = process.env.MONGO_URI;
export const PORT=process.env.PORT
export const PUBLIC_KEY_PATH=process.env.PUBLIC_KEY_PATH
export const PRIVATE_KEY_PATH=process.env.PRIVATE_KEY_PATH
export const EMAIL=process.env.EMAIL
export const PASSWORD=process.env.PASSWORD
export const BASE_URL=process.env.BASE_URL