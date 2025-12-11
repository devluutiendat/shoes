import API from "../axiosClient";

const API_BASE_URL = "http://localhost:5000/products";

export const getMostSoldProducts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/most-sold`);
    const products = await res.json();
    return products;
  } catch (error) {
    console.error("Failed to get most sold products:", error);
    throw error;
  }
};

export const getProductById = async (id: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    const product = await res.json();
    return product;
  } catch (error) {
    console.error(`Failed to get product with ID ${id}:`, error);
    throw error;
  }
}
  export const getAllProducts = async (filters: string) => {
    try {
      const res = await API.get(`${API_BASE_URL}?${filters}` );
    return res.data;
  } catch (error) {
    console.error('Failed to get all products:', error);
    throw error;
  }
};

// export const createProduct = async (data: CreateProductDto) => {
//   try {
//     const res = await API.post(API_BASE_URL, data);
//     return res.data;
//   } catch (error) {
//     console.error('Failed to create product:', error);
//     throw error;
//   }
// };


export const getProducts = async () => {
  try {
    const res = await API.get(`${API_BASE_URL}/allProduct`)
    return res.data;
  } catch (error) {
    console.error('Failed to get all product IDs:', error);
    throw error;
  }
}
// export const updateProduct = async (id: number, data: UpdateProductDto) => {
//   try {
//     const res = await API.put(`${API_BASE_URL}/${id}`, data);
//     return res.data;
//   } catch (error) {
//     console.error(`Failed to update product with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const deleteProduct = async (id: number) => {
//   try {
//     const res = await API.delete(`${API_BASE_URL}/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error(`Failed to delete product with ID ${id}:`, error);
//     throw error;
//   }
// };
