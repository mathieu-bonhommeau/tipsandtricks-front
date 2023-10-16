import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    config.baseURL = `${import.meta.env.VITE_API_URL}/api/`;
    config.withCredentials = true;
    return config;
});

export default axiosInstance;
