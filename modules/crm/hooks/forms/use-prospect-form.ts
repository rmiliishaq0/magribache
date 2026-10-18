import { zodResolver } from "@hookform/resolvers/zod";
import { crmSchema } from "../../schemas/prospect";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useProspectForm({defaultValues}:{defaultValues?:z.infer<typeof crmSchema>}){
    return useForm<z.infer<typeof crmSchema>>({
        resolver:zodResolver(crmSchema),
        mode:"all",
        reValidateMode:"onChange",
        defaultValues:defaultValues? defaultValues : {
            companyName:"",
            fullName:"",
            email:"",
            phone:"",
            whatsapp:"",
            website:"",
            address:"",
            city:"",
            region:"",
            country:"", 
            ice:"",
            rc:"",
            ifNumber:"",
            activity:"",
            source:"OTHER",
            status:"NEW",
            priority:"LOW",
            notes:"",
            nextFollowUpAt:undefined,
            companyType:"INDIVIDUAL",
        }
    })}