import { z } from "zod"
import { purchaseOrderSchema, purchaseOrderWithIdSchema } from "../schemas/purchase-order"
import { Prisma } from "@/app/generated/prisma/browser";
import { goodsReceiptSchema } from "../schemas/goods-receipt"
import type { GoodsReceiptStatus } from "@/app/generated/prisma/enums"

export type PurchaseOrderInput = z.infer<typeof purchaseOrderSchema>
export type PurchaseOrderLineRow = z.infer<typeof purchaseOrderSchema>["lines"][number] & {
  id: number
  receivedQuantity: number
  totalHT: number
  taxAmount: number
  totalTTC: number
}

export type PurchaseOrderRow = Omit<z.infer<typeof purchaseOrderWithIdSchema>, "expectedDate" | "lines"> & {
  expectedDate: Date | null
  lines: PurchaseOrderLineRow[]
  supplier: { id: number; name: string; reference: string }
}

export type PurchaseOrderWithRelations = Prisma.PurchaseOrderGetPayload<{
  include: { supplier: true; lines: true; activities: { include: { logs: true } } }
}>

export type GoodsReceiptInput = z.infer<typeof goodsReceiptSchema>

export type GoodsReceiptLineRow = {
  id: number
  purchaseOrderLineId: number
  productId: number
  quantityReceived: number
  unit: z.infer<typeof goodsReceiptSchema>["lines"][number]["unit"]
  unitPriceHT: number | null
  lotNumber: string | null
  qualityChecked: boolean
  qualityStatus: string | null
  notes: string | null
  designation?: string
  productName?: string
  quantityOrdered?: number
  receivedQuantity?: number
  receivedBefore?: number
  remainingBefore?: number
  remainingAfter?: number
}

export type GoodsReceiptRow = {
  id: number
  reference: string
  purchaseOrderId: number
  receiptDate: Date | string
  supplierDocumentRef: string | null
  status: GoodsReceiptStatus
  notes: string | null
  supplier: { id: number; name: string; reference: string }
  purchaseOrder: { id: number; reference: string }
  lines: GoodsReceiptLineRow[]
  createdAt: Date
  updatedAt: Date
}
