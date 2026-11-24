import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateGoodsReceipt } from "../../actions/update-goods-receipt"

export function useUpdateGoodsReceipt() {
  const query = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) => updateGoodsReceipt(id, data),
    onSuccess: (result) => {
      if (result.success) {
        query.invalidateQueries({ queryKey: ["goods-receipts"] })
        query.invalidateQueries({ queryKey: ["purchase-orders"] })
        toast.success(result.message)
        router.refresh()
      } else toast.error(result.message)
    },
  })
}
