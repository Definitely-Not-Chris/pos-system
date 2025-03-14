import AxiosAPI from "../services/axios-base-api"
import { CompanyEntity } from '@pos/core/entities'
import { getAxiosInstance } from "./config";

export const ENDPOINT = "/v1/companies"
const api = new AxiosAPI<CompanyEntity>(ENDPOINT, getAxiosInstance())
export default api;