
"use client"
import { Card, CardContent } from "@/components/ui/card"
import { usePushDevis } from "../hooks/mutations/use-push-devis"
import { useDevisForm } from "../hooks/forms/use-devis-form"
import DevisHeader from "./devis-header"
import DevisContent from "./devis-content"
import { devisWithRefrence } from "../schemas/devis"
import z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { useGetAllPartners } from "../hooks/queries/use-get-all-partners"
import { useDebouncedCallback } from 'use-debounce';


type Partner={
    city: string | null;
    email: string | null;
    fullName: string | null;
    phone: string | null;
    reference: string;
    whatsapp: string | null;
}

export default function({data}:{data:z.infer<typeof devisWithRefrence>}){

    const previewRef =useRef<HTMLDivElement>(null)
    const getAllPartners = useGetAllPartners()
    const form = useDevisForm(data)
    const router = useRouter()
    const {isError,isPending,mutate}= usePushDevis()

    const handlePrint =useReactToPrint({contentRef: previewRef})

    const selectedClientId = form.watch("client")
    
    const {
        isValid,
        isDirty,
        isSubmitting,
    } = form.formState;
    const watch = form.watch()

    const client= useMemo(()=>{
        const selectedClient =getAllPartners?.data?.clients?.find((i:Partner) => i.reference === selectedClientId)
        return({
            name: selectedClient?.fullName || "",
            email: selectedClient?.email || "",
            phone: selectedClient?.phone || "",
            reference:selectedClient?.reference || "",
        })
    },[selectedClientId, getAllPartners?.data])

    useEffect(()=>{
        if(!data) return
        form.reset(data)
    },[form,data])

    const partners = useMemo(()=>{
          return getAllPartners?.data?.clients?.map((i:Partner)=>({label:i.fullName,value:i.reference})) || []
    },[getAllPartners])
    
    const onSubmit = useCallback((data:z.infer<typeof devisWithRefrence>)=>{
    mutate(data,{
      onSuccess:()=>{
        router.push("/admin/devis")
        toast.success("Modifications sauvegardées avec succès")
      }
    })
    },[])

    const debounced = useDebouncedCallback(
      (data: z.infer<typeof devisWithRefrence>) => {
        const snapshot = JSON.stringify(data);
    
        mutate(data, {
          onSuccess: () => {
            if (JSON.stringify(form.getValues()) === snapshot) {
              form.reset(form.getValues());
            }
    
            toast.success("Modifications sauvegardées avec succès");
          },
        });
      },
      2000
    );

    
    useEffect(() => {
        if (!isValid || !isDirty || isSubmitting || isPending) return;
        debounced(watch);
    }, [watch,isValid,isDirty,isSubmitting,isPending,   debounced,]);


    return(
        <Card className="mb-6">           
            <CardContent className="space-y-6">
              <DevisHeader type="Modify" form={form} isPending={isPending} isError={isError} handlePrint={handlePrint}/>
              <DevisContent reference={data.reference} form={form}  onSubmit={onSubmit} data={partners}  previewRef={previewRef} client={client}/>
            </CardContent>
          </Card>
    )
}