import prisma from "@/lib/prisma";
import { startOfMonth,endOfMonth, startOfDay, endOfDay } from "date-fns";
import { FilterType } from "../types";
import { devisWithRefrence } from "../schemas/devis";
import { z } from "zod";

export const devisRepository = {
    async findByFilters(filters: FilterType){
        return prisma.document.findMany({
            where:{
                type:"DEVIS",
                ...(filters.status && {status:filters.status}),
                ...(filters.city && {client:{city:{contains:filters.city,mode:"insensitive"}}}),
                ...(filters.client && {client:{fullName:{contains:filters.client,mode:"insensitive"}}}),
                ...(filters?.date?.from && {createdAt:{gte:startOfDay(filters.date.from)}}),
                ...(filters?.date?.to && {createdAt:{...(filters.date?.from && {gte:startOfDay(filters.date.from)}), lte:endOfDay(filters.date.to)}}),
            },
            take: filters.take,
            skip: filters.skip,
            include:{
                client:true
            }
        })     
    },
    async getAllByFilter(filters: FilterType){
        return prisma.document.findMany({
            where:{
                type:"DEVIS",
                ...(filters.status && {status:filters.status}),
                ...(filters.city && {client:{city:{contains:filters.city,mode:"insensitive"}}}),
                ...(filters.client && {client:{fullName:{contains:filters.client, mode:"insensitive"}}}),
                ...(filters?.date?.from && {createdAt:{gte:startOfDay(filters.date.from)}}),
                ...(filters?.date?.to && {createdAt:{...(filters.date?.from && {gte:startOfDay(filters.date.from)}), lte:endOfDay(filters.date.to)}}),
            }
        })     
    },
    async getSentThisMonth(){
        return prisma.document.findMany({
            where:{
                type:"DEVIS",
                status:"SENT",
                sentAt:{
                    gte: startOfMonth(new Date()),
                    lte: endOfMonth(new Date())
                }
            }
        })
    },
    async getAccepted(){
        return prisma.document.findMany({
            where:{
                type:"DEVIS",
                status:"ACCEPTED"
            }
        })
    },
    async getExpired(){
        return prisma.document.findMany({
            where:{
                type:"DEVIS",
                status:"EXPIRED"
            }
        })
    },
    async getAllClientWithDevis() {
        return prisma.businessPartner.findMany({
            where: {
            documents: {
                some: {
                type: "DEVIS",
                },
            },
            },
            select: {
            reference: true,
            fullName: true,
            city: true,
            },
        });
        },
    async getAllPartners() {  
        return prisma.businessPartner.findMany({
            select: {
                reference: true,
                fullName: true,
                city: true,
                email: true,
                phone: true,
                whatsapp: true,
            },
        });
    },
    async getLast() {
    return await prisma.document.findFirst({
      where: {
        type: "DEVIS",
      },  
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  async getAll() {
    return prisma.document.findMany({
      where: {
        type: "DEVIS",
      },
    });
  },
  async createOrUpdateDevis(data:z.infer<typeof devisWithRefrence>){
        return prisma.document.upsert({
            where: {
                reference: data.reference,
            },
            create: { ...data, type: "DEVIS",client:{connect:{reference:data.client}},items:{createMany:{data:data.items}} },
            update: { ...data, type: "DEVIS",client:{connect:{reference:data.client}},items:{createMany:{data:data.items}} },
        });
    },
    async create(data:z.infer<typeof devisWithRefrence>){
        return prisma.document.create({data:{ ...data, type: "DEVIS",client:{connect:{reference:data.client}},items:{createMany:{data:data.items}} }})
    },
    async update(data:z.infer<typeof devisWithRefrence>){
        return prisma.document.update({
            where:{
                reference:data.reference
            },
            data:{ ...data, type: "DEVIS",client:{connect:{reference:data.client}},items:{createMany:{data:data.items}} }
        })
    },
    async getByRefrence(reference:string){
        return prisma.document.findFirst({
            where:{
                reference
            }
        })
    },
    async delete(reference:string){
        return prisma.document.delete({where:{reference}})
    }
}