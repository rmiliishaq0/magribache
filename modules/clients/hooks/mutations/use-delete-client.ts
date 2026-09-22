import { deleteProspect } from "@/modules/crm/actions/delete-prospect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteClient() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: deleteProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['clients'] }); 
          toast.success("Client supprimé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}