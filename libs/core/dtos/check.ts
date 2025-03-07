import { z } from "zod";


export const CreateCheckSchema = z.object({
    payee: z.string(),
    payerName: z.string(),
    payerAddress: z.string(),
    dateIssued: z.string(),
    routingNumber: z.string(),
    accountNumber: z.string(),
    memoLine: z.string(),
    amount: z.number(),
    bankFractional: z.string(),
});

  
export type CreateCheckDto = z.infer<typeof CreateCheckSchema>


export const UpdateCheckSchema = CreateCheckSchema.extend({})
export type UpdateCheckDto = z.infer<typeof UpdateCheckSchema>
