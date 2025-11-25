export interface CreateProductDto {
    name: string;
    description: string;
    price: number;
    style: string;
}

export enum PriceSort {
  INCRE = 'asc',
  DCRE = 'desc',
}

export interface FilterProductDto {
  items_per_page: number;
  page: number;
  name?: string;
  sort_price?: PriceSort;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    images: { link?: string }[];
}

export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  images: { link?: string }[];
  style: string;
  description: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;
