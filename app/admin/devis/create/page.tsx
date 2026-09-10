"use client"


import { Card ,CardContent} from "@/components/ui/card"
import { z} from "zod"
import { useEffect, useState ,useRef, useMemo} from "react"
import { useReactToPrint } from "react-to-print"
import { useMutation } from "@tanstack/react-query"
import {toast} from "sonner"
import { createDevis } from "@/utils/Apis"
import { useRouter } from "next/navigation"
import DevisHeader from "@/modules/devis/components/devis-header";
import DevisContent from "@/modules/devis/components/devis-content";
import { devisSchema } from "@/modules/devis/schemas/devis";
import { useDevisForm } from "@/modules/devis/hooks/forms/use-devis-form";
import { useGetAllPartners } from "@/modules/devis/hooks/queries/use-get-all-partners";

type Partner={
    city: string | null;
    email: string | null;
    fullName: string | null;
    phone: string | null;
    reference: string;
    whatsapp: string | null;
}
export default function DevisCreatePage() {
    const router = useRouter()
    const previewRef =useRef<HTMLDivElement>(null)

    const getAllPartners = useGetAllPartners()

    const partners = useMemo(()=>{
      return getAllPartners?.data?.clients?.map((i:Partner)=>({label:i.fullName,value:i.reference})) || []
    },[getAllPartners])

    const [client,setClient] = useState({name:"",email:"",phone:""})

    const form = useDevisForm()

    const selectedClientId = form.watch("client")

   useEffect(() => {

  const selectedClient =
    getAllPartners?.data?.clients?.find(
      (i:Partner) => i.reference === selectedClientId
    )

  setClient({
    name: selectedClient?.fullName || "",
    email: selectedClient?.email || "",
    phone: selectedClient?.phone || "",
  })

}, [selectedClientId, getAllPartners?.data])


   const handlePrint = useReactToPrint({contentRef: previewRef,})

  const {isError,isPending,mutate}=useMutation({
          mutationFn: async (data:z.infer<typeof devisSchema>) => createDevis(data),
          onSuccess: () => {
              toast.success("Devis a été créé avec succès");
              router.push("/admin/sales")
          },
          onError: (error) => {
              toast.error(error.message ||"Erreur lors de la suppression du contact fournisseur");
          }
    })
  const onSubmit = (data:z.infer<typeof devisSchema>)=>{
    mutate(data)
  }
    return (
          <Card className="mb-6">           
          <CardContent className="space-y-6">
            <DevisHeader form={form} isPending={isPending} isError={isError} handlePrint={handlePrint}/>
            <DevisContent form={form}   onSubmit={onSubmit} data={partners}  previewRef={previewRef} client={client}/>
          </CardContent>
        </Card>
    )
  }
  