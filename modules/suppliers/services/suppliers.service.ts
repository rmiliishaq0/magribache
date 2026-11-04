import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { activityRepository } from "@/modules/activity/activity.repository";
import { FilterType, SuppliersSchema } from "../types";
import { Prisma } from "@/app/generated/prisma/client";
import { logsRepository } from "@/modules/logs/logs-repository";
import { revalidatePath } from "next/cache";
import { suppliersSchema } from "../schemas/suppliers";
import { suppliersRepository } from "../repositories/suppliers.repositories";

export const suppliersService = {

    async create(data:SuppliersSchema) {

        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = suppliersSchema.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

        

        if(parsedData.email){
          const email = await suppliersRepository.findByEmail(parsedData.email)
          if(email){
            return {
              success:false,
              message:"L'adresse e-mail existe déjà."
            }
          }
        }
        if(parsedData.phone){
          const phone = await suppliersRepository.findByPhone(parsedData.phone)
          if(phone){
            return {
              success:false,
              message:"Le téléphone existe déjà."
            }
          }
        }

        if(parsedData.whatsapp){
          const whatsapp = await suppliersRepository.findByPhone(parsedData.whatsapp)
          if(whatsapp){
            return {
              success:false,
              message:"WhatsApp existe déjà."
            }
          }
        }
        const last = await suppliersRepository.getLast()
        const reference = `FOU-${new Date().getFullYear()}-${last?.id || 0}`
        
        const supplier = await suppliersRepository.create({...parsedData,email: parsedData.email || null,phone:parsedData.phone || null, whatsapp:parsedData.whatsapp || null,reference,products:{create:parsedData.products?.map(product=>({product:{connect:{reference:product}}})) }})

        await activityRepository.create({entityType:"PARTNER",action:"CREATED",note:"Partenaire créé.",supplier:{connect:{id:supplier.id}}})
        
         return {
        success: true,
        message: "Partenaire créé",
        supplier,
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
        const total = (await suppliersRepository.getAllByFilter(filters)).length
        const suppliers = await suppliersRepository.findByFilters(filters)
        const activeSuppliers = (await suppliersRepository.getAllByFilter({...filters,statut:"ACTIVE"})).length
        const inactiveSuppliers = (await suppliersRepository.getAllByFilter({...filters,statut:"INACTIVE"})).length

         return {
          success: true,
          suppliers,
          total,
          activeSuppliers,
          inactiveSuppliers,
        };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },

    async update(data:SuppliersSchema) {
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = suppliersSchema.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }
        
        const before = await suppliersRepository.findByReference(parsedData.reference!)

        if(parsedData.email && parsedData.email !== before?.email){
          const email = await suppliersRepository.findByEmail(parsedData.email)
          if(email){
            return {
              success:false,
              message:"L'adresse e-mail existe déjà."
            }
          }
        }
        if(parsedData.phone && parsedData.phone !== before?.phone){
          const phone = await suppliersRepository.findByPhone(parsedData.phone)
          if(phone){
            return {
              success:false,
              message:"Le téléphone existe déjà."
            }
          }
        }

        if(parsedData.whatsapp && parsedData.whatsapp !== before?.whatsapp){
          const whatsapp = await suppliersRepository.findByPhone(parsedData.whatsapp)
          if(whatsapp){
            return {
              success:false,
              message:"WhatsApp existe déjà."
            }
          }
        }


        
        const supplier = await suppliersRepository.update({
          ...parsedData,
          products: {
            deleteMany: {},
            create: parsedData.products?.map(product => ({
              product: { connect: { reference: product } },
            })),
          },
        })

        const activity = await activityRepository.create({
          entityType: "PARTNER",
          action: "UPDATED",
          note: "Partenaire mis à jour.",
          supplier: { connect: { id: supplier.id } },
        })

        const logs: Prisma.ActivityLogCreateManyInput[] = []

        for (const key of Object.keys(parsedData)) {
          const oldValue = before?.[key as keyof typeof before]
          const newValue = supplier[key as keyof typeof supplier]

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
        revalidatePath(`/admin/purchases/suppliers`);
        revalidatePath(`/admin/purchases/suppliers/${parsedData.reference}`);

         return {
        success: true,
        message: "Partenaire mis à jour",
        supplier,
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

       
        const supplier = await suppliersRepository.delete(parsedData)
        await activityRepository.create({entityType:"PARTNER",action:"DELETED",note:"Partenaire supprimé.",partner:{connect:{id:supplier.id}}})
        
         return {
        success: true,
        message: "Partenaire supprimé",
        supplier,
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

        const supplier = await suppliersRepository.findByReference(parsedData)
       
         return {
        success: true,
        message: "Partenaire trouvé",
        supplier,
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