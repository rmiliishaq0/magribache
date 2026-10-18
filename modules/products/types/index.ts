import { LucideIcon } from "lucide-react"
import { productTypeColors } from "../constants/colors"



export type ProductStats = {
    icon:LucideIcon
    description:string
    style:keyof typeof productTypeColors,
    accessKey:string
}

export type Fournisseur = {
    reference:string | null;
    fullName:string | null; 
    city:string | null;
}