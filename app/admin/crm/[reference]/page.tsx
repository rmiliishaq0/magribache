import { Card, CardContent } from "@/components/ui/card"
import ProspectInfo from "@/modules/crm/components/prospect-info";
import ProspectObjectif from "@/modules/crm/components/prospect-objectif";
import {ProspectHistorique} from "@/modules/crm/components/prospect-historique"
import ProspectDevis from "@/modules/crm/components/prospect-devis"
import { notFound } from "next/navigation";
import { getProspect } from "@/modules/crm/actions/get-prospect";
import ProspectHeader from "@/modules/crm/components/prospect-header";

export default async function Prospect({params}:{params:Promise<{reference:string}>}) {
    const {reference} = await params
    if(!reference) notFound()
    const result = await getProspect(reference)
    if(!result.success){
        notFound()    
    }
    const data = {...result.prospect,
                    reference:result.prospect?.reference!,
                    fullName :result.prospect?.fullName ?? "",
                    email:result.prospect?.email ?? undefined,
                    phone:result.prospect?.phone ?? undefined,
                    whatsapp:result.prospect?.whatsapp ?? undefined,
                    companyName: result.prospect?.companyName ?? undefined,
                    website:result.prospect?.website ?? undefined,
                    address:result.prospect?.address ?? undefined,
                    city:result.prospect?.city ?? undefined,
                    region:result.prospect?.region ?? undefined,
                    country:result.prospect?.country ?? undefined,
                    activity: undefined,
                    ice:result.prospect?.ice ?? undefined,
                    rc:result.prospect?.rc ?? undefined,
                    ifNumber:result.prospect?.ifNumber ?? undefined,
                    source:result.prospect?.source ?? "OTHER",
                    status:result.prospect?.status ?? "NEW",
                    priority:result.prospect?.priority ?? "LOW",
                    notes:result.prospect?.notes ?? undefined,
                    nextFollowUpAt:result.prospect?.nextFollowUpAt ?? undefined
                }
    const devis = data?.documents?.map((document) => ({
        ...document,
        id: Number(document.id),
        }))
    return (
        <Card className="mb-6">
            <CardContent className=" space-y-6 ">
                <ProspectHeader prospect={data}/>
                <ProspectInfo
                    prospect={data}

                />
                <ProspectObjectif/>
                <ProspectHistorique activities={data?.activities}/>
                <ProspectDevis devis={devis}/>
            </CardContent>
        </Card>
    )
}