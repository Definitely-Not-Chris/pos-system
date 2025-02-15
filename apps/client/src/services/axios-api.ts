import { AxiosInstance } from "axios";
import { PaginationResult } from '@pos/core/types'

export default class AxiosAPI<T> {
    constructor(public endpoint: string, public api: AxiosInstance) {}

    getOne(params?: any): Promise< T | undefined> {
        return this.api.get(this.endpoint, { params })
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