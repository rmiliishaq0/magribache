import { updateProspect } from "@/modules/crm/actions/update-prospect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateClient() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: updateProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['clients'] }); 
          toast.success("Client mis à jour avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}