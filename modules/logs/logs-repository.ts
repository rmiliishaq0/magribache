import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const logsRepository = {
    async createMany(data: Prisma.ActivityLogCreateManyInput[]) {
    return prisma.activityLog.createMany({
        data,
    })
}
}