import { z } from "zod";
import { PaginationDto } from "./common";

export const GetAllBillingStatementSchema = z.object({
    endDate: z.date().optional(),
    startDate: z.date().optional(),
});

export type GetAllBillingStatementQuery = z.infer<typeof GetAllBillingStatementSchema> & PaginationDto
