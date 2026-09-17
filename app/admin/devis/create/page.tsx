"use client"

import { Card ,CardContent} from "@/components/ui/card"
import { z} from "zod"
import { useEffect, useState ,useRef, useMemo} from "react"
import { useReactToPrint } from "react-to-print"
import DevisHeader from "@/modules/devis/components/devis-header";
import DevisContent from "@/modules/devis/components/devis-content";
import { devisWithRefrence } from "@/modules/devis/schemas/devis";
import { useDevisForm } from "@/modules/devis/hooks/forms/use-devis-form";
import { useGetAllPartners } from "@/modules/devis/hooks/queries/use-get-all-partners";
import { useGetReference } from "@/modules/devis/hooks/queries/use-get-reference"
import { usePushDevis } from "@/modules/devis/hooks/mutations/use-push-devis"
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from "next/navigation"
import { toast } from "sonner"


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

    const refrenceQuery = useGetReference()

    const reference = useMemo(()=>{
      return refrenceQuery?.data?.reference || ""
    },[refrenceQuery?.data])

    const partners = useMemo(()=>{
      return getAllPartners?.data?.clients?.map((i:Partner)=>({label:i.fullName,value:i.reference})) || []
    },[getAllPartners])

    useEffect(()=>{
      if(reference){
        form.setValue("reference", reference, {
          shouldDirty: false,
        });
      }
    },[reference])

    const [client,setClient] = useState({name:"",email:"",phone:""})

    const form = useDevisForm()

    const {
        isValid,
        isDirty,
        isSubmitting,
    } = form.formState;
    
    const watch = form.watch()

    const selectedClientId = watch.client

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

  const {isError,isPending,mutate}= usePushDevis()

  const onSubmit = (data:z.infer<typeof devisWithRefrence>)=>{
    mutate(data,{
      onSuccess:()=>{
        router.push("/admin/devis")
        toast.success("Devis créé avec succès")
      }
    })
  }

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
  1000
);


//   useEffect(() => {
//   if (!isValid || !isDirty || isSubmitting || isPending) return;

//   debounced(watch);
// }, [
//   watch,
//   isValid,
//   isDirty,
//   isSubmitting,
//   isPending,
//   debounced,
// ]);

    return (
          <Card className="mb-6">           
          <CardContent className="space-y-6">
            <DevisHeader form={form} isPending={isPending} isError={isError} handlePrint={handlePrint}/>
            <DevisContent form={form}  onSubmit={onSubmit} data={partners}  previewRef={previewRef} client={client}/>
          </CardContent>
        </Card>
    )
  }
  