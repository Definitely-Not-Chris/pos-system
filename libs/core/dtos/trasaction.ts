import { z } from "zod";


export const CreateTransactionSchema = z.object({
    type: z.string(),
    amount: z.number(),
    invoiceId: z.number(),
});
  
export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>


export const UpdateTransactionSchema = CreateTransactionSchema.extend({})
export type UpdateTransactionDto = z.infer<typeof UpdateTransactionSchema>
