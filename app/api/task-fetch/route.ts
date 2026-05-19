import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest) {
    try{
        const auth = await requireAuth(req)
        if(auth.error){
            return auth.response
        }
        if(auth.user){
            const tasks = await prisma.task.findMany({
                where:{
                    adminId:auth.user.id
                },
                take:10,
            })
            return Response.json({message:"Tâches récupérées avec succès",tasks},{status:200})
        }
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}