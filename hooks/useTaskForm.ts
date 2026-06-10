import {useForm} from "react-hook-form";
import {taskSchema, taskSchemaWithID} from "@/utils/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";

type TaskFormValues = z.infer<typeof taskSchemaWithID> | null;


export default function useTaskForm() {
    return useForm<z.infer<typeof taskSchema>>({
        resolver:zodResolver(taskSchema),
        mode:"all",
        reValidateMode:"onChange",
        defaultValues: {
            name: "",
            dueDate: "",
            project: "",
            description: "",
            priority: "Moyenne",
            status:"En cours"
        }
    })
}