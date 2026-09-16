import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {Controller, UseFormReturn} from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import { Field ,FieldLabel,FieldError} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import z from "zod";
import { taskSchema } from "@/utils/schema";
import {memo} from "react";
import {Spinner} from "@/components/ui/spinner";

export default function AddTask({openTask,setOpenTask,onSubmit,form,isPending}:{
    openTask:boolean,
    setOpenTask:(openTask:boolean)=>void,
    onSubmit:(data:z.infer<typeof taskSchema>)=>void,
    form:UseFormReturn<z.infer<typeof taskSchema>>
    isPending:boolean
}) {
    return (
         <Dialog   open={openTask} onOpenChange={setOpenTask} >
                  <DialogContent forceMount className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Ajouter une tâche</DialogTitle>
                    </DialogHeader>
                    <form className="flex flex-col gap-4 p-4" onSubmit={form.handleSubmit(onSubmit)}>
                              <Controller
                                name="name"
                                control={form.control}
                                render={({ field ,fieldState}) => (
                                    <Field aria-invalid={fieldState.invalid} >
                                        <FieldLabel htmlFor="name">Nom de la tâche</FieldLabel>
                                        <Input aria-invalid={fieldState.invalid} id="name" {...field} />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                              />
                              <Controller
                                name="dueDate"
                                control={form.control}
                                render={({ field ,fieldState}) => (
                                    <Field aria-invalid={fieldState.invalid}>
                                      <FieldLabel htmlFor="Date d'échéance">Date d'échéance</FieldLabel>
                                      <Input aria-invalid={fieldState.invalid} id="Date d'échéance" type="date" {...field}/>
                                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                              />
                              <Controller
                                name="priority"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="priority">Priorité</FieldLabel>

      <Select
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger aria-invalid={fieldState.invalid}>
          <SelectValue placeholder="Priorité" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="Haute">Haute</SelectItem>
            <SelectItem value="Moyenne">Moyenne</SelectItem>
            <SelectItem value="Basse">Basse</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} />
      )}
    </Field>
  )}
/>
                              <Controller
                                name="project"
                                control={form.control}
                                render={({field,fieldState})=>(
                                   <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="Projet">Projet</FieldLabel>
                                    <Input id="Projet" type="text" {...field} aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                  </Field>
                                )}
                              />
                              <Controller
                                name="status"
                                control={form.control}
                                render={({field,fieldState})=>(
                                  <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="Statut">Statut</FieldLabel>
                                <Select value={field.value}
        onValueChange={field.onChange} >
                                  <SelectTrigger >
                                    <SelectValue placeholder="Statut" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="En cours">En cours</SelectItem>
                                      <SelectItem value="Terminé">Terminé</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                              </Field>
                                )}
                              />
                              <Controller
                                name="description"
                                control={form.control}
                                render={({field,fieldState})=>(
                                  <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <Textarea id="description" {...field} aria-invalid={fieldState.invalid} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                  </Field>
                                )}
                              />
                                <Button disabled={!form.formState.isValid || isPending || !form.formState.isDirty  } type="submit">
                                    {isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                                </Button>
                            </form>
                  </DialogContent>
                </Dialog>
    )
}