import prisma from "@/lib/prisma";
import {  Prisma } from "@/app/generated/prisma/client";
import { endOfDay, startOfDay } from "date-fns";
import { FilterType } from "../types";

export const productRepository = {
  async getLast() {
    return await prisma.product.findFirst({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async create(data: Prisma.ProductCreateInput) {
    return await prisma.product.create({
      data,
    });
  },
  async getAll(){
    return await prisma.product.findMany()
  },

  async findByFilters(filters: FilterType){
    return prisma.product.findMany({
      where:{
        ...(filters.status && {status:filters.status}),
        ...(filters.type && {type:filters.type}),
        ...(filters.fournisseur && {suppliers:{some:{supplier:{name:{contains:filters.fournisseur}}}}}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})
      },
      take:filters.take,
      skip:filters.skip   
    })     
  },

  async update(data:Prisma.ProductCreateInput) {
    return await prisma.product.update({
      where: { reference: data.reference },
      data,
    });
  },   

  async findByReference(reference:string){
    return await prisma.product.findUnique({where:{reference},include:{
      activity: {
        include: {
          logs: true,
        },
      },
    }})
  },
  
  async delete(reference:string){
    return await prisma.product.delete({where:{reference}})
  },

  async getAllByFilter(filters: FilterType){
    return prisma.product.findMany({
      where:{
        ...(filters.status && {status:filters.status}),
        ...(filters.type && {type:filters.type}),
        ...(filters.fournisseur && {suppliers:{some:{supplier:{name:{contains:filters.fournisseur}}}}}),
        ...(filters.date?.from && {createdAt: { gte: startOfDay(filters.date.from)}}),
        ...(filters.date?.to && {createdAt: {...(filters.date?.from && {gte: startOfDay(filters.date.from)}), lte: endOfDay(filters.date.to)}})
      }
    })     
  },
  
  async getRawMaterials(){
    return await prisma.product.count({
      where:{
        type:"RAW_MATERIAL"
      }
    })
  },
  
  async getFinishedProducts(){
    return await prisma.product.count({
      where:{
        type:"FINISHED_PRODUCT"
      }
    })
  },
  
  async getOtherProducts(){
    return await prisma.product.count({
      where:{
        type:{notIn:["RAW_MATERIAL","FINISHED_PRODUCT"]}
      }
    })
  },
  async getAllSuppliersWithProducts() {
        return prisma.supplier.findMany({
            where: {
                products: {
                    some: {},
                },
            },
            select: {
                reference: true,
                name: true,
                city: true,
            },
        });
        },
  async getAllSuppliersWithProductsCount(reference?:string){ {
    return prisma.product.count({
      where: {
        reference: reference,
        suppliers: {
          some: {},
        },
      }
    })
  }}     
}