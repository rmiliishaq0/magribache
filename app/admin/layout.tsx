import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator";
import Nav from "@/components/Nav";
export default function AdminLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full">
        <div className="flex items-center justify-between gap-2 mt-4">
            <SidebarTrigger className="ml-4 mb-2 text-secondary hover:text-primary transition cursor-pointer" />
            <Separator
              orientation="vertical"
              className="h-8"
            />
            <div className="grow">
                <Nav  />
            </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}