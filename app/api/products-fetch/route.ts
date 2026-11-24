import {  ProductStatus ,ProductType} from "@/app/generated/prisma/browser";
import { productService } from "@/modules/products/services/product.service";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    try{
        const params = req.nextUrl.searchParams
        const statut = (params.get("statut")|| undefined)  as ProductStatus | undefined
        const type = (params.get("type")|| undefined)  as ProductType | undefined
        const fournisseur = (params.get("fournisseur")|| undefined)
        const from = (params.get("from")||undefined)
        const to =(params.get("to")||undefined)

        const page = Number(params.get("page") ?? 1);
        const limit = Number(params.get("limit") ?? 10);
        const skip = (page-1)*limit

        const products = await productService.get({skip,take:limit,status:statut,type,fournisseur,date:{from,to}})
        return Response.json({products},{status:200})
    }catch(err){
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}