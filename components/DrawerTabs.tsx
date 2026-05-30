import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import {z} from "zod"
import {taskSchema, taskSchemaWithID} from "@/utils/schema"
import { Button } from "./ui/button"
import React, {useEffect} from "react"
import {TasksTableFields,TasksTableFieldsKeys} from "@/utils/constants";
import {Field, FieldError, FieldLabel} from "@/components/ui/field"
import useTaskForm from "@/hooks/useTaskForm";
import {Spinner} from "@/components/ui/spinner";
import {Controller} from"react-hook-form"
import {Textarea} from "@/components/ui/textarea";
import useTaskUpadte from "@/hooks/useTaskUpadte";

export default function TableCellViewer({ item ,open,setOpenChange}: { open:boolean,item: z.infer<typeof taskSchemaWithID> | null,setOpenChange:(open:boolean)=>void}) {
    const form = useTaskForm(item)
    const {isPending,mutate} = useTaskUpadte()

    useEffect(() => {

        if (item) {
          form.reset({...item,project:item.project})
      }
    }, [item, form])
    function onSubmit(data:z.infer<typeof taskSchema>) {
        mutate({...data,id:item?.id ?? 0})
    }
    return (
        <Drawer direction={"right"} open={open} onOpenChange={setOpenChange}>
          <DrawerContent>
            <DrawerHeader className="gap-1">
              <DrawerTitle>{item?.name}</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm h-full">
              <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {Object.entries(TasksTableFields).map(([fieldP,options])=>{
                  const o = options?.[0];
                  if((o.isInput || o.isNavigate )){
                    return(
                      <Controller
                          key={fieldP}
                          name={fieldP ==="projet" ? "project" : fieldP as keyof typeof item} control={form.control}
                          render={({field,fieldState})=>{
                              return(
                                      <Field aria-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor={fieldP ==="projet" ? "project" : fieldP as keyof typeof item}>{TasksTableFieldsKeys[fieldP]}</FieldLabel>
                                          <Input id={fieldP ==="projet" ? "project" : fieldP as keyof typeof item} {...field} aria-invalid={fieldState.invalid} type={o?.type} />
                                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                      </Field>
                                  )

                      }}
                      />)
                  }
                  else if(o.isSelected){
                      return(
                          <Controller
                              key={fieldP}
                              name={fieldP as keyof typeof item}
                              control={form.control}
                              render={({ field, fieldState }) => (
                                  <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={fieldP}>{TasksTableFieldsKeys[fieldP]}</FieldLabel>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                      <SelectTrigger aria-invalid={fieldState.invalid}>
                                        <SelectValue placeholder={fieldP} />
                                      </SelectTrigger>

                                      <SelectContent>
                                        <SelectGroup>
                                          {o?.values?.map((i)=>(
                                              <SelectItem key={i} value={i}>{i}</SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                              )}
                          />
                      )
                  }
                  else if(o.isTextEarea){
                    return(
                        <Controller
                            key={fieldP}
                            name={fieldP as keyof typeof item}
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field aria-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor={fieldP}>{TasksTableFieldsKeys[fieldP]}</FieldLabel>
                                  <Textarea id={fieldP} {...field} aria-invalid={fieldState.invalid} />
                                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    )
                  }
                })}

              </form>
            </div>
            <DrawerFooter>
              <Button form={"form"} disabled={!form.formState.isValid || isPending || !form.formState.isDirty  } type="submit">{isPending || form.formState.isSubmitting ? <Spinner />: "Modifier"}</Button>
              <DrawerClose asChild>
                <Button variant="outline">Annuler</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>

        </Drawer>
    )
}
