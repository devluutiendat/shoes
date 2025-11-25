import { loginSchema, registerSchema } from "@/lib/validate";
import { z } from "zod";

export type register = z.infer<typeof registerSchema>
export type login = z.infer<typeof loginSchema>
