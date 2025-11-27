import Api from '../axiosClient';
import { login, register } from '@/types';

const API_URL = '/auth';

export const loginUser = async (login : login) => {
  try {    
    console.log(login);
    
     const response = await Api.post(`${API_URL}/login`, login );
     return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (register: register) => {
  try {
    const response = await Api.post(`${API_URL}/register`, register);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('logout failed:', error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await Api.post(`${API_URL}/refresh`, );
    return response.data;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};


