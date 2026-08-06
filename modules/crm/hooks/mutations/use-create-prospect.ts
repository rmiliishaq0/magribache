import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProspect } from "../../actions/create-prospect";
import { toast } from "sonner";

export function useCreateProspect() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: createProspect,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['prospects'] }); 
          toast.success("Prospect créé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}