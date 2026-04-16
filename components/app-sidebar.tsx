"use client"

import * as React from "react"
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

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import SideBareCard from "@/components/sidebare-card"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sideBarecontents = {
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
      href:"/admin/ventes",
    },
    {
      title:"Achats",
      icon:ShoppingCart,
      href:"/admin/achats",
    },
    {
      title:"Produits",
      icon:Package,
      href:"/admin/produits",
    },
    {
      title:"Finances",
      icon:Landmark,
      href:"/admin/finances",
    },
    {
      title:"Rapports",
      icon:ChartColumn,
      href:"/admin/rapports",
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  return (
    <Sidebar className="mt-2" collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/admin"}>
          <SideBareCard isLogo Logo={sideBarecontents.logo.logo} name={sideBarecontents.logo.name} plan={sideBarecontents.logo.sub} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex gap-4 flex-col ml-2 mt-6">
          {
          sideBarecontents.contents.map((item,index)=>{
            return(
              <Link href={item.href} key={index} className="mr-2 group/item" >
                <SideBareCard active={pathname===item.href} Logo={item.icon} name={item.title}/>
              </Link>
            )
          })
        }
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sideBarecontents.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
