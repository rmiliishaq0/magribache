import { requireAuth } from "@/lib/auth";
import { FilterType } from "../types";
import { devisRepository } from "../repositories/devis.repositories";
import { devisWithRefrence } from "../schemas/devis";
import z from "zod";
import { activityRepository } from "@/modules/activity/activity.repository";
import { Prisma } from "@/app/generated/prisma/client";
import { logsRepository } from "@/modules/logs/logs-repository";

export const devisService = {
    async get(filters:FilterType){
        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }
        const total = (await devisRepository.getAllByFilter(filters)).length
        const devis =(await devisRepository.findByFilters(filters)) 
        const sentThisM = (await devisRepository.getSentThisMonth()).length
        const accepted = (await devisRepository.getAccepted()).length
        const expired = (await devisRepository.getExpired()).length
        const totalQuotes = (await devisRepository.getAll()).length

        const serializedDevis = devis.map((item) => ({
            ...item,
            discount: item.discount?.toNumber(),
            subtotal: item.subtotal?.toNumber(),
            taxAmount: item.taxAmount?.toNumber(),
            totalAmount: item.totalAmount?.toNumber(),
            }));
         return {
          success: true,
          devis:serializedDevis,
          sentThisM,
          accepted,
          expired,
          total,
          totalQuotes
        };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async getClientsWithDevis(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
            success: false,
            message: "Unauthorized",
            };
            }
            const clients = await devisRepository.getAllClientWithDevis()
            return {
                success: true,
                clients
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async getAllPartners(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
            success: false,
            message: "Unauthorized",
            };
            }
            const clients = await devisRepository.getAllPartners()
            return {
                success: true,
                clients
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async generateReference(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
                    success: false,
                    message: "Unauthorized",
                };
            }

            const last = await devisRepository.getLast()
            const reference = `DEV-${new Date().getFullYear()}-${last?.id || 0}`
            return {
                success: true,
                reference
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async createOrUpdate(data:z.infer<typeof devisWithRefrence>){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
                    success: false,
                    message: "Unauthorized",
                };
            }
            const {success,data:parsedData} = devisWithRefrence.safeParse(data)
            
                    if(!success){
                        return {
                      success: false,
                      message: "Données invalides",
                    };
                    }
            let devis

            const isExist = await devisRepository.getByRefrence(parsedData.reference)

            if(!isExist){
                devis = await devisRepository.create(parsedData)
                await activityRepository.create({entityType:"DOCUMENT",action:"CREATED",note:"Devis créé.",document:{connect:{id:devis.id}}})
            }
            else{
                devis = await devisRepository.update(parsedData) 
                const activity = await activityRepository.create({"entityType":"DOCUMENT",action:"UPDATED",note:"Devis mis à jour.",document:{connect:{id:devis.id}}})
                const logs: Prisma.ActivityLogCreateManyInput[] = []

                for (const key of Object.keys(parsedData)) {
                    const oldValue = isExist?.[key as keyof typeof isExist]
                    const newValue = devis?.[key as keyof typeof devis]

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
            }

            return {
                success: true,
                devis
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
    async delete(refrence:string){
        const auth = await requireAuth()
        if (auth.error) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }
        const schema = z.string().min(2)
        const {success,data:parsedData} = schema.safeParse(refrence)

        if(!success){
            return {
                success: false,
                message: "Données invalides",
            };
        }
        await devisRepository.delete(parsedData)
        return {
            success: true,
            message: "Devis supprimé",
        }
    }
}