import AxiosAPI from "../services/axios-api"
import { UserEntity } from '@pos/core/entities/user'
import { createAxiosInstance } from "./config";

export const ENDPOINT = "/v1/users"
const api = new AxiosAPI<UserEntity>(ENDPOINT, createAxiosInstance())
export default api;