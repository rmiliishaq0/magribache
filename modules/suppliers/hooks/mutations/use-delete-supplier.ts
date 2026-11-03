import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteSupplier } from "../../actions/delete-supplier";

export function useDeleteSupplier() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: deleteSupplier,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['suppliers'] }); 
          toast.success("Fournisseur supprimé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}