import { CompanyType, PartnerStatus } from "@/app/generated/prisma/browser";
import { clientService } from "@/modules/clients/services/client.service";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        const params = req.nextUrl.searchParams
        const statut = (params.get("statut")|| undefined)  as PartnerStatus | undefined
        const companyType = (params.get("companyType")|| undefined)  as CompanyType | undefined
        const city = (params.get("city")||undefined)
        const region = (params.get("region")||undefined)
        const from = (params.get("from")||undefined)
        const to =(params.get("to")||undefined)

        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const skip = (page-1)*limit

        const clients = await clientService.get({skip,take:limit,status:statut,city,companyType,region,date:{from,to}})
        return Response.json({clients},{status:200})
    }catch(err){
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}