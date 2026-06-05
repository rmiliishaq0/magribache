import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { contactsfournisseurSchema } from "@/utils/schema";
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
        await contactsfournisseurSchema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }

      const 
        {
            Name,
            Title,
            Email,
            Téléphone,
            Fournisseur,
            City,
            Country,
        } = data
      const fournisseur = await prisma.contactsFournisseur?.create({
        data: {
            name :Name,
            email:Email,
            title:Title,
            téléphone:Téléphone,
            fournisseurId:Fournisseur || "",
            city : City,
            country :Country,

        },
      })

      return Response.json(
        {
          message: "Contacts Fournisseur ajouté avec succès",fournisseur
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