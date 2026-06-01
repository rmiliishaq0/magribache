import {useMutation, useQueryClient} from "@tanstack/react-query";
import { taskSchemaWithID} from "@/utils/schema";
import {updateTask} from "@/utils/Apis";
import {toast} from "sonner";
import {z} from 'zod'

export  function useTaskUpadte() {
    const queryClient = useQueryClient();
    return useMutation(
            {
                mutationFn:(data:z.infer<typeof taskSchemaWithID>)=>updateTask(data),
                onSuccess:()=>{
                    toast.success("La tâche a été modifié avec succès")
                    queryClient.invalidateQueries({ queryKey: ['tasks'] })
                },
                onError:(error)=>{
                    toast.error(error.message)
                },
            }
        )

}