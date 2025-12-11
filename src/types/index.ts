import { loginSchema, registerSchema } from "@/lib/validate";
import { z } from "zod";

export type register = z.infer<typeof registerSchema>;
export type login = z.infer<typeof loginSchema>;

export interface productType {
  name: string;
  price: number;
  style: string;
  id: string;
  description: string;
  images: imageProductType[];
  _count: {
    orders: number;
  };
}


export interface imageProductType {
  id: number;
  productId: number;
  link: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}


export interface orderType {
  quantity: number;
  productId: number;
}

export enum PriceSort {
  INCRE = "asc",
  DCRE = "desc",
}