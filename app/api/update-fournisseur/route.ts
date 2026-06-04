import {NextRequest, NextResponse} from "next/server";
import {requireAuth} from "@/lib/auth";
import { fournisseurSchema} from "@/utils/schema";
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
            const task = await req.json()
            const schema = fournisseurSchema.extend({
                id: z.string(),
            });
            const {success,data} = await schema.safeParseAsync(task.data)
            if(!success){
                return Response.json({message:"Données invalides",task},{status:400})
            }
            const {id,Fournisseur,Email,Téléphone,ICE  ,"Identifiant fiscal (IF)":identifiantFiscal ,Ville,Pays,Catégories} = data
            await prisma.fournisseur.update({
                where: {
                    id: String(id),
                },
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
            return Response.json({message:"La Fournisseur a été modifié avec succès"},{status:201})
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