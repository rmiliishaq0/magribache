import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { settingSchema } from "@/utils/schema";

export async function POST(req:NextRequest) {
    const data = await req.json();
    const result=settingSchema.safeParse(data)
    if(!result.success){
        return NextResponse.json({ error: "Les donnees invalide" }, { status: 403 });
    }
    const {name,address,phone,website,description}=result.data

    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    let userId:string;
    if (!token) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    try{
        const decode = jwt.verify(token.value, process.env.SECRET || "") as any
        userId= decode.userId as string
    }catch{
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const me=await prisma.admin.findFirst({
        where: {
            id: userId
        }
    })
    if(!me){
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const update = await prisma.admin.update({
        where: {
            id: me.id
        },
        data: {
            name,
            address,
            phone,
            website,
            description
        }
    })
    return NextResponse.json({ update }, { status: 200 });
}