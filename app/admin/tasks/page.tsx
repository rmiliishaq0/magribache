import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { TasksTableFields } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Tasks() {
    return (
        <Card className="text-foreground p-4 flex flex-col mb-6">
            <div className="flex items-center justify-between">
                <div>
                <h2 className="text-lg font-bold text-secondary">Tasks</h2>
                {/* <p className="text-muted-foreground text-sm">Suivi du stock et des indicateurs de vente en temps réel.</p> */}
            </div>
            </div>
            <div>
                <DataTable data={[]} buttonText="Ajouter une tâche" constants={TasksTableFields} >
                   <form className="flex flex-col gap-4 p-4">
                     <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nom de la tâche</label>
                    <Input id="name" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Date d'échéance">Date d'échéance</label>
                    <Input id="Date d'échéance" type="date"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Priorité">Priorité</label>
                    <Input id="Priorité" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Projet">Projet</label>
                    <Input id="Projet" type="text"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Statut">Statut</label>
                    <Switch id="Statut" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Date de création">Date de création</label>
                    <Input id="Date de création" type="date"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="Date de dernière modification">Date de dernière modification</label>
                    <Input id="Date de dernière modification" type="date"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <Textarea id="description" />
                </div>
                <Button>Enregistrer</Button>
                   </form>
                </DataTable>
            </div>
        </Card>
    )
}
