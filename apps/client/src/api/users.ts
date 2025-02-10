import AxiosAPI from "../services/axios-api"
import { axiosInstance } from "./config"
import { UserEntity } from '@pos/core/entities'

export const ENDPOINT = "/v2/users"

const api = new AxiosAPI<UserEntity>(ENDPOINT, axiosInstance)
export default api;