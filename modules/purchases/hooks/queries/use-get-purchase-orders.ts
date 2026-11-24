import { useQuery } from "@tanstack/react-query"
import { getPurchaseOrders } from "../../api/get-purchase-orders"
import type { z } from "zod"
import type { purchaseOrderFilterSchema } from "../../schemas/filter-schema"

export function useGetPurchaseOrders({ page, limit, activeFilters }: { page: number; limit: number; activeFilters?: z.infer<typeof purchaseOrderFilterSchema> }) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  Object.entries(activeFilters ?? {}).forEach(([key, value]) => {
    if (key === "date" && value && typeof value === "object") {
      if (value.from) params.set("from", value.from.toISOString())
      if (value.to) params.set("to", value.to.toISOString())
    } else if (value !== undefined) params.set(key, String(value))
  })
  return useQuery({
    queryKey: ["purchase-orders", page, limit, activeFilters],
    queryFn: () => getPurchaseOrders(params),
  })
}
