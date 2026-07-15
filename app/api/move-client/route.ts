import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prospectsschema } from "@/utils/schema";
import z from "zod";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if (auth.error) {
            return auth.response
        }
        if(auth.user){
            const body = await req.json()
            const 
            {
                id,
                nom,
                prospect,
                email,
                téléphone,
                statut,
                source,
                localisation,
            } =body.data
            const schema = prospectsschema.extend({
                id: z.string(),
            });
            const {success,data,error} = await schema.safeParseAsync({id:id,Nom:nom,Prospect:prospect,Email:email,Téléphone:téléphone,Statut:statut,Source:source,Localisation:localisation})
            if(!success){
                return Response.json({message:"Données invalides" +error},{status:400})
            }
            await prisma.client.update({
                where:{
                    id
                },
                data:{
                    type:"CLIENT"
                }
            })
                 
        return Response.json({message:"Le prospect a été déplacé"},{status:201})
        }
    }catch{
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }

}