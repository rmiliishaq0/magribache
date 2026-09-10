import { DocumentStatus } from "@/app/generated/prisma/browser";
import { z } from "zod";
import { devisSchema } from "../schemas/devis";
import { UseFormReturn } from "react-hook-form";

export type FilterType ={
    status?: DocumentStatus;
    client?: string;
    city?: string;
    date?: {from?:string,to?:string}
    take?:number
    skip?:number
}

export type CLientWithDevis = {
    reference:string | null;
    fullName:string | null; 
    city:string | null;
}

export type DevisHeaderProps = {
    form:UseFormReturn<z.infer<typeof devisSchema>>,
    isPending:boolean,
    isError:boolean,
    handlePrint:()=>void
}

export type DevisContentProps = {
    form:UseFormReturn<z.infer<typeof devisSchema>>,
    onSubmit:(data:z.infer<typeof devisSchema>)=>void,
    data:{label:string | null,value:string | null}[] | undefined,
    previewRef:React.RefObject<HTMLDivElement | null>,
    client:
    {name:string,
    email:string,
    phone:string
    },
}

export type DocFormProps ={
    form:UseFormReturn<z.infer<typeof devisSchema>>,
    clients:{label:string | null,value:string | null}[] | undefined,
    onSubmit:(data:z.infer<typeof devisSchema>)=>void
}