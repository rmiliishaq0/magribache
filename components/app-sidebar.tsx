"use client"

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
import {sideBarecontents} from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth-store"
import { me } from "@/utils/Apis"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname()
  const authState = useAuthStore()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["admins"],
    queryFn: me,
  })
  useEffect(()=>{
    if(isError){
      router.push("/login") 
      return; 
    }
    if(!data?.me)return;
    authState.setAuthState(data?.me)
  },[data,error])
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
      <SidebarFooter className="mb-4">
        {
          isPending || !authState.name || !authState.email ? 
          <div className="flex w-fit items-center gap-4 bg-white/80 rounded-lg p-1">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>:
          <div className="bg-white/80 rounded-lg">
            <NavUser user={{name:authState?.name!,email:authState?.email!}} />
          </div>
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
