import axios, { InternalAxiosRequestConfig } from "axios";
import assert from "assert";
import TokenStorage from "../utils/token-storage";
import env from '@pos/env'
import { QueryClient } from "@tanstack/react-query";


assert(env.API_URL, "env variable not set: API_BASE_URL");
assert(env.ENVIRONMENT, "env variable not set: ENVIRONMENT");

export const queryClient = new QueryClient()
export const tokenStorage = new TokenStorage(env.TOKEN_KEY)
export const axiosInstance = axios.create({ baseURL: env.API_URL });


function authTokenInterceptor(config: InternalAxiosRequestConfig) {
    const token = tokenStorage.get();
    if (!token) return config;
    
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}
  
axiosInstance.interceptors.request.use(authTokenInterceptor);