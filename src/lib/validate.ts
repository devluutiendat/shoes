import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => !val.includes(" "), "Email cannot contain spaces"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine((val) => !val.includes(" "), "Email cannot contain spaces"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone number must contain 10-15 digits"),
  name: z.string().min(1, "Name is required"),
});