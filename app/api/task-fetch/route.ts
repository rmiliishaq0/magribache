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

        const total = await prisma.task.count({
            where: {
                adminId: auth.user.id,
            },
        });
            
        const tasks = await prisma.task.findMany({
            where:{
                adminId:auth.user.id
            },
            skip,
            take: limit,
            orderBy: {
                [sortBy]: order,
            },
            //take:10,
        })
        return Response.json({message:"Tâches récupérées avec succès", tasks, total},{status:200})
    }catch(err){
        console.log(err)
        return Response.json({message:"Une erreur s'est produite"},{status:500})
    }
}