import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
   try{
     const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return NextResponse.json({ me: null }, { status: 401 });
    }
    try {
        const {userId} = jwt.verify(token, process.env.SECRET!) as {userId:string};
        const user = await prisma.admin.findFirst({
            where:{
                id:userId,
            },
            select:{
                name: true,
                email: true,
                phone: true,
                address: true,
                website: true,
                description: true,
                logo: true,
                profilIcon: true,
            }
        })
        return NextResponse.json({ me: user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ me: null }, { status: 401 });
    }
   }catch{
    return NextResponse.json({ me: null }, { status: 500 });
   }
}   