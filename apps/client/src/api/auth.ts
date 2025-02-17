
import { UserEntity } from '@pos/core/entities/user'
import { getAxiosInstance } from "./config";
import AxiosAuthAPI from "../services/axios-auth-api";

export const ENDPOINT = "/v1/auth"
const api = new AxiosAuthAPI<UserEntity>(ENDPOINT, getAxiosInstance())
export default api;