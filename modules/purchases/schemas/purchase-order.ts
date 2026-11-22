import { PurchaseOrderStatus, StockUnit } from "@/app/generated/prisma/enums"
import { z } from "zod"

export const purchaseOrderLineSchema = z.object({
  productId: z.number().int().positive(),
  designation: z.string().min(1),
  specification: z.string().optional(),
  quantity: z.number().positive(),
  unit: z.nativeEnum(StockUnit),
  unitPriceHT: z.number().nonnegative(),
  taxRate: z.number().nonnegative().default(20),
})

export const purchaseOrderSchema = z.object({
  supplierId: z.number().int().positive(),
  orderDate: z.date(),
  expectedDate: z.date().optional(),
  status: z.nativeEnum(PurchaseOrderStatus).default(PurchaseOrderStatus.DRAFT),
  currency: z.string().min(1).default("MAD"),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  lines: z.array(purchaseOrderLineSchema).min(1),
})

export const purchaseOrderWithIdSchema = purchaseOrderSchema.extend({
  id: z.number(),
  reference: z.string(),
  totalHT: z.number(),
  taxAmount: z.number(),
  totalTTC: z.number(),
})
