import {NextRequest, NextResponse} from "next/server";
import {requireAuth} from "@/lib/auth";
import {contactsfournisseurSchema} from "@/utils/schema";
import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import {z} from "zod"

export async function POST(req: NextRequest) {
    try{
        const auth = await requireAuth(req)
        if(auth.error){
            return Response.json({message:auth.error})
        }
        if(auth.user){
            const body = await req.json()
            const schema = contactsfournisseurSchema.extend({
                id: z.string(),
            });
            const {success,data} = await schema.safeParseAsync(body.data)
            if(!success){
                return Response.json({message:"Données invalides",body},{status:400})
            }
            const 
                {
                    id,
                    Name,
                    Title,
                    Email,
                    Téléphone,
                    Fournisseur,
                    City,
                    Country,
                } = data
            await prisma.contactsFournisseur.update({
                where: {
                    id: String(id),
                },
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
          message: "Contacts Fournisseur ajouté avec succès"
        },
        { status: 201 }
      )
        }
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }catch(error){
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
        console.log(error)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}