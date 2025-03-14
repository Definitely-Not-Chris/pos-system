import { z } from "zod";
import { CompanySchema } from "./company";


export const CreateInvoiceSchema = z.object({
    invoiceNumber: z.number().positive(),
    name: z.string(),
    dateIssued: z.string(),
    amount: z.number().positive(),
    company: CompanySchema,
    paymentDue: z.string(),
});
  
export type CreateInvoiceDto = z.infer<typeof CreateInvoiceSchema>


export const UpdateInvoiceSchema = CreateInvoiceSchema.extend({})
export type UpdateInvoiceDto = z.infer<typeof UpdateInvoiceSchema>
