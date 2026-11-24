import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

async function create(data:Prisma.ActivityCreateInput){
    return await prisma.activity.create({
        data
    })
}

export const activityRepository = {
    create
}