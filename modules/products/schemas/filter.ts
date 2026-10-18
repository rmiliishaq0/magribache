import { ProductStatus ,ProductType} from "@/app/generated/prisma/client"
import { z } from "zod"

export const filterSchema = z.object({
    statut:z.enum(ProductStatus).optional(),
    type:z.enum(ProductType).optional(),
    fournisseur:z.string().optional(),
    date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
})