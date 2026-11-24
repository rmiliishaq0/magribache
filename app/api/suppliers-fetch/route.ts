import { SupplierStatus } from "@/app/generated/prisma/browser";
import { suppliersService } from "@/modules/suppliers/services/suppliers.service";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        const params = req.nextUrl.searchParams
        const statut = (params.get("statut")|| undefined)  as SupplierStatus | undefined
        const city = (params.get("city")||undefined)
        const from = (params.get("from")||undefined)
        const to =(params.get("to")||undefined)

        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const skip = (page-1)*limit

        const suppliers = await suppliersService.get({skip,take:limit,statut,city,date:{...(from && {from:new Date(from)}),...(to && {to:new Date(to)})}})
        return Response.json({suppliers},{status:200})
    }catch(err){
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}