import { PurchaseOrderStatus } from "@/app/generated/prisma/enums"
import { z } from "zod"

export const purchaseOrderFilterSchema = z.object({
  status: z.nativeEnum(PurchaseOrderStatus).optional(),
  supplierId: z.number().optional(),
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
})
