import { PartnerSource, PartnerStatus } from "@/app/generated/prisma/browser";
import { PartnerPriority } from "@/app/generated/prisma/client";
import { prospectService } from "@/modules/crm/services/prospect.service";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        const params = req.nextUrl.searchParams
        const source = (params.get("source") || undefined)  as PartnerSource | undefined
        const statut = (params.get("statut")|| undefined)  as PartnerStatus | undefined
        const priority =(params.get("priority")||undefined) as PartnerPriority |undefined
        const city = (params.get("city")||undefined)
        const region = (params.get("region")||undefined)
        const from = (params.get("from")||undefined)
        const to =(params.get("to")||undefined)

        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const skip = (page-1)*limit
        
        const prospects = await prospectService.get({skip,take:limit, source,status:statut,priority,city,region,date:{from,to}})
        return Response.json({prospects },{status:200})
    }catch(err){
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}