"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarWithCollapseProps } from "@/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";

export default function SidebarWithCollapse({items,item}:SidebarWithCollapseProps){
    const {open} =useSidebar()
  return (
          <SidebarMenu >

          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/item mr-2 group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                tooltip={item.title}               
                size="lg"
                className={`cursor-pointer sidebar-hover ${item.isActive && "bg-secondary-foreground/10"}`}>
                  {open? <div className={`text-secondary p-1.5 group-hover/item:text-primary transition rounded-lg aspect-square flex items-center justify-center ${item.isActive && "text-primary!"}`}>
                            {item.icon && <item.icon className={(open?"size-6!":"size-5!")}/>}
                        </div>:<Tooltip >
                                <TooltipTrigger asChild>
                                    <div className={`text-secondary p-1.5 group-hover/item:text-primary transition rounded-lg aspect-square flex items-center justify-center ${item.isActive && "text-primary!"} cursor-pointer`}>
                                        {item.icon && <item.icon className={(open?"size-6!":"size-5!")}/>}
                                    </div>

                            </TooltipTrigger >
                            <TooltipContent side="right" >
                                {item.title}
                            </TooltipContent>
                            </Tooltip>}
                             <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className={` font-bold group-hover/item:text-primary transition text-secondary ${item.isActive && "text-primary!"}`}>{item.title}</span>
                        </div>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild
                        size="md"
                        >
                        <Link href={subItem.href}>
                            <span className={`sidebar-hover-sub  transition text-secondary ${item.isActive && "text-primary!"}`}>{subItem.title}</span>
                       </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
    </SidebarMenu>

  )
}
