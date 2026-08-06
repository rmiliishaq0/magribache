import prisma from "@/lib/prisma";
import {  Prisma } from "@/app/generated/prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { FilterType } from "../types";

export const prospectRepository = {
  async getLast() {
    return await prisma.businessPartner.findFirst({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async create(data: Prisma.BusinessPartnerCreateInput) {
    return await prisma.businessPartner.create({
      data,
    });
  },
  async getAll(){
    return await prisma.businessPartner.findMany({
      where:{
        type:"PROSPECT",
      }
    })
  },
  async findByEmail(email:string){
    return await prisma.businessPartner.findUnique({where:{email}})
  },
  async findByPhone(phone:string){
    return await prisma.businessPartner.findUnique({where:{phone:phone}})
  },
  async findByWhatsapp(whatsapp:string){
    return await prisma.businessPartner.findUnique({where:{whatsapp}})
  },
  async getFollowUpToday(){
    return await prisma.businessPartner.findMany({
      where:{
        type:"PROSPECT",
        nextFollowUpAt:{
          gte: startOfDay(new Date()),
          lte: endOfDay(new Date()),
        }
      }
    })
  },
  async getNewClients(){
    return await prisma.businessPartner.findMany({where:{status:"NEW", type:"PROSPECT"}})
  },
  async getWinClients(){
    return await prisma.businessPartner.findMany({where:{status:"WON", type:"PROSPECT"}})
  },
  async getLostClients(){
    return await prisma.businessPartner.findMany({where:{status:"LOST", type:"PROSPECT"}})
  },
  async findByFilters(filters: FilterType){
    return prisma.businessPartner.findMany({
      where:{
        type:"PROSPECT",
        ...(filters.status && {status:filters.status}),
        ...(filters.city && {city:filters.city}),
        ...(filters.priority && {priority:filters.priority}),
        ...(filters.region && {region:filters.region}),
        ...(filters.source && {source:filters.source}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})}})
      },

  async update(data:Prisma.BusinessPartnerCreateInput) {
    return await prisma.businessPartner.update({
      where: { reference: data.reference },
      data,
    });
  },   

  async findByReference(reference:string){
    return await prisma.businessPartner.findUnique({where:{reference}})
  },
  
  async delete(reference:string){
    return await prisma.businessPartner.update({where:{reference}, data:{type:"ARCHIVED"}})
  },

  async convertToClient(reference:string){
    return await prisma.businessPartner.update({
      where:{reference},
      data:{
        type:"CLIENT"
      }
    })
  }
}
