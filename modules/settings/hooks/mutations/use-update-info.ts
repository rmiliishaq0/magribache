import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateInfo } from "../../actions/update-info";

export function useUpdate() {
  const query =useQueryClient()
  return useMutation({
    mutationFn: updateInfo,
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