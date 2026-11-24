import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({message:"Connexion reussie"}, { status: 200 });
        response.cookies.set("token", "", { httpOnly: process.env.PRODUCTION === "true", secure: process.env.PRODUCTION === "true", sameSite: "strict", maxAge: 0 });
        return response;
    } catch {
        return NextResponse.json({message:"Echec de la deconnexion"}, { status: 500 });
    }
}