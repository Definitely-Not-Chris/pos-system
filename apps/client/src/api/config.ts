import axios, { InternalAxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";
import config from "../config";




export function createAxiosInstance() {
    return axios.create({ baseURL: config.API_URL });
}

function authTokenInterceptor(_config: InternalAxiosRequestConfig) {
    const token = config.tokenStorage.get();
    if (!token) return _config;
    
    _config.headers.Authorization = `Bearer ${token}`;
    return _config;
}

export const queryClient = new QueryClient()
const axiosInstance = createAxiosInstance()
axiosInstance.interceptors.request.use(authTokenInterceptor);