import { LucideIcon } from "lucide-react"
import { SetStateAction } from "react"
import { COMPANY_SECTIONS } from "../constants/company-sections";

export type companySection={
    id:(typeof COMPANY_SECTIONS)[number]["id"]
    Logo:LucideIcon
    isActive:boolean,
    title:string,
    description?:string,
    setIsActive:React.Dispatch<SetStateAction< (typeof COMPANY_SECTIONS)[number]["id"]>>
}

export type companySections={
    active:(typeof COMPANY_SECTIONS)[number]["id"],
    setIsActive:React.Dispatch<SetStateAction< (typeof COMPANY_SECTIONS)[number]["id"]>>
}
export type DocumentSettings = {  priceMode: "ht" | "ttc"; totalHtLabel: string; totalVatLabel: string; netLabel: string; recipientSignature: string; amountPrefix: string;  paymentTerms: string; footer: string };
