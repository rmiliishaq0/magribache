import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProspect } from "../../actions/delete-prospect";
import { toast } from "sonner";

export function useDeleteProspect() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: deleteProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['prospects'] }); 
          toast.success("Prospect supprimé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}