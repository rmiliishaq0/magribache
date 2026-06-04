import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { clientSchema } from "@/utils/schema";
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
        await clientSchema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }
      const { ICE,Entreprise, "Identifiant fiscal (IF)": identifiantFiscal,Actif,Téléphone,Catégories, Email ,Pays,Ville} = data
      const client = await prisma.client?.create({
        data: {
            entreprise :Entreprise,
            téléphone :Téléphone,
            email:Email,
            catégories:Catégories,
            ICE,
            identifiantFiscal,
            ville:Ville,
            pays:Pays,
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