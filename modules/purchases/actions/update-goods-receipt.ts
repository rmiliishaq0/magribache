"use server"
import { goodsReceiptsService } from "../services/goods-receipts.service"

export async function updateGoodsReceipt(id: number, data: unknown) {
  return goodsReceiptsService.update(id, data)
}
