import { DocumentStatus } from "@/app/generated/prisma/browser";
import { z } from "zod";
import { devisWithRefrence } from "../schemas/devis";
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
    form:UseFormReturn<z.infer<typeof devisWithRefrence>>,
    isPending:boolean,
    isError:boolean,
    handlePrint:()=>void
}

export type DevisContentProps = {
    form:UseFormReturn<z.infer<typeof devisWithRefrence>>,
    onSubmit:(data:z.infer<typeof devisWithRefrence>)=>void,
    data:{label:string | null,value:string | null}[] | undefined,
    previewRef:React.RefObject<HTMLDivElement | null>,
    client:
    {name:string,
    email:string,
    phone:string,
    reference:string
    },
    reference:string
}

export type DocFormProps ={
    form:UseFormReturn<z.infer<typeof devisWithRefrence>>,
    clients:{label:string | null,value:string | null}[] | undefined,
    onSubmit:(data:z.infer<typeof devisWithRefrence>)=>void
}