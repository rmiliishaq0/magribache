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
import {useMutation,QueryClient} from "@tanstack/react-query"
import { updateSetting } from "@/utils/Apis"
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import Image from "next/image";


export default function Settings() {
    const queryClient = new QueryClient();
    const {isPending,isError,data,error,mutate}=useMutation({
        mutationFn:(data:z.infer<typeof settingSchema>)=>updateSetting(data),
        onSuccess:(data:any,variables,context)=>{
            queryClient.invalidateQueries({ queryKey: ['admins'] })
            toast.success("Paramètres mis à jour avec succès")
        },
        onError:(error:any,variables,context)=>{
            toast.error(error.message)
        },
    })
        const me =useAuthStore() 
       

        const form = useForm<z.infer<typeof settingSchema>>({
            mode:"all",
            defaultValues:{
                name:me.name! || "",
                address:me.address! || "",
                phone:me.phone! || "",
                website:me.website! || "",
                description:me.description! || "",
                defaultColor:me.defaultColor || "#e89035",
            },
            reValidateMode:"onBlur",
            resolver:zodResolver(settingSchema),
        })
        function onSubmit(data:z.infer<typeof settingSchema>){
            mutate({...data,logo:data.logo})
        }
        useEffect(()=>{
            if(me){
                form.reset({
                    name:me.name! || "",
                    address:me.address! || "",
                    phone:me.phone! || "",
                    website:me.website! || "",
                    description:me.description! || "",
                    defaultColor:me.defaultColor || "#B77111",
                    footerText:me.footerText || "",
                    profileImage:me.profilIcon || undefined,
                    logo:me.logo || undefined,
                    signature : me.signature || undefined

                })
            }
        },[me])

        const profileImage = form.watch("profileImage")
        const logo = form.watch("logo")
        const signature = form.watch("signature")
        return (
        <Card className="text-foreground p-4 flex flex-col mb-6">
            <h1 className="text-xl font-medium">Paramètres du profil</h1>
            <form className="mt-4 flex flex-col gap-4" id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                 <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarFallback>{me?.name?.split(" ")[0][0].toUpperCase() || "AD"}</AvatarFallback>
                    {profileImage || me.profilIcon ? (<AvatarImage src={profileImage instanceof File ?  URL.createObjectURL(profileImage) : me.profilIcon || ""} alt={me.name || "profile"}/>) : null}
                </Avatar>
                <Controller
                    name="profileImage"
                    control={form.control}
                    render={({ field ,fieldState}) => (
                        <Field aria-invalid={fieldState.invalid}>
                            <Input onChange={(e) => field.onChange(e.target.files?.[0])}  type="file" accept="image/*" className="w-fit cursor-pointer" aria-invalid={fieldState.invalid }/>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
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

                    <Controller
                        name="logo"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field aria-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-demo-logo">Logo</FieldLabel>
                                    <div className="flex items-center gap-4">
                                        {(me.logo || logo) && (
                                            <Image src={me.logo ?  me.logo : URL.createObjectURL(logo as File)} alt="Logo" width={70} height={70} className="object-cover "/>
                                        )}
                                        <Input id="form-rhf-demo-logo" type="file" accept="image/*" className="w-fit cursor-pointer"
                                            aria-invalid={fieldState.invalid }
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                    </div>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className="flex items-center gap-4">
                        <Controller
                        name="signature"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field aria-invalid={fieldState.invalid} className="flex-1">
                                <FieldLabel htmlFor="form-rhf-demo-signature">Signature</FieldLabel>
                                    <div className="flex items-center gap-4">
                                        {(me.signature || signature) && (
                                            <Image src={me.signature ?  me.signature : URL.createObjectURL(signature as File)} alt="Signature" width={70} height={70} className="object-cover "/>
                                        )}
                                        <Input  id="form-rhf-demo-signature" type="file" accept="image/*" className="w-fit cursor-pointer"
                                            aria-invalid={fieldState.invalid }
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                    />
                                    </div>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller 
                        name="defaultColor"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field aria-invalid={fieldState.invalid} className="flex-1">
                                <FieldLabel htmlFor="form-rhf-demo-color">Color</FieldLabel>
                                <Input id="form-rhf-demo-color" type="color" className="w-fit cursor-pointer"
                                    aria-invalid={fieldState.invalid }
                                    {...field}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    </div>
                    <Controller
                        name="footerText"
                        control={form.control}
                        render={({ field ,fieldState}) => (
                            <Field aria-invalid={fieldState.invalid} >
                                <FieldLabel htmlFor="form-rhf-demo-footerText">Texte du pied de page</FieldLabel>
                                <Textarea id="form-rhf-demo-footerText" className="flex-1"
                                    aria-invalid={fieldState.invalid }
                                    {...field}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </FieldGroup>    
                <Button disabled={!form.formState.isValid || isPending || isError || !form.formState.isDirty  } type="submit">
                  {isPending || form.formState.isSubmitting ? <Spinner /> : "Modifier"}
                </Button>
            </form>
        </Card>
    )
}
