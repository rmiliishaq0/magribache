"use server"
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function requireAuth(req: NextRequest) {
    try{
        const token = req.cookies.get("token")?.value
        let userId
        if(!token){
            return {error:true,response:NextResponse.json({message:"Non autorisé"},{status:401})}
        }
        try{
            const decodedToken = jwt.verify(token,process.env.SECRET as string) as {userId:string}
            userId = decodedToken.userId
        }catch(error:any){
            return {error:true,response:NextResponse.json({message:"Non autorisé"},{status:401})}
        }
        const user = await prisma.admin.findUnique({
            where:{id:userId},
            select:{
                id:true,
                name: true,
                email: true,
                phone: true,
                address: true,
                website: true,
                description: true,
                logo: true,
                profilIcon: true,
            }})
        if(!user){
            return {error:true,response:NextResponse.json({message:"Non autorisé"},{status:401})}
        }
        return {error:false,user}
    }catch{
        return {error:true,response:NextResponse.json({message:"Une erreur s'est produite"},{status:500})}
    }
}
