import getDevis from "@/modules/clients/actions/getDevis"
import DevisUpdate from "@/modules/devis/components/devis-update"
import { notFound } from "next/navigation"
  


export default async function DevisCreatePage({params}:{params:Promise<{reference:string}>}) {   
  const {reference} = await params

  if(!reference) notFound()

  const result = await getDevis(reference)

  if(!result?.devis) notFound()

  const devis= result?.devis

  return (
    <DevisUpdate data={{
    ...devis,
    client: devis.client.reference,
    notes:devis.notes || undefined,
    validUntil:devis.validUntil ||undefined,
    discount:devis?.discount ? Number(devis?.discount) : undefined,
    subtotal:devis?.subtotal ? Number(devis?.subtotal) : undefined,
    taxAmount:devis?.taxAmount ? Number(devis?.taxAmount) : undefined,
    totalAmount:devis?.totalAmount ? Number(devis?.totalAmount) : undefined,
    paymentMethod:devis.paymentMethod || undefined,
    chequeNum:devis.chequeNum ||undefined,
    bank:devis.bank || undefined
  }}/>
  )
}
  