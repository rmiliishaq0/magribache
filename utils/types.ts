import { z } from "zod";
import { crmSchema } from "./schema";

export type ColumnMeta = {
  isNavigate?: boolean
  isInput?: boolean
  isBadge?: boolean
  isDate?: boolean
  isSelected?: boolean
  isTextEarea  ?:boolean
  type?: "text" | "number" | "email" | "date" | "file"
  values?:Values
  fullWidth?:boolean
  isId?:boolean
  needToFetch?: boolean
  hook?:any
  key?:string
}
type Values = Array<string>

type Me={
    name: string,
    email: string,
    phone: string | null,
    address: string | null,
    website: string | null,
    description: string | null,
    logo: string | null,
    profilIcon: string | null
}

export type Crm = z.infer<typeof crmSchema>