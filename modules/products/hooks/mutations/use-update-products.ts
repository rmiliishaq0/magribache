import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProducts } from "../../actions/update-products";

export function useUpdateProducts() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: updateProducts,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['products'] }); 
          toast.success("Produit mis à jour avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}