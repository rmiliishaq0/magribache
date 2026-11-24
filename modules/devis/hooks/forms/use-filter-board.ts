import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { filterSchema } from "../../schemas/devis-filter-schema";

export function useFilterBoard(){
    return useForm<z.infer<typeof filterSchema>>({
        resolver:zodResolver(filterSchema),
        mode:"all",
        reValidateMode:"onChange",
        defaultValues:{
            city:"",
            statut:undefined,
            date:{from:undefined,to:undefined},
            client:undefined
        }
})}