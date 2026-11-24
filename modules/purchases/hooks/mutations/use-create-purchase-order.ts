import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPurchaseOrder } from "../../actions/create-purchase-order"
export function useCreatePurchaseOrder() {
  const query = useQueryClient()
  return useMutation({
    mutationFn: createPurchaseOrder,
    onSuccess: (result) => {
      if (result.success) {
        query.invalidateQueries({ queryKey: ["purchase-orders"] })
        toast.success(result.message)
      } else toast.error(result.message)
    },
    onError: (error) => toast.error(error.message),
  })
}
