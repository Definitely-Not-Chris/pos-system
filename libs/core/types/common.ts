import { PaginationDto } from "../dtos"


export type PaginationResult<T> = PaginationDto & {
    data: Array<T>,
    total: number
}