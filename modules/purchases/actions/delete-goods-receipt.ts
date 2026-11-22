"use server"
import { goodsReceiptsService } from "../services/goods-receipts.service"

export async function deleteGoodsReceipt(reference: string) {
  return goodsReceiptsService.delete(reference)
}
