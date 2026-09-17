import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";
import { legalSettingsSchema } from "@/utils/schema";

export async function POST(request: NextRequest) {
  const result = legalSettingsSchema.safeParse(await request.json());
  if (!result.success) return NextResponse.json({ message: "Les données sont invalides" }, { status: 400 });

  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ message: "Non autorisé" }, { status: 401 });

  try {
    const { userId } = jwt.verify(token, process.env.SECRET || "") as { userId: string };
    const update = await prisma.admin.update({ where: { id: userId }, data: result.data });
    return NextResponse.json({ update });
  } catch {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }
}
