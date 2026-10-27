import { z } from "zod";
import { productsSchema } from "../schemas/productsSchema";
import { requireAuth } from "@/lib/auth";
import { productRepository } from "../repositories/prospect.repositories";
import { FilterType } from "../types";
import { activityRepository } from "@/modules/activity/activity.repository";
import { Prisma } from "@/app/generated/prisma/client";
import { logsRepository } from "@/modules/logs/logs-repository";
import { revalidatePath } from "next/cache";
import { serializePrisma } from "@/utils/serialize-prisma";

export const productService = {
    async create(data:z.infer<typeof productsSchema>){ {

        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = productsSchema.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }

        const prefix = data.type === "RAW_MATERIAL" ? "MP" : data.type === "FINISHED_PRODUCT" ? "PF" : (data.type === "ACCESSORY" ? "AC" : (data.type === "CONSUMABLE" ? "CO" : "PR"))

        const last = await productRepository.getLast()
        const reference = `${prefix}-${new Date().getFullYear()}-${last?.id || 0}`
        
        const product = await productRepository.create({...parsedData,reference})

        await activityRepository.create({entityType:"PRODUCT",action:"CREATED",note:"Produit créé.",product:{connect:{id:product.id}}})
        
         return {
        success: true,
        message: "Produit créé",
        product,
      };
    }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }}},

    async get(filters:FilterType){
        try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }
        const total = (await productRepository.getAllByFilter(filters)).length
        const products = await productRepository.findByFilters(filters)
        const rawMaterials = (await productRepository.getRawMaterials())
        const finishedProducts = await productRepository.getFinishedProducts()
        const otherProducts = await productRepository.getOtherProducts()

         return {
          success: true,
          products,
          rawMaterials,
          finishedProducts,
          otherProducts,
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

    async update(data:z.infer<typeof productsSchema>) {
      try{

        const auth = await requireAuth()

         if (auth.error) {
            return {
          success: false,
          message: "Unauthorized",
        };
        }


        const {success,data:parsedData} = productsSchema.safeParse(data)

        if(!success){
            return {
          success: false,
          message: "Données invalides",
        };
        }
        
        const before = await productRepository.findByReference(parsedData.reference!)
        
        const product = await productRepository.update(parsedData)

        const activity = await activityRepository.create({
          entityType: "PRODUCT",
          action: "UPDATED",
          note: "Produit mis à jour.",
          product: { connect: { id: product.id } },
        })

        const logs: Prisma.ActivityLogCreateManyInput[] = []

        for (const key of Object.keys(parsedData)) {
          const oldValue = before?.[key as keyof typeof before]
          const newValue = product[key as keyof typeof product]

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
        message: "Produit mis à jour",
        product,
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

       
        await productRepository.delete(parsedData)
        
         return {
        success: true,
        message: "Produit supprimé",
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

        const product = serializePrisma(await productRepository.findByReference(parsedData))
        const suppliers = await productRepository.getAllSuppliersWithProductsCount(product?.reference)
         return {
        success: true,
        message: "Produit trouvé",
        product:{...product,suppliers},
      };
      }catch(err){
          console.error(err)
          return {
          success: false,
          message: "Une erreur s'est produite",
        };
      }
    },

     async getSuppliersWithProducts(){
        try{
            const auth = await requireAuth()

            if (auth.error) {
                return {
            success: false,
            message: "Unauthorized",
            };
            }
            const suppliers = await productRepository.getAllSuppliersWithProducts()
            return {
                success: true,
                suppliers
            }
        }catch(err){
        console.error(err)
        return {
        success: false,
        message: "Une erreur s'est produite",
      };
    }
    },
}