import {z} from "zod"
export const usernameValidation = z
    .string()
    .min(2,"minimum 2 characters")
    .max(10,"maximum 10 characters")
    .regex(/^(?!_)([a-z0-9]+_?)*[a-z0-9]$/,"username must not contains special characters and should be in small letter")

export const signUpSchema = z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invalid Email"}),
    password:z.string().min(6,{message:"must be 6 characters"}).max(10,{message:"maximum 10 characters"})
})