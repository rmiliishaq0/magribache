import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import {  prospectsschema } from "@/utils/schema";
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
        await prospectsschema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }
      
      const 
        {
            Nom,
            Prospect,
            Email,
            Téléphone,
            Statut,
            Source,
            Localisation
        } = data
      const prospects = await prisma.client?.create({
        data: {
            type:"PROSPECT",
            entreprise :Nom!,
            email:Email,
            prospect:Prospect,
            téléphone:Téléphone,
            statut:Statut,
            source : Source,
            localisation:Localisation
        },
      })

      return Response.json(
        {
          message: "Prospects ajouté avec succès",prospects
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