"use server"

import { settingsService } from "../services/settings.service"
import { visualSchema } from "../schamas/settings";
import z from "zod";
import { uploadFile } from "@/lib/save-file";


const visualSchemaWithEmail = visualSchema.extend({
    email:z.email()
})

type VisualSchemaWithEmail = z.infer<typeof visualSchemaWithEmail>

export async function updateVisual(data:VisualSchemaWithEmail){
    let logo:string | undefined = undefined
    let watermark:string | undefined = undefined
    let signature:string | undefined = undefined

    if(data.logo instanceof File ){
        logo = await uploadFile(data.logo,"logo")
    }

    if(data.watermark instanceof File){
        watermark = await uploadFile(data.watermark,"watermark")
    }
    if(data.signature instanceof File ){
        signature = await uploadFile(data.signature,"signature")
    }

    return settingsService.updateInfo({...data,logo,watermark,signature})
} 