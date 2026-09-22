"use client"

import { useAuthStore } from "@/stores/auth-store"
import { UseFormReturn } from "react-hook-form"
import {z} from "zod"
import Image from "next/image";
import {  devisWithRefrence } from "@/modules/devis/schemas/devis";
import { formatDate } from "@/utils/format-date";
import { useEffect, useState } from "react";
import { DocumentSettings } from "@/modules/settings/types";
import { readSettings } from "@/modules/settings/utils/read-settings";
import { toWords } from 'to-words';



interface DevisPreviewProps {
  form: UseFormReturn<z.infer<typeof devisWithRefrence>>
  name:string,
  email:string,
  phone:string,
  isFacture:boolean
  docNumber:string | null
  clientRefrence:string
}

export default function DocPreview({
  name,
  email,
  phone,  
  form,
  isFacture,
  docNumber,
  clientRefrence
}: DevisPreviewProps) {
  let defaults :DocumentSettings
  const user =useAuthStore()

  const [settings, setSettings] = useState<DocumentSettings>(() => readSettings(user.documentSettings,defaults));

  useEffect(() => {
      const settings:DocumentSettings = readSettings(user.documentSettings,defaults)
      defaults={  priceMode:settings?.priceMode || "ht",  totalHtLabel:settings?.totalHtLabel || "Total HT", totalVatLabel:settings?.totalVatLabel || "Total TVA", netLabel:settings?.netLabel || "Net à Payer", recipientSignature:settings?.recipientSignature || "", amountPrefix:settings?.amountPrefix || "Arrêté le présent document à la somme de :", paymentTerms:settings?.paymentTerms || "50% à la commande 50% à la livraison", footer: "" };
      setSettings(settings)
    }, [user.documentSettings]);
  const values = form.watch()

  const subtotal =
    values.items?.reduce((acc: number, item: any) => {
      return acc + (item.quantity * item.unitPrice)
    }, 0) || 0

  const tax =
    values.items?.reduce((acc: number, item: any) => {
      return (
        acc +
        (
          item.quantity *
          item.unitPrice *
          (user?.tva ?? 20)
        ) / 100
      )
    }, 0) || 0

  const total = subtotal + tax
  return (
    <div className="sticky top-4 w-full">

      {/* A4 PAGE */}
      <div
        className="
          bg-white
          text-black
          w-full
          max-w-[210mm]
          min-h-[297mm]
          mx-auto
          shadow-xl
          rounded-lg
          p-10
          border
        "
      >

        {/* HEADER */}
        <div className="flex  justify-between border-b pb-6 items-end">

          <div className="flex flex-col items-start">
              {user.logo && user.logo !=undefined && user.logo !=null && user.logo !="undefined"   && (
                <Image src={"/"+user.logo}  alt="Logo"  width={180}
  height={80} className="object-contain mb-4" />
              )}
            <h1 className={`text-3xl font-bold` }   style={{ color: user.titlesColor || "#000" }}
>
              {isFacture?"Facture" : "DEVIS"}
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              {isFacture? (docNumber ? docNumber : "N° FAC-2026-0001" ):(docNumber ? docNumber : "N° DEV-2026-0001" )}
            </p>
          </div>

          <div className="text-right">
            <h2 className="font-semibold text-lg">
              {user?.name ??""}
            </h2>

            <p className="text-sm text-muted-foreground">
              {user?.address}
            </p>

            <p className="text-sm text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {user?.website}
            </p>
            <p className="text-sm text-muted-foreground">
              {user?.phone}
            </p>
          </div>

        </div>


        {/* CLIENT */}
        <div className="mt-8 grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {clientRefrence.startsWith("CL") ? "CLIENT" : "PROSPECT"}
            </p>

            <div className="space-y-1">

              <p className="font-medium">
                {name || "Nom du client"}
              </p>

              <p className="text-sm text-muted-foreground">
                {email || "client@email.com"}
              </p>

              <p className="text-sm text-muted-foreground">
                {phone || "+212"}
              </p>

            </div>
          </div>

          <div className="text-right space-y-1">

            <p>
              <span className="font-medium">
                Date:
              </span>{" "}
              {values.documentDate ? formatDate(new Date(values.documentDate)) :   formatDate(new Date())}
            </p>

            <p>
              <span className="font-medium">
                Validité:
              </span>{" "}
              {(values.validUntil && formatDate(new Date(values.validUntil))) || "Indéterminée"}
            </p>

          </div>

        </div>
    
        <p className="mt-6 font-medium">Mode de paiement :</p>
        {/* ITEMS TABLE */}
        <div className="mt-4 overflow-hidden border rounded-lg">
          <table className="w-full">

            <thead style={{backgroundColor:user.tableBgColor || "oklch(0.97 0 0)" ,color:user.tableFontColor ? "white" :"black"}}>

              <tr className="text-left">

                <th className="p-4 font-medium">
                  Article
                </th>

                <th className="p-4 font-medium">
                  Qté
                </th>

                <th className="p-4 font-medium">
                  Prix
                </th>

                <th className="p-4 font-medium">
                  TVA
                </th>

                <th className="p-4 font-medium text-right">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {values.items?.map(
                (item: any, index: number) => {

                  const lineTotal =
                    item.quantity *
                    item.unitPrice

                  return (
                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="p-4">
                        {item.article || "Article"}
                      </td>

                      <td className="p-4">
                        {item.quantity || 0}
                      </td>

                      <td className="p-4">
                        {item.unitPrice || 0} {user.currency}
                      </td>

                      <td className="p-4">
                        {user.tva || 0}%
                      </td>

                      <td className="p-4 text-right font-medium">
                        {lineTotal.toFixed(2)} {user.currency}
                      </td>

                    </tr>
                  )
                }
              )}

            </tbody>

          </table>

        </div>
        <div className="bg-white w-full mt-6 border-l-4 py-2 px-4 rounded-md" style={{borderColor:user?.titlesColor || "white"}}>
          <p className="text-sm text-muted-foreground">{settings?.amountPrefix}</p>
          <p className="font-medium mt-1">{toWords(tax.toFixed(2),{localeCode:"fr-MA"})}</p>
        </div>      
        <p className="text-[12px] text-muted-foreground mt-4">{settings?.paymentTerms}</p>
        {/* NOTES */}
        <div className="mt-8">

          <p className="font-medium mb-2 text-wrap">
            Notes
          </p>

          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {values.notes || "Aucune note"}
          </p>

        </div>

        {/* TOTALS */}
        <div className="mt-6 flex items-end flex-col mb-6">


          <div className="w-full max-w-sm space-y-3 ">

            <div className="flex justify-between">
              <span>{settings?.totalHtLabel}</span>

              <span>
                {subtotal.toFixed(2)} {user.currency}
              </span>
            </div>

            <div className="flex justify-between">
              <span>{settings?.totalVatLabel}</span>

              <span>
                {tax.toFixed(2)} {user.currency}
              </span>
            </div>

            <div className={`border-t pt-3 flex justify-between text-xl font-bold`}   style={{ color: user.titlesColor || "#000" }}>

              <span>{settings?.netLabel}</span>

              <span>
                {total.toFixed(2)} {user.currency}
              </span>

            </div>

          </div>

          

        </div>

        <div className="border-t w-full ">
          <div className=" ml-[50%]  mt-6">
            <p className="font-medium decoration-1 underline underline-offset-1">{settings?.recipientSignature || "Signature & Cachet Client"}</p>
            <div className="mt-2">
            {user.signature && user.signature !=undefined && user.signature !=null && user.signature !="undefined" && (
              <Image width={250}
  height={120}
  className="object-contain" src={"/"+user.signature} alt="signature"/>
            )}
          </div>
          </div>
        </div>

        <div className="mt-20 border-t pt-6 text-center text-sm text-muted-foreground">

          {settings?.footer ||"Merci pour votre confiance."}

        </div>

      </div>

    </div>
  )
}