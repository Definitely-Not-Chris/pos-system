import AxiosAPI from "../services/axios-base-api"
import { UserEntity } from '@pos/core/entities/user'
import { getAxiosInstance } from "./config";

export const ENDPOINT = "/v1/users"
const api = new AxiosAPI<UserEntity>(ENDPOINT, getAxiosInstance())
export default api;