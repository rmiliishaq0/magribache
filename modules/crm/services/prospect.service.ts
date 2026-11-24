import { z } from "zod";
import { crmSchema, crmSchemaWithRef } from "../schemas/prospect";
import { requireAuth } from "@/lib/auth";
import { prospectRepository } from "../repositories/prospect.repositories";
import { activityRepository } from "@/modules/activity/activity.repository";
import { FilterType } from "../types";
import { Prisma } from "@/app/generated/prisma/client";
import { logsRepository } from "@/modules/logs/logs-repository";
import { revalidatePath } from "next/cache";

export const prospectService = {

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
        const reference = `PR-${new Date().getFullYear()}-${last?.id || 0}`
        
        const prospect = await prospectRepository.create({reference,...parsedData,email: parsedData.email || null,phone:parsedData.phone || null, whatsapp:parsedData.whatsapp || null})

        await activityRepository.create({entityType:"PARTNER",action:"CREATED",note:"Partenaire créé.",partner:{connect:{id:prospect.id}}})
        
         return {
        success: true,
        message: "Partenaire créé",
        prospect,
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
        const total = (await prospectRepository.getAllByFilter(filters)).length
        const prospects = await prospectRepository.findByFilters(filters)
        const followUp = (await prospectRepository.getFollowUpToday()).length
        const win = (await prospectRepository.getWinClients()).length
        const lost = (await prospectRepository.getLostClients()).length
        const newClients = (await prospectRepository.getNewClients()).length

         return {
          success: true,
          prospects,
          followUp,
          win,
          lost,
          newClients,
          total
        };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },

    async update(data:z.infer<typeof crmSchemaWithRef>) {
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = crmSchemaWithRef.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }
        
        const before = await prospectRepository.findByReference(parsedData.reference!)

        if(parsedData.email && parsedData.email !== before?.email){
          const email = await prospectRepository.findByEmail(parsedData.email)
          if(email){
            return {
              success:false,
              message:"L'adresse e-mail existe déjà."
            }
          }
        }
        if(parsedData.phone && parsedData.phone !== before?.phone){
          const phone = await prospectRepository.findByPhone(parsedData.phone)
          if(phone){
            return {
              success:false,
              message:"Le téléphone existe déjà."
            }
          }
        }

        if(parsedData.whatsapp && parsedData.whatsapp !== before?.whatsapp){
          const whatsapp = await prospectRepository.findByPhone(parsedData.whatsapp)
          if(whatsapp){
            return {
              success:false,
              message:"WhatsApp existe déjà."
            }
          }
        }


        
        const prospect = await prospectRepository.update(parsedData)

        const activity = await activityRepository.create({
          entityType: "PARTNER",
          action: "UPDATED",
          note: "Partenaire mis à jour.",
          partner: { connect: { id: prospect.id } },
        })

        const logs: Prisma.ActivityLogCreateManyInput[] = []

        for (const key of Object.keys(parsedData)) {
          const oldValue = before?.[key as keyof typeof before]
          const newValue = prospect[key as keyof typeof prospect]

          if (oldValue !== newValue) {
            logs.push({
              activityId: activity.id,
              field: key,
              oldValue: oldValue == null ? null : String(oldValue),
              newValue: newValue == null ? null : String(newValue),
            })
          }
        }

        if (logs.length > 0) {
          await logsRepository.createMany(logs)
        }
        revalidatePath(`/admin/crm/`);

         return {
        success: true,
        message: "Partenaire mis à jour",
        prospect,
      };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },

    async delete(reference:string) {
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = z.string().min(2).safeParse(reference)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

       
        const prospect = await prospectRepository.delete(parsedData)
        await activityRepository.create({entityType:"PARTNER",action:"DELETED",note:"Partenaire supprimé.",partner:{connect:{id:prospect.id}}})
        
         return {
        success: true,
        message: "Partenaire supprimé",
        prospect,
      };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },

    async moveToClient(reference:string) {
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = z.string().min(2).safeParse(reference)


        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

        const prospect = await prospectRepository.findByReference(parsedData)
        if(!prospect){
          return {
            success:false,
            message:"Partenaire introuvable"
          }
        }
        const newReference = prospect.reference.replace("PR","CL")
        const client = await prospectRepository.convertToClient(parsedData,newReference)

        await activityRepository.create({entityType:"PARTNER",action:"STATUS_CHANGED",note:"Partenaire converti en client.",partner:{connect:{id:client.id}}})
        
         return {
        success: true,
        message: "Partenaire converti en client",
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

    async getByReference(reference:string){
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }



        const {success,data:parsedData} = z.string().min(2).safeParse(reference)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

        const prospect = await prospectRepository.findByReference(parsedData)
       
         return {
        success: true,
        message: "Partenaire trouvé",
        prospect,
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