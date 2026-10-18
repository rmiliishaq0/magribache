import { requireAuth } from "@/lib/auth"
import { settingsRepository } from "../repositories/settings.repository";
import { Prisma } from "@/app/generated/prisma/browser";

export const settingsService={
    async updateInfo(data:Prisma.AdminUpdateInput){
         try{
        
                const auth = await requireAuth()
        
                 if (auth.error) {
                    return {
                  success: false,
                  message: "Unauthorized",
                };
                }
                const settings = await settingsRepository.update(data)
                 return {
                  success: true,
                  settings
                };
            }catch(err){
                console.error(err)
                return {
                success: false,
                message: "Une erreur s'est produite",
              };
            }
    }
}