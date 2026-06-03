import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { clientSchema } from "@/utils/schema";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)

    if (auth.error) {
      return auth.response
    }


    if (auth.user) {
      const body = await req.json()

      const { success, data, error } =
        await clientSchema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }
      const { Entreprise, "Identifiant fiscal (IF)": identifiantFiscal,Actif, ...rest } = data
      const client = await prisma.client?.create({
        data: {
          entreprise: Entreprise,
          ...rest,
         IdentifiantFiscal: identifiantFiscal,
         actif:Actif
        },
      })

      return Response.json(
        {
          message: "Client ajouté avec succès",
          client,
        },
        { status: 201 }
      )
    }
  } catch (e) {
    console.log(e)

    return Response.json(
      { message: "Une erreur s'est produite" },
      { status: 500 }
    )
  }
}