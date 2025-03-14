import { z } from "zod";


export const CreateCompanySchema = z.object({
    name: z.string(),
    address: z.string().optional(),
    contactNumber: z.string(),
});

export const CompanySchema = CreateCompanySchema.extend({
    id: z.number().positive()
})
  
export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>


export const UpdateCompanySchema = CreateCompanySchema.extend({})
export type UpdateCompanyDto = z.infer<typeof UpdateCompanySchema>
