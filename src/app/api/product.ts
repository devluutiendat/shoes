 import { CreateProductDto } from '@/interface/productDto';
import { FilterProductDto } from '@/interface/productDto';
import { UpdateProductDto } from '@/interface/productDto';
import API from './axiosClient';

const API_BASE_URL = '/products';

export const getProductById = async (id: number) => {
  try {
    const res =  await API.get(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.log(`Fetching product from: ${API_BASE_URL}/${id}`);
    console.error(`Failed to get product with ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (data: CreateProductDto) => {
  try {
    const res = await API.post(API_BASE_URL, data);
    return res.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

export const getAllProducts = async (filters?: FilterProductDto) => {
  try {
    const res = await API.get(API_BASE_URL, { params: filters });
    return res.data;
  } catch (error) {
    console.error('Failed to get all products:', error);
    throw error;
  }
};

export const getMostSoldProducts = async () => {
  try {
    const res = await API.get(`${API_BASE_URL}/most-sold`);
    return res.data;
  } catch (error) {
    console.error('Failed to get most sold products:', error);
    throw error;
  }
};

export const getAllProductIds = async () => {
  try {
    const res = await API.get(`${API_BASE_URL}/productIds`);
    return res.data;
  } catch (error) {
    console.error('Failed to get all product IDs:', error);
    throw error;
  }
}
export const updateProduct = async (id: number, data: UpdateProductDto) => {
  try {
    const res = await API.put(`${API_BASE_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`Failed to update product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const res = await API.delete(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw error;
  }
};
