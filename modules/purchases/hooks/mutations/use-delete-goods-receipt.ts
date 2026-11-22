import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteGoodsReceipt } from "../../actions/delete-goods-receipt"
import { cancelGoodsReceipt } from "../../actions/cancel-goods-receipt"

export function useDeleteGoodsReceipt() {
  const query = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: ({ reference, cancel }: { reference: string; cancel: boolean }) =>
      cancel ? cancelGoodsReceipt(reference) : deleteGoodsReceipt(reference),
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
