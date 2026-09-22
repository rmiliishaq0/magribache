import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateVisual } from "../../actions/update-visual";

export function useUpdateVisual() {
  const query =useQueryClient()
  return useMutation({
    mutationFn: updateVisual,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['admins'] }); 
          toast.success("Paramètres mis à jour avec succè");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}