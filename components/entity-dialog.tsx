import { EntityDialogType } from "@/types/entity-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useEffect } from "react";

export default function EntityDialog({open,setIsOpen,title,children}:EntityDialogType){
    return(
    <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl w-[90vw]">
            <DialogHeader>
                <DialogTitle>Ajouter une {title}</DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>                 
    )
}