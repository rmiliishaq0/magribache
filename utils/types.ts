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