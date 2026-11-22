"use server"
import { goodsReceiptsService } from "../services/goods-receipts.service"

export async function createGoodsReceipt(data: unknown) {
  return goodsReceiptsService.create(data)
}
