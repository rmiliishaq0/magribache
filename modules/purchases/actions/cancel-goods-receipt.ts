"use server"
import { goodsReceiptsService } from "../services/goods-receipts.service"

export async function cancelGoodsReceipt(reference: string) {
  return goodsReceiptsService.cancel(reference)
}
