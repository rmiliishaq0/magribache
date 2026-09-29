import { Card } from "@/components/ui/card";
import {COMPANY_SECTIONS} from "@/modules/settings/constants/company-sections"
import CompanySection from "./company-section";
import { companySections } from "../types";

export default function CompanySections({active,setIsActive}:companySections){
    return(
        <Card className="self-start   p-2 ">
            <p className="px-3 pb-2 pt-2 text-[10px] font-bold tracking-wide text-slate-400">SECTIONS</p>
            {COMPANY_SECTIONS.map((i)=>
                <CompanySection id={i.id} isActive={active=== i.id} setIsActive={setIsActive} key={i.id} title={i.title} description={i.description} Logo={i.icon} />
            )}
        </Card>
    )
}
