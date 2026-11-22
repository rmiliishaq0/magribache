import { GoodsReceiptStatus } from "@/app/generated/prisma/enums"
import { z } from "zod"

export const goodsReceiptFilterSchema = z.object({
  status: z.nativeEnum(GoodsReceiptStatus).optional(),
  supplierId: z.number().optional(),
  purchaseOrderId: z.number().optional(),
  date: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
})
