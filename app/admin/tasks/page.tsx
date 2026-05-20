"use client"
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { TasksTableFields, TasksTableFieldsKeys } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field ,FieldLabel,FieldError} from "@/components/ui/field";
import { IconPlus } from "@tabler/icons-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { taskSchema } from "@/utils/schema";
import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query"
import { toast } from "sonner";
import { addTask,fetchTasks  } from "@/utils/Apis"; 
import {  SortingState } from "@tanstack/react-table";


export default function Tasks() {
    const [pagination, setPagination] =useState({
      pageIndex: 0,
      pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const queryClient = useQueryClient();
    const [isOpen,setIsOpen] = useState(false)
    const form = useForm<z.infer<typeof taskSchema>>({
        resolver:zodResolver(taskSchema),
        mode:"all",
        reValidateMode:"onBlur",
    })

    const {mutate} = useMutation(
      {
        mutationFn:(data:z.infer<typeof taskSchema>)=>addTask(data),
        onSuccess:(data,variables,context)=>{
          toast.success("La tâche a été ajoutée avec succès")
          setIsOpen(false)
          form.reset()
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
        onError:(error,variables,context)=>{
          toast.error(error.message)
        },
      }
    )

    function onSubmit(data:z.infer<typeof taskSchema>){
      mutate(data)
    }
    useEffect(()=>{
      console.log(sorting)
    },[sorting])

    const { isPending, isError, data, error } = useQuery({
      queryKey: ['tasks',pagination,sorting],
      queryFn: async()=>{
        const sort = sorting[0];

        const params = new URLSearchParams({
          page: String(pagination.pageIndex + 1),
          limit: String(pagination.pageSize),
          sortBy: sort?.id ?? "createdAt",
          order: sort?.desc ? "desc" : "asc",
        });
        return fetchTasks(params);
      },
    })
    const schema = taskSchema.extend({
        id: z.number(),
    })
    if(isError){
      toast.error("Une erreur s'est produite lors de la récupération des tâches")
      return null
    }
    return (
        <Card className="text-foreground p-4 flex flex-col mb-6 overflow-hidden! ">
            <div >
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-lg font-bold text-secondary">les Tâches</h2>
                {/* <p className="text-muted-foreground text-sm">Suivi du stock et des indicateurs de vente en temps réel.</p> */}
                <Button variant="default" onClick={()=>{setIsOpen(true)}}>
                  <IconPlus />
                  <span>Ajouter une tâche</span>
                </Button>
            </div>
            <DataTable sorting={sorting} setSorting={setSorting} rowCount={data?.total || 0} pagination={pagination} setPagination={setPagination} isPending={isPending } data={data?.tasks || []} constants={TasksTableFields} headers={TasksTableFieldsKeys} />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogContent>
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
                            <Button>Enregistrer</Button>
                            </form>
                  </DialogContent>
                </Dialog>
            </div>
        </Card>
        
    )
}
