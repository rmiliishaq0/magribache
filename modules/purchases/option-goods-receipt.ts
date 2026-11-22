import type { GoodsReceiptStatus } from "@/app/generated/prisma/enums"

export const goodsReceiptLabels: Record<GoodsReceiptStatus, string> = {
  DRAFT: "Brouillon",
  COMPLETED: "Terminée",
  CANCELLED: "Annulée",
}
