import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteDevis } from "../../actions/delete-devis";

export function useDeleteDevis() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: deleteDevis,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['devis'] }); 
          toast.success("Devis supprimé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}