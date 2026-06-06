import {NextRequest, NextResponse} from "next/server";
import {requireAuth} from "@/lib/auth";
import z  from "zod";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if(auth.error){
            return auth.error
        }
        if(auth){
            const result= await z.union([
                z.object({
                    ids: z.array(z.uuid()),
                }),
                z.array(z.uuid()),
            ]).safeParseAsync(await req.json());
            if(!result.success){
                return Response.json({message:"Données invalides"},{status:400})
            }
            const ids = Array.isArray(result.data)
                ? result.data
                : result.data.ids;
            await prisma.prospects.deleteMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            });
            return Response.json({message:"Prospects a été supprimée avec succès"},{status:201})
        }
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }catch{
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}
