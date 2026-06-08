"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function TabsSwitch({children,activeTab,setActiveTab,towButtons=true,constants,setOpen}:{children:React.ReactNode,activeTab:string,setActiveTab:any,towButtons?:boolean,constants:string[],setOpen:React.Dispatch<boolean>}) {
    const router = useRouter()
    const handelClick = ()=>{
        if(activeTab == "Devis" || activeTab == "Factures"){
            router.push(`/admin/sales/${activeTab.toLocaleLowerCase()}/create`)
        }else{
            setOpen(true)
        }
    }
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex gap-4 justify-between items-center">
                <TabsList>
                {constants.map((item,index)=>{
                    return(
                        <TabsTrigger onClick={()=>{setActiveTab(item)}}  key={index} value={item}>{item}</TabsTrigger>
                    )
                })}
                </TabsList>
                <div className="flex items-center gap-4">
                    <Button onClick={handelClick} className="cursor-pointer">Ajouter un {activeTab}</Button>
                   {!towButtons &&  <Button disabled className="cursor-pointer">Importer des {activeTab}</Button>}
                </div>
            </div>
            {children}
        </Tabs>
    )
}