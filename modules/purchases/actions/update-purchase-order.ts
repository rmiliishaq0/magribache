"use server"
import { purchaseOrdersService } from "../services/purchase-orders.service"
export async function updatePurchaseOrder(id: number, data: unknown) {
  return purchaseOrdersService.update(id, data)
}
