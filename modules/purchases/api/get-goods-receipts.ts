import axios from "axios"

export async function getGoodsReceipts(params?: URLSearchParams) {
  const response = await axios.get(`/api/goods-receipts-fetch?${params ?? ""}`)
  return response.data
}
