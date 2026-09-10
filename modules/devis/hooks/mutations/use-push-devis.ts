import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function usePushDevis() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: pushDevis,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['devis'] }); 
          toast.success("Devis créé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}