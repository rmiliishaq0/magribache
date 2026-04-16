import {
  Banknote,
  BriefcaseBusiness,
  ChartColumn,
  Landmark,
  Package,
  PieChart,
  ShoppingCart,
  Users2,
} from "lucide-react"

export const sideBarecontents = {
  user: {
    name: "admin",
    email: "admin@admin.com",
  },
  logo:{
    name:"Magribache",
    logo:BriefcaseBusiness,
    sub:"Gestion Commerciale"
  },
  contents:[
    {
      title:"Tableau de bord",
      icon:PieChart,
      href:"/admin",
    },
    {
      title:"CRM",
      icon:Users2,
      href:"/admin/crm",
    },
    {
      title:"Ventes",
      icon:Banknote,
      href:"/admin/sales",
    },
    {
      title:"Achats",
      icon:ShoppingCart,
      href:"/admin/purchases",
    },
    {
      title:"Produits",
      icon:Package,
      href:"/admin/products",
    },
    {
      title:"Finances",
      icon:Landmark,
      href:"/admin/finances",
    },
    {
      title:"Rapports",
      icon:ChartColumn,
      href:"/admin/reports",
    },
  ]
}