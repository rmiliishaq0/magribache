import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProspect } from "../../actions/update-prospect";
import { toast } from "sonner";

export function useUpdateProspect() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: updateProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['prospects'] }); 
          toast.success("Prospect mis à jour avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}