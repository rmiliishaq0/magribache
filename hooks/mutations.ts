import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useTaskUpadte() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: unknown) =>
      (await axios.post("/api/update-task", { data })).data,
    onSuccess: () => {
      toast.success("La tâche a été modifiée avec succès");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Erreur lors de la modification");
    },
  });
}
