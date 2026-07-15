import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import { settingSchema } from "@/utils/schema";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req:NextRequest) {
    const data = await req.formData();
    const result= settingSchema.safeParse(Object.fromEntries(data.entries()))
    if(!result.success){
        return NextResponse.json({ error: "Les donnees invalide" }, { status: 403 });
    }
    const {name,address,phone,website,description,signature,logo,profileImage,footerText,defaultColor}=result.data

    const signatureBytes = signature instanceof File ? await signature.arrayBuffer() : null;
    const logoBytes = logo instanceof File ? await logo.arrayBuffer() : null;
    const profileImageBytes = profileImage instanceof File ? await profileImage.arrayBuffer() : null;

    const signatureBuffer = signatureBytes ? Buffer.from(signatureBytes) : null;
    const logoBuffer = logoBytes ? Buffer.from(logoBytes) : null;
    const profileImageBuffer = profileImageBytes ? Buffer.from(profileImageBytes) : null;

    const signaturePath = signatureBuffer ? path.join(process.cwd(), 'public','uploads',`${Date.now()}_signature.png`) : null;
    const logoPath = logoBuffer ? path.join(process.cwd(), 'public','uploads', `${Date.now()}_logo.png`) : null;
    const profileImagePath = profileImageBuffer ? path.join(process.cwd(), 'public','uploads', `${Date.now()}_profileImage.png`) : null;

    signaturePath && signatureBuffer && await writeFile(signaturePath, signatureBuffer);
    logoPath && logoBuffer && await writeFile(logoPath, logoBuffer);
    profileImagePath && profileImageBuffer && await writeFile(profileImagePath, profileImageBuffer);

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
            description,
            footerText,
            defaultColor,
            ...(profileImagePath && { profilIcon: `/uploads/${path.basename(profileImagePath)}` }),
            ...(logoPath && { logo: `/uploads/${path.basename(logoPath)}` }),
            ...(signaturePath && { signature: `/uploads/${path.basename(signaturePath)}` }),
        }
    })
    return NextResponse.json({ update }, { status: 200 });
}