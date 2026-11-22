import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createGoodsReceipt } from "../../actions/create-goods-receipt"

export function useCreateGoodsReceipt() {
  const query = useQueryClient()
  return useMutation({
    mutationFn: createGoodsReceipt,
    onSuccess: (result) => {
      if (result.success) {
        query.invalidateQueries({ queryKey: ["goods-receipts"] })
        query.invalidateQueries({ queryKey: ["purchase-orders"] })
        toast.success(result.message)
      } else toast.error(result.message)
    },
  })
}
