import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import createClient from "../../actions/create-client";

export function useCreateClient() {
    const query =useQueryClient()
  return useMutation({
    mutationFn: createClient,
    onSuccess: (r) => {
        if(r.success){
          query.invalidateQueries({ queryKey: ['clients'] }); 
          toast.success("Client créé avec succès");
        }else{
          toast.error(r.message)
        }
        
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });
}