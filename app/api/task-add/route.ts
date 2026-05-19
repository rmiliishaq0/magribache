import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { taskSchema } from "@/utils/schema";
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest){
    try{
        const auth = await requireAuth(req)
        if (auth.error) {
            return auth.response
        }
        if(auth.user){
            const {success,data} = await taskSchema.safeParseAsync(await req.json())
            if(!success){
                return Response.json({message:"Données invalides"},{status:400})
             }
            const task = await prisma.task.create({
                data:{
                    adminId:auth.user.id,
                    name:data.name,
                    description:data.description,
                    dueDate:new Date(data.dueDate || ""),
                    priority:data.priority,
                    projet:data.project,
                    status:data.status   
                }
            })        
        return Response.json({message:"Tâche ajoutée avec succès",task},{status:201})
        }
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }

}