"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deletePurchaseOrder } from "../../actions/delete-purchase-order"

export function useDeletePurchaseOrder() {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: deletePurchaseOrder,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message)
        return
      }
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] })
      toast.success(result.message)
      router.push("/admin/purchases/purchase-order")
    },
    onError: (error) => toast.error(error.message),
  })
}
