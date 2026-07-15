"use client"

import { useAuthStore } from "@/stores/auth-store"
import { devisSchema } from "@/utils/schema"
import { UseFormReturn } from "react-hook-form"
import {z} from "zod"
import Image from "next/image";


interface DevisPreviewProps {
  form: UseFormReturn<z.infer<typeof devisSchema>>
  name:string,
  email:string,
  phone:string,
  isFacture:boolean
  docNumber:string | null
}

export default function DocPreview({
  name,
  email,
  phone,  
  form,
  isFacture,
  docNumber
}: DevisPreviewProps) {


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
          item.tax
        ) / 100
      )
    }, 0) || 0

  const total = subtotal + tax
    const user =useAuthStore()
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
              {user.logo && (
                <Image src={user.logo}  alt="Logo"  width={180}
  height={80} className="object-contain mb-4" />
              )}
            <h1 className={`text-3xl font-bold` }   style={{ color: user.defaultColor || "#000" }}
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
              CLIENT
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
              {values.devisDate ? new Date(values.devisDate).toLocaleDateString() :   new Date().toLocaleDateString()}
            </p>

            <p>
              <span className="font-medium">
                Validité:
              </span>{" "}
              {values.dateValidite || "Indéterminée"}
            </p>

          </div>

        </div>

        {/* ITEMS TABLE */}
        <div className="mt-10 overflow-hidden border rounded-lg">

          <table className="w-full">

            <thead style={{backgroundColor:user.defaultColor || "oklch(0.97 0 0)" ,color:user.defaultColor ? "white" :"black"}}>

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
                        {item.unitPrice || 0} {values.devise}
                      </td>

                      <td className="p-4">
                        {item.tax || 0}%
                      </td>

                      <td className="p-4 text-right font-medium">
                        {lineTotal.toFixed(2)} {values.devise}
                      </td>

                    </tr>
                  )
                }
              )}

            </tbody>

          </table>

        </div>

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
        <div className="mt-10 flex justify-between items-center">
          <div>
            {user.signature && (
              <Image width={250}
  height={120}
  className="object-contain" src={user.signature} alt="signature"/>
            )}
          </div>

          <div className="w-full max-w-sm space-y-3">

            <div className="flex justify-between">
              <span>Sous-total HT</span>

              <span>
                {subtotal.toFixed(2)} {values.devise}
              </span>
            </div>

            <div className="flex justify-between">
              <span>TVA</span>

              <span>
                {tax.toFixed(2)} {values.devise}
              </span>
            </div>

            <div className={`border-t pt-3 flex justify-between text-xl font-bold`}   style={{ color: user.defaultColor || "#000" }}>

              <span>Total TTC</span>

              <span>
                {total.toFixed(2)} {values.devise}
              </span>

            </div>

          </div>

        </div>

        <div className="mt-20 border-t pt-6 text-center text-sm text-muted-foreground">

          {user.footerText ||"Merci pour votre confiance."}

        </div>

      </div>

    </div>
  )
}