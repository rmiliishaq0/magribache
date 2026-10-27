import { LucideIcon } from "lucide-react"
import { productTypeColors } from "../constants/colors"
import { z } from "zod";
import { productsSchema } from "../schemas/productsSchema";
import { ProductStatus, ProductType, StockMovementType, StockUnit } from "@/app/generated/prisma/enums";



export type ProductStats = {
    icon:LucideIcon
    description:string
    style:keyof typeof productTypeColors,
    accessKey:string
}

export type Fournisseur = {
    reference:string | undefined;
    name:string | undefined; 
    city:string | undefined | null;
}
const productsSchemaWithId = productsSchema.extend({id:z.number()})

export type productsSchemaWithId = z.infer<typeof productsSchemaWithId>


export type FilterType ={
    status?: ProductStatus,
    type?:ProductType,
    fournisseur?:string,
    date?: {from?:string,to?:string}
    take?:number,
    skip?:number,
}

export type SupplierTable = {
    id : number
    supplierReference:string | null
    name:string |null
    purchasePriceHT: string | null 
    deliveryDelayDays:number | null
    isPreferred : boolean | null 
}

export type ProductMouvmentsType ={
    id:number
    reference:string | null
    type: StockMovementType
    quantity: number | null
    unit:StockUnit
    totalCost:number |null
    createdAt:Date | null
}

export type ProductStockLotType ={
    id:number
    lotNumber : string | null
    entryDate:Date | null 
    quantityInitial :number | null
    quantityAvailable:number | null
    unit:StockUnit
    totalCost:number | null
    expiryDate:Date | null,
    isBlocked:boolean | null
}