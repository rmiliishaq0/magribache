import { useQuery } from "@tanstack/react-query"
import type { z } from "zod"
import type { goodsReceiptFilterSchema } from "../../schemas/goods-receipt-filter-schema"
import { getGoodsReceipts } from "../../api/get-goods-receipts"

export function useGetGoodsReceipts({ page, limit, activeFilters }: {
  page: number
  limit: number
  activeFilters?: z.infer<typeof goodsReceiptFilterSchema>
}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  Object.entries(activeFilters ?? {}).forEach(([key, value]) => {
    if (key === "date" && value && typeof value === "object") {
      if (value.from) params.set("from", value.from.toISOString())
      if (value.to) params.set("to", value.to.toISOString())
    } else if (value !== undefined) params.set(key, String(value))
  })
  return useQuery({
    queryKey: ["goods-receipts", page, limit, activeFilters],
    queryFn: () => getGoodsReceipts(params),
  })
}
