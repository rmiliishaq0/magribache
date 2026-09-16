import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Type =  "DEVIS" | "FACTURE"

export async function GET(req:NextRequest) {
    try{
        const auth = await requireAuth(req)
        if(auth.error){
            return auth.response
        }
        if(!auth.user){
            return Response.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
        }

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type") as Type;
        const id = searchParams.get("id") || ""

            
        const docs = await prisma.document?.findFirst({
            where:{
                id:id,
                type
            },
            include:{
                items:true
            }
        })

        return Response.json({message:"Docs récupérés avec succès", docs},{status:200})
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}