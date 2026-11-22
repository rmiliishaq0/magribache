"use server"
import { purchaseOrdersService } from "../services/purchase-orders.service"
export async function createPurchaseOrder(data: unknown) {
  return purchaseOrdersService.create(data)
}
