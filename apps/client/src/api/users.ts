import AxiosAPI from "../services/axios-api"
import { axiosInstance } from "./config"
import { UserEntity } from '@pos/core/entities/user'

export const ENDPOINT = "/v1/users"

const api = new AxiosAPI<UserEntity>(ENDPOINT, axiosInstance)
export default api;