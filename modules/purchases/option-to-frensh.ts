import { PurchaseOrderStatus } from "@/app/generated/prisma/enums";

export const labels: Record<PurchaseOrderStatus, string> = {
  DRAFT: "Brouillon",
  SENT: "Envoyée",
  CONFIRMED: "Confirmée",
  PARTIALLY_RECEIVED: "Partiellement reçue",
  RECEIVED: "Reçue",
  CANCELLED: "Annulée",
}
