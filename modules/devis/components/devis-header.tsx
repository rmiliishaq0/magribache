"use client"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DevisHeaderProps } from "../types";


export default function DevisHeader({form,isPending,isError,handlePrint}:DevisHeaderProps) {
    return(
        <>
            <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-secondary mt-2">Créer Un Devis</h2>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/admin/devis">Devis</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Créer Un Devis</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                    </div>
                    <div className="flex gap-4">
                        <Button form="devis" disabled={!form.formState.isValid || isPending || isError || !form.formState.isDirty  } type="submit">
                        {isPending || form.formState.isSubmitting ? <Spinner /> : "Enregistrer"}
                        </Button>
                        <Button onClick={handlePrint} variant="outline">Imprimer</Button>
                    </div>
                </div>
        </>
    )
}