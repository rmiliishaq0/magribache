export type ColumnMeta = {
  isNavigate?: boolean
  isInput?: boolean
  isBadge?: boolean
  type?: "text" | "number" | "email" | "date" | "file"
}

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