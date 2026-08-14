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
import { Plus ,User,FileText,OctagonX,CalendarDays} from "lucide-react";
import { prospectStats } from "@/modules/crm/constants/prospect-stats";
import { format ,isAfter ,formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Options } from "@/modules/crm/constants/options-to-frensh";
import { crmSchemaWithRef } from "../schemas/prospect";
import { z } from "zod";
import { useUpdateProspect } from "../hooks/mutations/use-update-prospect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { s } from "motion/react-client";
import { useConvertProspect } from "../hooks/mutations/use-convert-prospect";
import { useRouter } from "next/navigation";

type Data={
    date?:Date | undefined,
    note?:string | undefined
}


export default function ProspectHeader({prospect}:{prospect :z.infer<typeof crmSchemaWithRef>}){
    const [data, setData] = useState<Data>({note:prospect?.notes})
    const mutate = useUpdateProspect()   
    const move = useConvertProspect() 
    const router = useRouter()
    return(
        <>
            <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-secondary mt-2">Fiche prospect</h2>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link href="/admin/crm">Prospects</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{prospect.reference}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                    </div>
                    <div className="flex gap-2">
                        <Button><Plus/> Créer devis</Button>
                        <Button variant={"outline"} onClick={()=>move.mutate(prospect.reference,{onSuccess:()=>router.push("/admin/crm")})}><User/> Convertir en client</Button>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button variant={"outline"}><FileText/> Ajouter une note</Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-lg p-4" align="center">
                                <Textarea value={data?.note} onChange={(e)=>{setData((d)=>({...d,note:e.target.value})) }} />                       
                                <Button disabled={data.note == prospect.notes ||data.note == undefined || data.note == null || mutate.isPending || data.note.trim()==""} onClick={()=>{mutate.mutate({...prospect,notes:data?.note})}}>Enregistrer</Button>
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button variant="outline" id="date-picker-range" ><CalendarDays/> Programmer relance</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-4" align="center">
                            <Calendar 
                                mode="single"
                                selected={data?.date}
                                onSelect={(date) => {
                                    setData((s) => ({
                                        ...s,
                                        date,
                                    }));
                                    }}
                                className="rounded-lg border"
                                captionLayout="dropdown"
                                />                            
                                <Button disabled={data.date == null || undefined || mutate.isPending} onClick={()=>{mutate.mutate({...prospect,nextFollowUpAt:data?.date})}}>Enregistrer</Button>
                            </PopoverContent>
                        </Popover>
                        {prospect.status!=="LOST" &&(
                            <Button disabled={mutate.isPending} variant={"destructive"} onClick={()=>{mutate.mutate({...prospect,status:"LOST"})}}><OctagonX/> Marque perdu</Button>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    {prospectStats.map((i, index) => {
                        const value = prospect?.[i.accessKey as keyof typeof prospect] || undefined
 
                        const displayValue =
                            value == null
                            ? "Pas de relance"
                            : i.accessKey === "nextFollowUpAt"
                                ? (isAfter(new Date(value),new Date()) ? format(new Date(value), "PP") : "Pas de relance")
                                : String(value)
                        const dayUntil = (i.accessKey === "nextFollowUpAt" && value != undefined && value != null && isAfter(new Date(value),new Date())) ? formatDistanceToNow(new Date(value)) : undefined
                        return (
                            <StatsCard
                                key={index}
                                Icon={i.getIcon(String(value))}
                                description={i.title ?? "Indéfinie"}
                                number={Options?.[displayValue as keyof typeof Options] || displayValue}
                                style={i.getStyle(String(value))}
                                extra={ dayUntil && <Badge className={i.getStyle(String(value))}>{dayUntil}</Badge> || undefined}
                            />
                        )
})}
                </div>
        </>
    )
}