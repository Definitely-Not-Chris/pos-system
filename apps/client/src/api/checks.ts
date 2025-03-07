import AxiosAPI from "../services/axios-base-api"
import { CheckEntity } from '@pos/core/entities'
import { getAxiosInstance } from "./config";

export const ENDPOINT = "/v1/checks"
const api = new AxiosAPI<CheckEntity>(ENDPOINT, getAxiosInstance())
export default api;