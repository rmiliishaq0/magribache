"use server"

import { purchaseOrdersService } from "../services/purchase-orders.service"

export async function deletePurchaseOrder(reference: string) {
  return purchaseOrdersService.delete(reference)
}
