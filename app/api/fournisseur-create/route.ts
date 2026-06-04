import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { fournisseurSchema } from "@/utils/schema";
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
        await fournisseurSchema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }
      console.log(data)

      const {Fournisseur,Email,Téléphone,ICE  ,"Identifiant fiscal (IF)":identifiantFiscal ,Ville,Pays,Catégories} = data
      const fournisseur = await prisma.fournisseur?.create({
        data: {
            fournisseur :Fournisseur,
            email:Email,
            téléphone:Téléphone,
            ICE,
            identifiantFiscal,
            ville : Ville,
            pays :Pays,
            catégories :Catégories,
        },
      })

      return Response.json(
        {
          message: "Fournisseur ajouté avec succès",fournisseur
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