import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { devisSchema} from "@/utils/schema";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)

    if (auth.error) {
      return auth.response
    }


    if (auth.user) {
      const body = await req.json()

      const { success, data, error } =
        await devisSchema.safeParseAsync(body?.data)
        if (!success) {
            return Response.json(
            { message: "Données invalides", error },
            { status: 400 }
            )
        }

        const {
            client,
            notes,
            devisDate,
            dateValidite,
            reference,
            devise,
            statut,
            items,
        } = data

        const subtotal = items.reduce(
            (acc: number, item: any) => {
            return acc + (
                item.quantity *
                item.unitPrice
            )
            },
            0
        )

        const tax = items.reduce(
            (acc: number, item: any) => {
            return acc + (
                item.quantity *
                item.unitPrice *
                item.tax / 100
            )
            },
            0
        )

        const total = subtotal + tax

        const latest =
            await prisma.document.findFirst({
            where: {
                type: "DEVIS"
            },
            orderBy: {
                createdAt: "desc"
            }
            })

            let nextNumber = 1

            if (latest?.numero) {

                nextNumber =
                parseInt(
                    latest.numero.split("-")[2]
                ) + 1
            }

         const numero =`DEV-${new Date().getFullYear()}-${String(nextNumber).padStart(4, "0")}`
         const devis =
            await prisma.document.create({
            data: {
                numero,
                type: "DEVIS",
                clientId:client,
                notes,
                montantHT:subtotal,
                montantTVA:tax,
                montantTTC:total,
                dateDocument:
                devisDate && devisDate !== ""
                    ? new Date(devisDate)
                    : new Date(),
                dateValidite:dateValidite ?? "non spécifié",
                reference,
                devise,
                status:statut,
                items: {
                create: items.map((item: any) => ({
                    article: item.article,
                    quantite: item.quantity,
                    prixUnitaire: item.unitPrice,
                    taxe: item.tax,
                    montantTTC:
                    item.quantity *
                    item.unitPrice
                }))
                }
            }
            })   

      return Response.json(
        {
          message: "Devis a été créé avec succès",devis
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error(error)
    if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error?.code === "P2002"
  ) {
    return Response.json(
      {
        message: "L'Email existe déjà.",
      },
      { status: 400 }
    );
  }

    return Response.json(
      { message: "Une erreur s'est produite" },
      { status: 500 }
    )
  }
}