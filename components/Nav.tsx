import {  NotebookPen, Plus, Search, Settings } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default function Nav(){
    return(
        <nav className="flex items-center justify-between my-6 mx-12 gap-6 flex-wrap">
            <div className="relative grow">
                <Input 
                    placeholder="Rechercher des produits , clients ou factures..." 
                    className="h-12 text-lg! rounded-xl px-4 pl-10 placeholder:text-lg font-medium"
                    />
                <Search  className="text-secondary/50 absolute left-2 top-1/2 -translate-y-1/2"/>
            </div>
            <div className="flex gap-6 text-secondary grow justify-end">
               <Plus className="hover"/>
               <NotebookPen className="hover"/>
               <Settings className="hover"/>
            </div>
        </nav>
    )
}