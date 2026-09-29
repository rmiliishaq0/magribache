import prisma from "@/lib/prisma";
import { FilterType } from "@/modules/crm/types";
import { endOfDay, startOfDay } from "date-fns";

export const clientRepository ={
    async findByFilters(filters: FilterType){
    return prisma.businessPartner.findMany({
      where:{
        type:"CLIENT",
        ...(filters.status && {status:filters.status}),
        ...(filters.city && {city:filters.city}),
        ...(filters.region && {region:filters.region}),
        ...(filters.companyType && {companyType:filters.companyType}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})},
        take:filters.take,
        skip:filters.skip
      })
      },
      async getActiveClients(){
        return prisma.businessPartner.findMany({where:{type:"CLIENT",status:"ACTIVE"}})
      },
      async getNewClients(){
        return prisma.businessPartner.findMany({where:{type:"CLIENT",status:"NEW"}})
      },
      async getGoodClients(){
        return prisma.businessPartner.findMany({where:{type:"CLIENT",status:"GOOD_CLIENT"}})
      },
      async getNeedFollowUP(){
        return prisma.businessPartner.findMany({where:{type:"CLIENT",status:"TO_MONITOR"}})
      },
      async getAllByFilter(filters: FilterType){
    return prisma.businessPartner.findMany({
      where:{
        type:"CLIENT",
        ...(filters.status && {status:filters.status}),
        ...(filters.city && {city:filters.city}),
        ...(filters.region && {region:filters.region}),
        ...(filters.companyType && {companyType:filters.companyType}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})},
      })
      },
}