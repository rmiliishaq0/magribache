"use server"
import { goodsReceiptsService } from "../services/goods-receipts.service"

export async function getGoodsReceipt(reference: string) {
  return goodsReceiptsService.getByReference(reference)
}
