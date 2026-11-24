import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSupplier } from "../../actions/create-supplier";

export function useCreateSupplier() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: createSupplier,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['suppliers'] }); 
          toast.success("Fournisseur créé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}