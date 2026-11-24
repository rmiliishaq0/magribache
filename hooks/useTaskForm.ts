import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { taskSchema } from "@/utils/schema";

export default function useTaskForm(defaultValues?: z.infer<typeof taskSchema>) {
  return useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    mode: "all",
    reValidateMode: "onBlur",
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      dueDate: "",
      priority: "Moyenne",
      project: "",
      status: "En cours",
    },
  });
}
