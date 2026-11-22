import { ClipboardCheck, PackageCheck, ReceiptText, Ban } from "lucide-react"

export const goodsReceiptStats = [
  { icon: ReceiptText, description: "Réceptions total", accessKey: "total", style: "text-blue-600" },
  { icon: ClipboardCheck, description: "Brouillons", accessKey: "draft", style: "text-slate-600" },
  { icon: PackageCheck, description: "Terminées", accessKey: "completed", style: "text-emerald-600" },
  { icon: Ban, description: "Annulées", accessKey: "cancelled", style: "text-red-600" },
] as const
