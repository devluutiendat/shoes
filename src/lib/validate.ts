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

// export const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.number().positive("Price must be greater than 0"),
//   style: z.string().min(1, "Style is required"),
// });


// export interface FilterProductDto {
//   items_per_page: number;
//   page: number;
//   name?: string;
//   sort_price?: PriceSort;
// }

// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     images: { link?: string }[];
// }

// export interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
//   images: { link?: string }[];
//   style: string;
//   description: string;
// }