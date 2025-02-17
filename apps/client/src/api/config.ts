import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";
import config, { TOKEN_KEY } from "../config";
import TokenStorage from "../utils/token-storage";

const tokenStorage = new TokenStorage(TOKEN_KEY)
export const queryClient = new QueryClient()

let axiosInstance: AxiosInstance | null = null


export function getAxiosInstance() {
    if(axiosInstance == null)
        axiosInstance = axios.create({ baseURL: config.API_URL });
    return axiosInstance
}

function authTokenInterceptor(_config: InternalAxiosRequestConfig) {
    const token = tokenStorage.get();
    if (!token) return _config;

    _config.headers.Authorization = `Bearer ${token}`;
    return _config;
}

axiosInstance = getAxiosInstance()
axiosInstance.interceptors.request.use(authTokenInterceptor);