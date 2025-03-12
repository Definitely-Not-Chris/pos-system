import { z } from "zod";


export const CreateInvoiceSchema = z.object({
    invoiceNumber: z.number(),
    name: z.string(),
    dateIssued: z.string(),
    companyId: z.string(),
    amount: z.number(),
    paymentDue: z.string(),
});
  
export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>


export const UpdateInvoiceSchema = CreateInvoiceSchema.extend({})
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>
