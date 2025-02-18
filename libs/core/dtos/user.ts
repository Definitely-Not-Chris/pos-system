import { z } from "zod";
import { RegisterUserSchema } from "./auth";
import { RoleEnum } from "../enums/role";



export const UpdateUserSchema = RegisterUserSchema
    .omit({ email: true })
    .extend({ 
        id: z.number().min(1),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional(),
        role: z.enum([RoleEnum.ADMIN, RoleEnum.CASHIER]).optional()
    })

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>