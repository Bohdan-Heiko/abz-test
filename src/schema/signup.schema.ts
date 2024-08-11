import { z } from "zod"

export const signUpSchema = z.object({
  name: z
    .string({ message: "Required field" })
    .min(2, "Minimum 2 character")
    .max(60, "Maximum 60 characters"),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z
    .string({ message: "Required field" })
    .startsWith("+380", "Phone number must start with +380")
    .min(13)
    .max(13),
  position_id: z.number().min(1).nonnegative(),
  photo: z.object({})
})
