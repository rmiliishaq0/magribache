import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator";
import Nav from "@/components/Nav";
export default function AdminLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full mx-4 mt-4 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4 ">
            <SidebarTrigger className=" text-secondary hover:text-primary transition cursor-pointer" />
            <Separator
              orientation="vertical"
              className="h-8"
            />
            <div className="grow">
                <Nav  />
            </div>
        </div>
        <div >
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}