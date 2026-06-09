import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

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
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;
        const sortBy = searchParams.get("sortBy") || "createdAt";
        const order = searchParams.get("order") || "desc";

        const allDevis = await prisma.document.findMany({
            where:{
                type:"DEVIS"
            }
        })
            
        const devis = await prisma.document?.findMany({
            where:{
                type:"DEVIS"
            },
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
            include:{
                client:true
            }
            //take:10,
        })
        const brouillon =  await prisma.document?.findMany({
            where:{
                type:"DEVIS",
                status:"BROUILLON"
            },
        })
        const annule =  await prisma.document?.findMany({
            where:{
                type:"DEVIS",
                status:"ANNULE"
            },
        })
        const paye =  await prisma.document?.findMany({
            where:{
                type:"DEVIS",
                status:"PAYE"
            },
        })
        return Response.json({message:"Devis récupérés avec succès", devis, total:allDevis.length,brouillon:brouillon.length,annule:annule.length,paye:paye.length},{status:200})
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}