"use server"

import { purchaseOrdersService } from "../services/purchase-orders.service"

export async function getPurchaseOrder(reference: string) {
  return purchaseOrdersService.getByReference(reference)
}
