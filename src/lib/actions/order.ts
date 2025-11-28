import { orderType } from "@/types";
import API from "../axiosClient"
const API_URL = '/orders';

export const createOrder = async (data: orderType[]) => {
    try {
        const res = await API.post(`${API_URL}`, {
            productOrders: data
        });
        return res.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}