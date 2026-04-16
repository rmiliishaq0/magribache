import {  NotebookPen, Plus, Search, Settings } from "lucide-react";
import { Input } from "./ui/input";
export default function Nav(){
    return(
        <nav className="flex items-center justify-between  mx-12 gap-4 flex-wrap">
            <div className="relative grow">
                <Input 
                    placeholder="Rechercher des produits , clients ou factures..." 
                    className="rounded-xl p-5 pl-10 font-medium"
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