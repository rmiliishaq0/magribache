import axios from "axios"
export async function getPurchaseOrders(params?: URLSearchParams) {
  const response = await axios.get(`/api/purchase-orders-fetch?${params ?? ""}`)
  return response.data
}
