import { z } from "zod";


export const CreateCheckSchema = z.object({
    payee: z.string(),
    payerName: z.string(),
    payerAddress: z.string(),
    dateIssued: z.string(),
    routingNumber: z.string().optional(),
    accountNumber: z.string(),
    memoLine: z.string().optional(),
    amount: z.number().positive().transform((val) => Number(val)),
    bankFractional: z.string(),
});

  
export type CreateCheckDto = z.infer<typeof CreateCheckSchema>


export const UpdateCheckSchema = CreateCheckSchema.extend({})
export type UpdateCheckDto = z.infer<typeof UpdateCheckSchema>
