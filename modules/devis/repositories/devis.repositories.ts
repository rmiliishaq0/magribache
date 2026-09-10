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
                ...(filters.city && {city:filters.city}),
                ...(filters.client && {client:{reference:{contains:filters.client,searchMode:"insensitive"}}}),
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
                ...(filters.city && {city:filters.city}),
                ...(filters.client && {client:{reference:{contains:filters.client,searchMode:"insensitive"}}}),
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
  async createOrUpdateDevis(data:z.infer<typeof devisWithRefrence>){
        return prisma.document.upsert({
            where: {
                reference: data.reference,
            },
            create: { ...data, type: "DEVIS",client:{connect:{reference:data.client}} itemes)},
            update: data
        });
}
}