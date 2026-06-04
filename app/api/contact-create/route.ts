import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { contactsschema} from "@/utils/schema";
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
        await contactsschema.safeParseAsync(body?.data)

      if (!success) {
        return Response.json(
          { message: "Données invalides", error },
          { status: 400 }
        )
      }

      const {
        Nom,
        Civilité,
        Email,
        Téléphone,
        Ville,
        Pays,
        Actif} = data
      const contact = await prisma.contacts?.create({
        data: {
            nom:Nom,
            civilité:Civilité,
            email:Email,
            téléphone:Téléphone,
            ville:Ville,
            pays:Pays,
            actif:Actif
        },
      })

      return Response.json(
        {
          message: "Contact ajouté avec succès",contact
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