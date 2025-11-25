// authService.ts
import Api from './axiosClient';
import Cookies from 'js-cookie';
import { registerDto } from '../interface/registerDto';
import { clearCookies, saveCookies } from '@/lib/cookie';

const API_URL = '/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await Api.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    saveCookies(response);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (register: registerDto) => {
  try {
    const response = await Api.post(`${API_URL}/register`, register);
    saveCookies(response);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const logout = () => {
  clearCookies();
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await Api.post(`${API_URL}/refresh`, { refreshToken });
    Cookies.set('accessToken', response.data.accessToken, { expires: 15, path: '/' });
    return response.data.accessToken;
  } catch (error) {
    clearCookies();
    console.error('Token refresh failed:', error);
    return null;
  }
};

