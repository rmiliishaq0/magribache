"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z} from "zod"
import { devisWithRefrence } from "@/modules/devis/schemas/devis";


export function useDevisForm() {
    return (useForm<z.infer<typeof devisWithRefrence>>({
      resolver:zodResolver(devisWithRefrence),

      mode:"all",
      reValidateMode:"onBlur",
      defaultValues:{
         notes:"",
         items:[
            {
               product:"",
               quantity:1,
               unitPrice:0,
               tax:20,
            }
         ]
      }
   }))
}