import AxiosAPI from "../services/axios-base-api"
import { InvoiceEntity } from '@pos/core/entities/invoice'
import { getAxiosInstance } from "./config";

export const ENDPOINT = "/v1/invoices"
const api = new AxiosAPI<InvoiceEntity>(ENDPOINT, getAxiosInstance())
export default api;