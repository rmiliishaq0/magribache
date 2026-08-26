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
import StatsCard from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Plus ,FileText, ShoppingCart} from "lucide-react";
import { format ,isAfter ,formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Options } from "@/modules/crm/constants/options-to-frensh";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { crmSchemaWithRef } from "@/modules/crm/schemas/prospect";
import { useUpdateProspect } from "@/modules/crm/hooks/mutations/use-update-prospect";
import { clientStats } from "../constants/client-stats";
import { statusColors } from "@/modules/crm/constants/colors";

type Data={
    date?:Date | undefined,
    note?:string | undefined
}


export default function ClientHeader({client}:{client :z.infer<typeof crmSchemaWithRef>}){
    const [data, setData] = useState<Data>({note:client?.notes})
    const mutate = useUpdateProspect()   
    const router = useRouter()
    return(
        <>
            <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-secondary mt-2">Fiche client</h2>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/admin/clients">Clients</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{client.reference}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                    </div>
                    <div className="flex gap-2">
                        <Button><Plus/> Créer devis</Button>
                        <Button variant={"outline"}><ShoppingCart/> Créer une commande</Button>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button variant={"outline"}><FileText/> Ajouter une note</Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-lg p-4" align="center">
                                <Textarea value={data?.note} onChange={(e)=>{setData((d)=>({...d,note:e.target.value})) }} />                       
                                <Button disabled={data.note == client.notes ||data.note == undefined || data.note == null || mutate.isPending || data.note.trim()==""} onClick={()=>{mutate.mutate({...client,notes:data?.note})}}>Enregistrer</Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {clientStats.map((i, index) => {
                        const value = client?.[i.accessKey as keyof typeof client] || null
                        return (
                            <StatsCard
                                key={index}
                                Icon={i.icon}
                                description={i.description ?? "Indéfinie"}
                                number={value ? String(value) : 0}
                                style={statusColors[i.style]}
                            />
                        )
})}
                </div>
        </>
    )
}