import { loginSchema, registerSchema } from "@/lib/validate";
import { number, z } from "zod";

export type register = z.infer<typeof registerSchema>
export type login = z.infer<typeof loginSchema>

export interface productType{
    name:string,
    price:number,
    style:string,
    id:string,
    images:imageProductType[],
    _count:{
        orders:number
    }
} 

export interface imageProductType{
    id:string,
    link:string,
    type:string
}

export interface orderType {
    quantity:number,
    productId:number,
}

