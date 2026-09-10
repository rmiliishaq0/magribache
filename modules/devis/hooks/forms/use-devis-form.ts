"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z} from "zod"
import { devisSchema } from "@/modules/devis/schemas/devis";


export function useDevisForm() {
    return (useForm<z.infer<typeof devisSchema>>({
      resolver:zodResolver(devisSchema),

      mode:"all",
      reValidateMode:"onBlur",
      defaultValues:{
         notes:"",
         items:[
            {
               article:"",
               quantity:1,
               unitPrice:0,
               tax:20,
            }
         ]
      }
   }))
}