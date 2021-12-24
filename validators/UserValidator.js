import { check } from 'express-validator';

const firstName = check("firstName", "First Name is required.").not().isEmpty()
const lastName = check("lastName", "Last Name is required.").not().isEmpty()
const email = check("email", "Please enter valid email.").isEmail()
const password = check("password", "Password must be of minimum length 6").isLength({min:6})

export const registerValidation = [firstName, lastName, email, password]
export const loginValidation = [email, password]
