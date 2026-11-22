import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updatePurchaseOrder } from "../../actions/update-purchase-order"
export function useUpdatePurchaseOrder() {
  const query = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: unknown }) => updatePurchaseOrder(id, data),
    onSuccess: (result) => {
      if (result.success) {
        query.invalidateQueries({ queryKey: ["purchase-orders"] })
        toast.success(result.message)
        router.refresh()
      } else toast.error(result.message)
    },
    onError: (error) => toast.error(error.message),
  })
}
