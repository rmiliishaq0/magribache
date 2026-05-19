"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import  { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod"
import { Field,FieldGroup,FieldLabel,FieldError } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form"
import { settingSchema } from "@/utils/schema"
import z from "zod"
import { Textarea } from "@/components/ui/textarea";
import {useMutation} from "@tanstack/react-query"
import { updateSetting } from "@/utils/Apis"
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";


export default function Settings() {
    const {isPending,isError,data,error,mutate}=useMutation({
        mutationFn:(data:z.infer<typeof settingSchema>)=>updateSetting(data),
        onSuccess:(data:any,variables,context)=>{
            toast.success("Paramètres mis à jour avec succès")
            me.setAuthState(data)
        },
        onError:(error:any,variables,context)=>{
            toast.error(error.message)
        },
    })
        const me =useAuthStore() 
        console.log(me.name)
        const form = useForm<z.infer<typeof settingSchema>>({
            mode:"all",
            defaultValues:{
                name:me.name!,
                address:me.address!,
                phone:me.phone!,
                website:me.website!,
                description:me.description!,
            },
            reValidateMode:"onBlur",
            resolver:zodResolver(settingSchema),
        })
        function onSubmit(data:z.infer<typeof settingSchema>){
            mutate(data)
        }
        useEffect(()=>{
            if(me){
                form.reset({
                    name:me.name!,
                    address:me.address!,
                    phone:me.phone!,
                    website:me.website!,
                    description:me.description!,
                })
            }
        },[me])
        return (
        <Card className="text-foreground p-4 flex flex-col mb-6">
            <h1 className="text-xl font-medium">Paramètres du profil</h1>
            <form className="mt-4 flex flex-col gap-4" id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                 <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    {
                        me.profilIcon && <AvatarImage src={me.profilIcon} alt={me.name || "profile"}/>
                    }
                    <AvatarFallback>{me?.name?.split(" ")[0][0].toUpperCase() || "AD"}</AvatarFallback>
                </Avatar>
                <Input type="file" accept="image/*" className="w-fit cursor-pointer" defaultValue={me.profilIcon || ""} />
            </div>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input disabled id="email" defaultValue={me.email || ""} />
                    </Field>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-name">Nom</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-name"
                                    aria-invalid={fieldState.invalid }
                                    required
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor="form-rhf-demo-address">Adresse</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-address"
                                    aria-invalid={fieldState.invalid }
                                    required
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor="form-rhf-demo-phone">Téléphone</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-phone"
                                    aria-invalid={fieldState.invalid }
                                    required
                                                                    
                                                                    />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="website"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor="form-rhf-demo-website">Site web</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-website"
                                    aria-invalid={fieldState.invalid }
                                    required
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field>
                                <FieldLabel htmlFor="form-rhf-demo-description">Description</FieldLabel>
                                <Textarea
                                    {...field}
                                    id="form-rhf-demo-description"
                                    aria-invalid={fieldState.invalid }
                                    required
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>    
                <div className="flex flex-col gap-2">
                    <label htmlFor="logo">Logo</label>
                    {me.logo && <img src={me.logo} alt="Logo" className="w-20 h-20" />}
                    <Input id="logo" type="file" accept="image/*" className="w-fit cursor-pointer" />
                </div>
                <Button disabled={!form.formState.isValid || isPending || isError || !form.formState.isDirty  } type="submit">
                  {isPending || form.formState.isSubmitting ? <Spinner /> : "Modifier"}
                </Button>
            </form>
        </Card>
    )
}
