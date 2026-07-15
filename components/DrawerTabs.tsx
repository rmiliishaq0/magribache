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
import { Button } from "./ui/button"
import {Field, FieldError, FieldLabel} from "@/components/ui/field"
import {Spinner} from "@/components/ui/spinner";
import {Controller, UseFormReturn} from"react-hook-form"
import {Textarea} from "@/components/ui/textarea";
import type {ColumnMeta, Crm} from "@/utils/types"
import { EntityKey } from "@/utils/form-config";

export default function TableCellViewer({ item ,open,setOpenChange,constants,FieldsKeys,form,isPending,onSubmit,activeTab}: { open:boolean,item: Crm | null,setOpenChange:(open:boolean)=>void ,constants:Record<string,Record<string, ColumnMeta>> ,FieldsKeys?:Record<string, string>,form:UseFormReturn<Crm>,isPending?:boolean,onSubmit:(data:Crm)=>void,activeTab:EntityKey}) {

    return (
        <Drawer direction={"right"} open={open} onOpenChange={setOpenChange}>
          <DrawerContent>
            <DrawerHeader className="gap-1">
              <DrawerTitle>{activeTab}</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm h-full">
              <form id="form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {Object?.entries(constants).map(([fieldP,options])=>{
                  const o = options?.[0];
                  if((o?.isInput || o?.isNavigate )){
                    return(
                      <Controller
                          key={fieldP}
                          name={fieldP ==="projet" ? "project" : fieldP as keyof typeof item} control={form.control}
                          control={form.control}
                          render={({field,fieldState})=>{
                              return(
                                      <Field aria-invalid={fieldState.invalid}>
                                          <FieldLabel htmlFor={fieldP ==="projet" ? "project" : fieldP as string}>{ FieldsKeys ? FieldsKeys[fieldP] : fieldP }</FieldLabel>
                                          <Input id={fieldP ==="projet" ? "project" : fieldP as string} {...field} aria-invalid={fieldState.invalid} type={o?.type} />
                                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                      </Field>
                                  )

                      }}
                      />)
                  }
                  else if(o?.isSelected){
                      let data:any
                        if(o.needToFetch){
                            const query = o.hook(true)
                            data=query.data?.[fieldP.toLocaleLowerCase()+"s"]
                        }
                      return(
                          <Controller
                              key={fieldP}
                              name={fieldP as keyof typeof item}
                              control={form.control}
                              render={({ field, fieldState }) => { 
                                  return (
                                <Field aria-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={fieldP}>{FieldsKeys ? FieldsKeys[fieldP] : fieldP}</FieldLabel>

                                    <Select
                                          value={field.value}
                                          onValueChange={field.onChange}
                                        >
                                      <SelectTrigger aria-invalid={fieldState.invalid}>
                                        <SelectValue placeholder={fieldP} />
                                      </SelectTrigger>

                                      <SelectContent>
                                        <SelectGroup>
                                          { o.values ? o.values?.map((value:string) => (
                                                <SelectItem key={value} value={value}>
                                                    {value}
                                                </SelectItem>
                                            )): data?.map((val:any) => (
                                                <SelectItem key={val.id} value={val.id}>
                                                    {val?.fournisseur}
                                                </SelectItem>
                                            ))
                                            }
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>)}
                              }
                          />
                      )
                  }
                  else if(o?.isTextEarea){
                    return(
                        <Controller
                            key={fieldP}
                            name={fieldP as keyof typeof item}
                            control={form.control}
                            render={({field,fieldState})=>(
                                <Field aria-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor={fieldP}>{FieldsKeys ? FieldsKeys[fieldP] : fieldP}</FieldLabel>
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
