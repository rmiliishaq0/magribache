"use client"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import DevisForm from "@/components/devis-from"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { devisSchema } from "@/utils/schema"
import { z} from "zod"
import DevisPreview from "@/components/devis-preview"
import { useClients } from "@/hooks/querys"
import { useEffect, useState ,useRef, RefObject} from "react"
import { useReactToPrint } from "react-to-print"
import { Spinner } from "@/components/ui/spinner"
import { useMutation } from "@tanstack/react-query"
import {toast} from "sonner"
import { createDevis } from "@/utils/Apis"
import { useRouter } from "next/navigation"
  
  export default function DevisCreatePage() {
    const router = useRouter()
    const previewRef =useRef<HTMLDivElement>(null)
    const clientQuery = useClients({},true)
    const [client,setClient] = useState({name:"",email:"",phone:""})
    const form = useForm<z.infer<typeof devisSchema>>({
      resolver:zodResolver(devisSchema),

      mode:"all",
      reValidateMode:"onBlur",
      defaultValues:{
         client:"",
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
   })
   const selectedClientId = form.watch("client")
   useEffect(() => {

  const selectedClient =
    clientQuery?.data?.clients?.find(
      (i:any) => i.id === selectedClientId
    )

  setClient({
    name: selectedClient?.entreprise || "",
    email: selectedClient?.email || "",
    phone: selectedClient?.téléphone || "",
  })

}, [selectedClientId, clientQuery?.data?.clients])


   const handlePrint =
  useReactToPrint({
    contentRef: previewRef,
  })

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
          <div className="flex flex-col gap-4 mb-4">
            <Card className="flex justify-between items-center gap-4 flex-row p-4">
              <h2 className="text-lg font-bold text-secondary">Créer Un Devis</h2>
              <div className="flex gap-4">
                <Button form="devis" disabled={!form.formState.isValid || isPending || isError || !form.formState.isDirty  } type="submit">
                  {isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                </Button>
                <Button onClick={handlePrint} variant="outline">Imprimer</Button>
              </div>
            </Card>

              <ResizablePanelGroup
                  orientation="horizontal"
                className="min-h-[200px] w-full rounded-xl border  bg-card"
            >
              <ResizablePanel defaultSize="40%" className="w-full">
                <div className="flex h-full  justify-center p-4 w-full">
                  <DevisForm onSubmit={onSubmit} client={clientQuery?.data?.clients ?? []} form={form} />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize="60%" className="w-full">
                <div ref={previewRef} className="flex h-full w-full justify-center p-4 w-full">
                  <DevisPreview name={client.name} email={client.email} phone={client.phone} form={form}/>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>  
          </div>
    )
  }
  