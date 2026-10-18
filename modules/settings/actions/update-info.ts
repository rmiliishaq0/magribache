"use server"

import { settingsService } from "../services/settings.service"
import { Prisma } from "@/app/generated/prisma/client";

export async function updateInfo(data:Prisma.AdminUpdateInput){
    return settingsService.updateInfo(data)
} 