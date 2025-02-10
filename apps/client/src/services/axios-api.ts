import { AxiosInstance } from "axios";

export default class AxiosAPI<T> {
    constructor(public endpoint: string, public api: AxiosInstance) {}

    getOne(params?: any): Promise< T | undefined> {
        return this.api.get(this.endpoint, { params })
    }

    getAll(params?: any): Promise<T[] | undefined> {
        return this.api.get(this.endpoint, { params })
    }

    put(data?: any, params?: any) {
        return this.api.put(`${this.endpoint}/edit`, data, { params })
    }
    
    post(data?: any, params?: any) {
        return this.api.post(this.endpoint, data, { params })
    }

    delete(params?: any) {
        return this.api.delete(`${this.endpoint}/delete`, { params })
    }
}