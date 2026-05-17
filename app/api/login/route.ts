import { loginSchema } from "@/utils/schema";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";


export async function POST(req: Request,res:NextResponse) {
    try{
        const data = await req.json();
        const {email,password} = loginSchema.parse(data);
        const user = await prisma.admin.findFirst({
            where:{
                email:email,
            },
        });

        if(!user){
            return NextResponse.json({message:"Email ou mot de passe incorrect"}, {status:401})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if(!isPasswordValid){
            return NextResponse.json({message:"Email ou mot de passe incorrect"}, {status:401})
        }
        const {password:_,createdAt:__,updatedAt:___,id:____,...userWithoutPassword} = user;
        const token = jwt.sign({ userId: user.id }, process.env.SECRET!, { expiresIn: "48h" });
        const response = NextResponse.json({message:"Connexion reussie",data:userWithoutPassword}, { status: 200 });
        response.cookies.set("token", token, { httpOnly: process.env.PRODUCTION === "true", secure: process.env.PRODUCTION === "true", sameSite: "strict", maxAge: 60 * 60 * 48 });
        return response;
    }
    catch{
        return NextResponse.json({message:"Echec de la connexion"}, { status: 500 });
    }
}