import axios from 'axios';

const API = axios.create({
  baseURL: process.env.BACK_END_URL || 'http://localhost:5000',
  withCredentials: true, 
});

/*
  Token refresh coordination:
  - isRefreshing: ensures only one refresh request runs at a time
  - failedQueue: stores pending requests while refresh is in progress
    each item is { resolve, reject } so they can be resumed once refresh completes
*/
let isRefreshing = false;
let failedQueue: any[] = [];

/*
  processQueue: resolve or reject all queued requests after refresh attempt
  - error: if refresh failed, reject queued promises with the error
  - token: if refresh succeeded, resolve queued promises with the new token
*/
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Response interceptor: handles 401 Unauthorized and attempts token refresh
API.interceptors.response.use(
  (response) => response, // pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already retried this request, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a refresh is already in progress, queue this request and return a promise
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            // After refresh completes, attach new token and retry original request
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return API(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Mark request to avoid infinite loops and start refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint (expects new accessToken in response)
        const { data } = await API.post('/auth/refresh');

        // Notify all queued requests with the new token
        processQueue(null, data.accessToken);

        // Retry the original request with the refreshed token
        return API(originalRequest);
      } catch (err) {
        // Refresh failed: reject all queued requests and propagate error
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        // Allow future refresh attempts
        isRefreshing = false;
      }
    }

    // For other errors or already retried requests, just propagate the error
    return Promise.reject(error);
  }
);

export default API;

