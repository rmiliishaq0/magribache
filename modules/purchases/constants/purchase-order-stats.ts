import { ClipboardList, Clock3, CircleCheck, PackageCheck } from "lucide-react"

export const purchaseOrderStats = [
  { icon: ClipboardList, description: "Commandes total", accessKey: "total", style: "text-blue-600" },
  { icon: Clock3, description: "Brouillons", accessKey: "draft", style: "text-slate-600" },
  { icon: CircleCheck, description: "Confirmées", accessKey: "confirmed", style: "text-emerald-600" },
  { icon: PackageCheck, description: "Reçues", accessKey: "received", style: "text-violet-600" },
] as const
