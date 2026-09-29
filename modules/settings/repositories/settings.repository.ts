import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export const settingsRepository={
    async update(data:Prisma.AdminUpdateInput){
        const email = typeof data.email === "string" ? data.email : undefined;
        if (!email) throw new Error("A valid email is required to update settings");
        return prisma.admin.update({
            where:{email},
            data:{...data,logo:String(data.logo),signature:String(data.signature),watermark:String(data.watermark)}
        }
    )
    }
}