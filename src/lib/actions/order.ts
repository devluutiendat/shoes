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
        console.error('create order failed:', error);
        throw error;
    }
}

export const getAllOrders = async () => {
    try {
        const res = await API.get(`${API_URL}`);
        return res.data;
    } catch (error) {
        console.error('create order failed:', error);
        throw error;
    }
}


export const getUserOrders = async () =>{
    try {
        const res = await API.get(`${API_URL}/user`)
        console.log(res);
        
        return res.data;
    } catch (error) {
        console.log("get user orders failed");
        throw error
    }
}

