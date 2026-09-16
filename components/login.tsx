"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { loginSchema } from "@/utils/schema"
import z from "zod"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/utils/Apis"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState ,useEffect} from "react"
import { useAuthStore } from "@/stores/auth-store"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const authStore = useAuthStore();

  const router = useRouter();

  const {mutate,isPending,isError:isErrorApi,error} = useMutation({
  mutationFn: async (user:z.infer<typeof loginSchema>) => await login(user),
  onError: (error:Error) => {
    toast.error(error.message);
  },
  onSuccess: (data) => {
    authStore.setAuthState(data.data );
    toast.success("Connexion reussie");
    router.push("/admin");
  },
  })

  const [isError,setIsError] = useState<boolean>(isErrorApi);
  
  useEffect(()=>{
    setIsError(isErrorApi);
  },[isErrorApi]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof loginSchema>) {
    mutate(data);
  }
   return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onChange={()=>{setIsError(false)}} id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || isError}>
                    <FieldLabel htmlFor="form-rhf-demo-email">
                      Email
                  </FieldLabel>
                  <Input
                    type="email"
                    {...field}
                    id="form-rhf-demo-email"
                    aria-invalid={fieldState.invalid || isError}
                    placeholder="exemple@email.com"
                    required
                  />
                  {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : isError && error ? (
                      <FieldError errors={[error]} />
                    ) : null}
                </Field>
              )}
            />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid || isError}>
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Mot de passe
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid || isError}
                    placeholder="Mot de passe"
                    required
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : isError && error ? (
                    <FieldError errors={[error]} />
                  ) : null}
                </Field>
              )}
            />
              <Field>
                <Button disabled={!form.formState.isValid || isPending || isError} type="submit">
                  {isPending ? <Spinner /> : "Se connecter"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
