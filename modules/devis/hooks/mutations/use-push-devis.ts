import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createOrUpdateDevis } from "../../actions/createOrUpdate";

export function usePushDevis() {
    const query =useQueryClient()
      return useMutation({
        mutationFn: createOrUpdateDevis,
        onSuccess: (r) => {
            if(r.success){
              query.invalidateQueries({ queryKey: ['devis'] });                             
            }else{
              toast.error(r.message)
            }
            
        },
        onError: (error) => {
            toast.error(error.message);
        }
      });
}