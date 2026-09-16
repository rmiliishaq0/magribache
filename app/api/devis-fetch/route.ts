import { NextRequest } from "next/server";
import { DocumentStatus } from "@/app/generated/prisma/enums";
import { devisService } from "@/modules/devis/services/devis.services";

export async function GET(req:NextRequest) {
    try{
       const params = req.nextUrl.searchParams
        const statut = (params.get("statut")|| undefined)  as DocumentStatus | undefined
        const city = (params.get("city")||undefined)
        const client = (params.get("client")||undefined)
        const from = (params.get("from")||undefined)
        const to =(params.get("to")||undefined)

        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const skip = (page-1)*limit

        const devis = await devisService.get({skip,take:limit,status:statut,city,client,date:{from,to}})
        return Response.json({devis})
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}