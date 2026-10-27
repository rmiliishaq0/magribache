import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { filterSchema } from "../../schemas/filter";

export function useFilterBoard(){
    return useForm<z.infer<typeof filterSchema>>({
        resolver:zodResolver(filterSchema),
        mode:"all",
        reValidateMode:"onChange",
        defaultValues:{
            statut:undefined,
            type:undefined,
        }
})}