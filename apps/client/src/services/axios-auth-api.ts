import { SignInUserDto, SignInUserResponse } from "@pos/core/dtos";
import { AxiosInstance, AxiosResponse } from "axios";

export default class AxiosAuthAPI<T> {
    constructor(public endpoint: string, public api: AxiosInstance) {}

    async getUser(params?: any): Promise<T | undefined> {
        const { data } = await this.api.get(`${this.endpoint}/user`, { params })
        return data
    }

    login(dto: SignInUserDto): Promise<AxiosResponse<SignInUserResponse, any>> {
        return this.api.post<SignInUserResponse>(`${this.endpoint}/login`, dto)
    }

    changePassword(params?: any) {
        return this.api.delete(`${this.endpoint}/change-password`, { params })
    }
}