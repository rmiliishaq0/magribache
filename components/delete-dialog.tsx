import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {Button} from "@/components/ui/button"

export default function DeleteDialog({onDelete,ids,setOpenModel,open}:{open:boolean,setOpenModel:React.Dispatch<boolean>,ids:number[],onDelete:(ids:number[] | number)=>void}) {
    return(
        <Dialog open={open} onOpenChange={setOpenModel}>
            <DialogContent forceMount={true}>
                <DialogHeader>
                    <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
                    <DialogDescription>
                        Cette action est irréversible. Elle supprimer a définitivement votre compte
                        et vos données de nos serveurs.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={()=>{setOpenModel(false)}}>Annuler</Button>
                    <Button onClick={()=>{onDelete(ids)}} variant="destructive">Supprimer</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}