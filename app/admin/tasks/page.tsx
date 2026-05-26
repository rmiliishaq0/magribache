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

import { taskSchema } from "@/utils/schema";
import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query"
import { toast } from "sonner";
import { addTask,fetchTasks  } from "@/utils/Apis"; 
import {  SortingState } from "@tanstack/react-table";
import { deleteTasks } from "@/utils/Apis";
import AddTask from "@/components/AddTask";

export default function Tasks() {
    const [pagination, setPagination] =useState({
      pageIndex: 0,
      pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [openTask,setOpenTask] = useState(false)


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
    const deleteTaskMutation = useMutation(
      {
        mutationFn:(ids:number[])=>deleteTasks(ids),
        onSuccess:(data,variables,context)=>{
          toast.success("La tâche a été supprimée avec succès")
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
    function onDelete(ids:number[]){
      deleteTaskMutation.mutate(ids)
    }

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

    return (
        <Card className="text-foreground p-4 flex flex-col mb-6 overflow-hidden! ">
            <div >
              <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-lg font-bold text-secondary">les Tâches</h2>
                {/* <p className="text-muted-foreground text-sm">Suivi du stock et des indicateurs de vente en temps réel.</p> */}
                <Button variant="default" onClick={()=>{setOpenTask(true)}}>
                  <IconPlus />
                  <span>Ajouter une tâche</span>
                </Button>
            </div>
            <DataTable openModel={isOpen} setOpenModel={setIsOpen} onDelete={onDelete} sorting={sorting} setSorting={setSorting} rowCount={data?.total || 0} pagination={pagination} setPagination={setPagination} isPending={isPending } data={data?.tasks || []} constants={TasksTableFields} headers={TasksTableFieldsKeys} />
            <AddTask form={form} openTask={openTask} setOpenTask={setOpenTask} onSubmit={onSubmit} />
            </div>
        </Card>
        
    )
}
