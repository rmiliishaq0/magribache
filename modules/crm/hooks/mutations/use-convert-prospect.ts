import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveProspect } from "../../actions/move-prospect";
import { toast } from "sonner";

export function useConvertProspect() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: moveProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['prospects'] }); 
          toast.success("Prospect converti avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}