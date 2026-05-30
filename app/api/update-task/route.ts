import {NextRequest, NextResponse} from "next/server";
import {requireAuth} from "@/lib/auth";
import { taskSchemaWithID} from "@/utils/schema";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try{
        const auth = await requireAuth(req)
        if(auth.error){
            return Response.json({message:auth.error})
        }
        if(auth.user){
            const task = await req.json()
            const {success,data} = await taskSchemaWithID.safeParseAsync(task.data)
            if(!success){
                return Response.json({message:"Données invalides",task},{status:400})
            }
            const { id,project, ...updateData } = data;
            await prisma.task.update({
                where: {
                    id: String(id),
                },
                data:{
                    projet:project,
                    ...updateData,
                },
            })
            return Response.json({message:"La tâche a été modifié avec succès"},{status:201})
        }
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }catch(er){
        console.log(er)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}