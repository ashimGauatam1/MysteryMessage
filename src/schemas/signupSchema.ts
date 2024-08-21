import {z} from 'zod'


export const usernameValidation = z

  .string()

  .min(3, "Username must be at least 3 characters")

  .max(10, "username must be less than 10 characters")

  .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,"username must not contain special character")

  



export const SignupSchema=z.object({

    username:usernameValidation,

    email:z.string()

            .email({message:"Please enter valid email address"}),

    password:z.string().min(4,{message:"Password must be at least 4 characters"})

            .max(20,{message:"Password must be less than 20 characters"})

})

