import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {Controller} from "react-hook-form"
import { Field ,FieldLabel,FieldError} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {memo} from "react";
import {Spinner} from "@/components/ui/spinner";
import { ColumnMeta } from "@/utils/types";

export default memo(function AddDialog({open,setOpen,onSubmit,form,isPending,constants,activeTab}:{
    open:boolean,
    setOpen:(openTask:boolean)=>void,
    onSubmit:any
    form:any
    isPending?:boolean
    constants: Record<string,Record<string, ColumnMeta[]>>
    activeTab:string
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Ajouter une {activeTab}</DialogTitle>
                </DialogHeader>
                <form id="form" className="grid grid-cols-2 gap-4 p-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    {...Object.entries(constants[activeTab]).map(([key,options])=>{
                        const o = options[0]
                        if(o?.isInput || o?.isNavigate){
                            return(
                                <div style={{gridColumn: o.fullWidth ? "span 2" : "span 1"}} key={key}>
                                    <Controller
                            name={key}
                            control={form.control}
                            render={({ field ,fieldState}) => (
                                <Field aria-invalid={fieldState.invalid}     className="w-full"
>
                                    <FieldLabel htmlFor={key}>{key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, str => str.toUpperCase())
    }</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} id={key} {...field} type={o.type} />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                 </Field>
                            )}
                    />
                                </div>
                            )
                        }
                    else if(o?.isSelected){
                        return(
                         <div style={{gridColumn: o.fullWidth ? "span 2" : "span 1"}} key={key}>

                            <Controller
                        name={key}
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field aria-invalid={fieldState.invalid}     className="w-full"
>
                                <FieldLabel htmlFor={key}>{key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, str => str.toUpperCase())
    }</FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger aria-invalid={fieldState.invalid} className="h-11">
                                        <SelectValue
    placeholder={`Sélectionner ${key}`}
/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {o.values?.map((value) => (
                                                <SelectItem key={value} value={value}>
                                                    {value}
                                                </SelectItem>
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
                    </div>
                        )
                        
                    }    
                    })}
                    
                
                    
                
                    
                </form>
                <Button form={"form"} disabled={!form.formState.isValid || isPending || !form.formState.isDirty  } type="submit">
                    {isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                </Button>
            </DialogContent>
        </Dialog>
    )
})