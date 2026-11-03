import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSupplier } from "../../actions/update-supplier";

export function useUpdateSupplier() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: updateSupplier,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['suppliers'] }); 
          toast.success("Fournisseur mis à jour avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}