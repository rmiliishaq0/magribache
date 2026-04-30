"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"

export default function TabsSwitch({children,activeTab,setActiveTab,towButtons=true,constants}:{children:React.ReactNode,activeTab:string,setActiveTab:any,towButtons?:boolean,constants:string[]}){
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
                    <Button className="cursor-pointer">Ajouter un {activeTab}</Button>
                   {!towButtons &&  <Button className="cursor-pointer">Importer des {activeTab}</Button>}
                </div>
            </div>
            {children}
        </Tabs>
    )
}