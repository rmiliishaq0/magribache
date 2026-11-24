import { deleteProspect } from "@/modules/crm/actions/delete-prospect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProduct } from "../../actions/delete-products";

export function useDeleteProduct() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['products'] }); 
          toast.success("Produit supprimé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}