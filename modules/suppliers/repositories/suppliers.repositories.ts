import prisma from "@/lib/prisma";
import {  Prisma } from "@/app/generated/prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { FilterType } from "../types";

export const suppliersRepository = {
  async getLast() {
    return await prisma.supplier.findFirst({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  async create(data: Prisma.SupplierCreateInput) {
    return await prisma.supplier.create({
      data,
    });
  },
  async getAll(){
    return await prisma.supplier.findMany({})
  },
  async findByEmail(email:string){
    return await prisma.supplier.findFirst({where:{email}})
  },
  async findByPhone(phone:string){
    return await prisma.supplier.findFirst({where:{phone:phone}})
  },
  async findByWhatsapp(whatsapp:string){
    return await prisma.supplier.findFirst({where:{whatsapp}})
  },
  async findByFilters(filters: FilterType){
    return prisma.supplier.findMany({
      where:{
        ...(filters.statut && {status:filters.statut}),
        ...(filters.city && {city:filters.city}),
        ...(filters.country && {priority:filters.country}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})
      },
      take:filters.take,
      skip:filters.skip   
    })     
  },

  async update(data:Prisma.SupplierCreateInput) {
    return await prisma.supplier.update({
      where: { reference: data.reference },
      data,
    });
  },   

  async findByReference(reference:string){
    return await prisma.supplier.findUnique({where:{reference},include:{
      activity: {
        include: {
          logs: true,
        },
      },
      products:true
    }})
  },
  
  async delete(reference:string){
    return await prisma.supplier.delete({where:{reference}})
  },
  async getAllByFilter(filters: FilterType){
    return prisma.supplier.findMany({
      where:{
        ...(filters.statut && {status:filters.statut}),
        ...(filters.city && {city:filters.city}),
        ...(filters.country && {priority:filters.country}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})
      }
    })     
  },
  async getInaciveSuppliers(){
    return prisma.supplier.count({
      where:{
        status:"INACTIVE"
      }
    })
  },
  async getActiveSuppliers(){
    return prisma.supplier.count({
      where:{
        status:"ACTIVE"
      }
    })
  }
}
