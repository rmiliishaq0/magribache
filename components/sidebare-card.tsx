import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function SideBareCard({Logo,name,plan,active,isLogo=false}:{
    Logo: React.ElementType
    name: string
    plan?: string,
    active?:boolean
    isLogo?:boolean
}){
    const {open} =useSidebar()
    return(
        <>
         <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                        size="lg"
                        className={` cursor-pointer ${!isLogo && "sidebar-hover"} ${active && "bg-secondary-foreground/10"}`}
                        >
                         {open? <div className={`${isLogo ? "size-8 bg-primary text-sidebar-primary-foreground " : "text-secondary p-1.5 " }group-hover/item:text-primary transition rounded-lg aspect-square flex items-center justify-center ${active && "text-primary!"}`}>
                            <Logo className={`${isLogo?"size-4!": (open?"size-6!":"size-5!")}`}/>
                        </div>:<Tooltip >
                                <TooltipTrigger >
                                    <div className={`${isLogo ? "size-8 bg-primary text-sidebar-primary-foreground " : "text-secondary p-1.5 " }group-hover/item:text-primary transition rounded-lg aspect-square flex items-center justify-center ${active && "text-primary!"} cursor-pointer`}>
                                        <Logo className={`${isLogo?"size-4!": (open?"size-6!":"size-5!")}`}/>
                                    </div>

                            </TooltipTrigger >
                            <TooltipContent side="right" >
                                {name}
                            </TooltipContent>
                            </Tooltip>}
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className={` font-bold group-hover/item:text-primary transition text-secondary ${active && "text-primary!"}`}>{name}</span>
                            <span className="text-secondary/80 truncate text-xs">{plan}</span>
                        </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    </DropdownMenu>
                </SidebarMenuItem>
                </SidebarMenu>
        </>
    )
}