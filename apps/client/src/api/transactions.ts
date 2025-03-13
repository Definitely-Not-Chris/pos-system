import AxiosAPI from "../services/axios-base-api"
import { getAxiosInstance } from "./config";
import { TransactionEntity } from "@pos/core/entities/transaction";

export const ENDPOINT = "/v1/transactions"
const api = new AxiosAPI<TransactionEntity>(ENDPOINT, getAxiosInstance())
export default api;