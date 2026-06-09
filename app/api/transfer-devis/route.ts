import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { devisSchema, prospectsschema } from "@/utils/schema";
import z from "zod";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if (auth.error) {
            return auth.response
        }
        if(auth.user){
            const body = await req.json();
            const schema = z.object({
                id: z.uuid(),
            });
            const {success,data} = await schema.safeParseAsync(body.data);
            if(!success){
                return Response.json({message:"Données invalides"},{status:400})
            }
            await prisma.document.update({
                where:{
                    id:data.id
                },
                data:{
                    type:"FACTURE"
                }
            })
                 
        return Response.json({message:"Le devis a été transféré à la facture"},{status:201})
        }
    }catch{
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }

}