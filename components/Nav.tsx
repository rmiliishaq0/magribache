import {  NotebookPen,  Search, Settings } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";

export default function Nav(){
    return(
        <nav className="flex items-center justify-between  gap-4 flex-wrap">
            <div className="relative grow-2">
                <Input 
                    placeholder="Rechercher des produits , clients ou factures..." 
                    className="rounded-xl p-5 pl-10 font-medium"
                    />
                <Search  className="text-secondary/50 absolute left-2 top-1/2 -translate-y-1/2"/>
            </div>
            <div className="flex gap-6 text-secondary grow justify-end">
               {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Plus className="hover"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end"> 
                    <DropdownMenuGroup>
                    <DropdownMenuLabel >My Account</DropdownMenuLabel>
                    <DropdownMenuItem className="sidebar-hover">
                        
                    </DropdownMenuItem>
                    <DropdownMenuItem>

                    </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
                </DropdownMenu> */}
               <Link href={"/admin/tasks"}>
                    <NotebookPen className="hover"/>
               </Link>
               <Link href={"/admin/settings"}>
                    <Settings className="hover"/>
               </Link>
            </div>
        </nav>
    )
}