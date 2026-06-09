import {useForm} from "react-hook-form";
import {taskSchema, taskSchemaWithID} from "@/utils/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";

type TaskFormValues = z.infer<typeof taskSchemaWithID> | null;


export default function useTaskForm(values?: TaskFormValues) {
    return useForm<z.infer<typeof taskSchema>>({
        resolver:zodResolver(taskSchema),
        mode:"all",
        reValidateMode:"onBlur",
        defaultValues: values ?? {
            name: "",
            dueDate: "",
            project: "",
            //status: "",
            description: "",
        }
    })
}