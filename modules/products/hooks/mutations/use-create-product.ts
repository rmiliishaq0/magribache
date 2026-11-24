import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "@/modules/products/actions/create-product";

export function useCreateProduct() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['products'] }); 
          toast.success("Produit créé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}