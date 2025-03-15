import { z } from "zod";
import { InvoiceSchema } from "./invoice";


export const CreateTransactionSchema = z.object({
    type: z.string(),
    amount: z.number(),
    invoice: InvoiceSchema,
});
  
export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>


export const UpdateTransactionSchema = CreateTransactionSchema.extend({})
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>
