"use client"
import { Card } from "@/components/ui/card";
import DataTable  from "@/components/data-table";
import { TasksTableFields, TasksTableFieldsKeys } from "@/utils/constants";
import {Button} from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {useCallback, useEffect, useMemo, useState} from "react";
import z from "zod"

import {taskSchema, taskSchemaWithID} from "@/utils/schema";
import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query"
import { toast } from "sonner";
import { addTask,fetchTasks  } from "@/utils/Apis"; 
import {  SortingState } from "@tanstack/react-table";
import { deleteTasks } from "@/utils/Apis";
import AddTask from "@/components/add-task";
import useTaskForm from "@/hooks/useTaskForm";
import { useTaskUpadte } from "@/hooks/mutations";

export default function Tasks() {
    const [pagination, setPagination] =useState({
      pageIndex: 0,
      pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [openTask,setOpenTask] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>(null)

    const queryClient = useQueryClient();

    const form = useTaskForm()

    const createTaskMutation = useMutation(
      {
        mutationFn:(data:z.infer<typeof taskSchema>)=>addTask(data),
        onSuccess:()=>{
          toast.success("La tâche a été ajoutée avec succès")
          form.reset()
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
        onError:(error)=>{
          toast.error(error.message)
        },
      }
    )

    const deleteTaskMutation = useMutation(
      {
        mutationFn:(ids:number[])=>deleteTasks(ids),
        onSuccess:()=>{
          toast.success("La tâche a été supprimée avec succès")
          queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
        onError:(error)=>{
          toast.error(error.message)
        },
      }
    )
    const mutateAddingTask = createTaskMutation.mutate
    const onSubmit = useCallback(
        (data: z.infer<typeof taskSchema>) => {
            mutateAddingTask(data)
        },
        [mutateAddingTask]
    )
    const mutateDeletingTask = deleteTaskMutation.mutate
    const onDelete= useCallback((ids:number[])=>{
        mutateDeletingTask(ids)
    },[mutateDeletingTask])

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
    const total=useMemo(() => {
        return data?.total || 0
    },[data?.total])
    
    const tasks = useMemo(() => data?.tasks || [], [data])

    useEffect(() => {
        if(isError){
            toast.error(error?.message)
        }
    },[isError,error])

    const updateForm = useTaskForm(selectedItem)
     
    const updateTaskMutation = useTaskUpadte()
    const onUpdate= useCallback((data: any)=>{
      console.log(data)
        updateTaskMutation.mutate({...data,id:selectedItem?.id ?? 0})
    },[updateTaskMutation,selectedItem])

      useEffect(() => {
         if (selectedItem) {
         updateForm.reset({...selectedItem,project:selectedItem.project})
       }
    }, [selectedItem, updateForm])

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
            <DataTable isUpdatePending={updateTaskMutation.isPending} form={updateForm} onUpdate={onUpdate} selectedItem={selectedItem} setselectedItem={setSelectedItem} schema={taskSchemaWithID} onDelete={onDelete} sorting={sorting} setSorting={setSorting} rowCount={total} pagination={pagination} setPagination={setPagination} isPending={isPending } data={tasks} constants={TasksTableFields} headers={TasksTableFieldsKeys} />
            <AddTask isPending={createTaskMutation.isPending} form={form} openTask={openTask} setOpenTask={setOpenTask} onSubmit={onSubmit} />
            </div>
        </Card>
        
    )
}
