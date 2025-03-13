import { AxiosInstance } from "axios";
import { PaginationResult } from '@pos/core/types'

export default class AxiosAPI<T> {
    constructor(public endpoint: string, public api: AxiosInstance) {}

    async getOne(params?: any): Promise<T | undefined> {
        const { data } = await this.api.get(this.endpoint, { params })
        return data?.data?.[0]
    }

    async getAll(params?: any): Promise<PaginationResult<T> | undefined> {
        const { data } =  await this.api.get(this.endpoint, { params }) 
        return data
    }

    put<D>(data?: D, params?: any): Promise<T | undefined> {
        return this.api.put(`${this.endpoint}/edit`, data, { params })
    }
    
    post<D>(data?: D, params?: any): Promise<T | undefined> {
        return this.api.post(this.endpoint, data, { params })
    }

    delete(params?: any) {
        return this.api.delete(`${this.endpoint}/delete`, { params })
    }
}