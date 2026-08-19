import { requireAuth } from "@/lib/auth";
import { activityRepository } from "@/modules/activity/activity.repository";
import { prospectRepository } from "@/modules/crm/repositories/prospect.repositories";
import { crmSchema } from "@/modules/crm/schemas/prospect";
import { FilterType } from "@/modules/crm/types";
import { z } from "zod";
import { clientRepository } from "../repositories/client.repositories";

export const clientService = {
    async create(data:z.infer<typeof crmSchema>) {

        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = crmSchema.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

        

        if(parsedData.email){
          const email = await prospectRepository.findByEmail(parsedData.email)
          if(email){
            return {
              success:false,
              message:"L'adresse e-mail existe déjà."
            }
          }
        }
        if(parsedData.phone){
          const phone = await prospectRepository.findByPhone(parsedData.phone)
          if(phone){
            return {
              success:false,
              message:"Le téléphone existe déjà."
            }
          }
        }

        if(parsedData.whatsapp){
          const whatsapp = await prospectRepository.findByPhone(parsedData.whatsapp)
          if(whatsapp){
            return {
              success:false,
              message:"WhatsApp existe déjà."
            }
          }
        }
        const last = await prospectRepository.getLast()
        const reference = `CL-${new Date().getFullYear()}-${last?.id || 0}`
        
        const client = await prospectRepository.create({reference,type:"CLIENT",...parsedData,email: parsedData.email || null,phone:parsedData.phone || null, whatsapp:parsedData.whatsapp || null})

        await activityRepository.create({entityType:"PARTNER",action:"CREATED",note:"Le client a été créé..",partner:{connect:{id:client.id}}})
        
         return {
        success: true,
        message: "Le client a été créé.",
        client,
      };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }

    },
        async get(filters:FilterType){
        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }
        const clients = await clientRepository.findByFilters(filters)
        const goodClients = (await clientRepository.getGoodClients()).length
        const needFollowUP = (await clientRepository.getNeedFollowUP()).length
        const newClients = (await clientRepository.getNewClients()).length
        const activeClients = (await clientRepository.getActiveClients()).length
         return {
          success: true,
          clients,
          goodClients,
          needFollowUP,
          activeClients,
          newClients
        };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
}