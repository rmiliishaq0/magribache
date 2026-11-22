import { GoodsReceiptStatus, StockUnit } from "@/app/generated/prisma/enums"
import { z } from "zod"

export const goodsReceiptLineSchema = z.object({
  purchaseOrderLineId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantityReceived: z.number().positive(),
  unit: z.nativeEnum(StockUnit),
  unitPriceHT: z.number().nonnegative().optional(),
  lotNumber: z.string().optional(),
  qualityChecked: z.boolean().default(false),
  qualityStatus: z.string().optional(),
  notes: z.string().optional(),
})

export const goodsReceiptSchema = z.object({
  purchaseOrderId: z.number().int().positive(),
  receiptDate: z.date(),
  supplierDocumentRef: z.string().optional(),
  status: z.nativeEnum(GoodsReceiptStatus).default(GoodsReceiptStatus.DRAFT),
  notes: z.string().optional(),
  lines: z.array(goodsReceiptLineSchema).min(1),
}).superRefine((value, ctx) => {
  const lineIds = new Set<number>()
  const lotNumbers = new Set<string>()
  for (const [index, line] of value.lines.entries()) {
    if (lineIds.has(line.purchaseOrderLineId)) {
      ctx.addIssue({
        code: "custom",
        path: ["lines", index, "purchaseOrderLineId"],
        message: "Cette ligne de commande est déjà réceptionnée",
      })
    }
    lineIds.add(line.purchaseOrderLineId)
    if (line.lotNumber?.trim()) {
      const lot = line.lotNumber.trim()
      if (lotNumbers.has(lot)) {
        ctx.addIssue({
          code: "custom",
          path: ["lines", index, "lotNumber"],
          message: "Ce numéro de lot est utilisé plusieurs fois",
        })
      }
      lotNumbers.add(lot)
    }
  }
})

