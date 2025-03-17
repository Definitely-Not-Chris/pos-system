import { z } from "zod";


export const PaginationSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  search: z.string().optional()
});

export type PaginationDto = z.infer<typeof PaginationSchema>