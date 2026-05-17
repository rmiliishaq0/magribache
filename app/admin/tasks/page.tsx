"use client"
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { TasksTableFields } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field ,FieldLabel} from "@/components/ui/field";
import { IconPlus } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function Tasks() {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <Card className="text-foreground p-4 flex flex-col mb-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-secondary">Tasks</h2>
                {/* <p className="text-muted-foreground text-sm">Suivi du stock et des indicateurs de vente en temps réel.</p> */}
                <Button variant="default" onClick={()=>{setIsOpen(true)}}>
                  <IconPlus />
                  <span>Ajouter une tâche</span>
                </Button>
            </div>
            <DataTable data={[]} constants={TasksTableFields} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter une tâche</DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-4 p-4">
                              <Field >
                                <FieldLabel htmlFor="name">Nom de la tâche</FieldLabel>
                                <Input id="name" />
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="Date d'échéance">Date d'échéance</FieldLabel>
                                <Input id="Date d'échéance" type="date"/>
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="Priorité">Priorité</FieldLabel>
                                <Input id="Priorité" type="text"/>
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="Projet">Projet</FieldLabel>
                                <Input id="Projet" type="text"/>
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="Statut">Statut</FieldLabel>
                                <Switch id="Statut" />
                              </Field>
                              <Field>
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <Textarea id="description" />
                            </Field>
                            <Button>Enregistrer</Button>
                            </form>
                  </DialogContent>
                </Dialog>
        </Card>
        
    )
}
