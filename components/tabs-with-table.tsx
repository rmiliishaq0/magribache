"use client"
import {  useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import TabsSwitch from "./Tabs"
import { CrmFields, CrmTableFields ,SalesTableFields,FiledsNeedCards} from "@/utils/constants"
import  DataTable  from "./data-table"
import { Card } from "./ui/card"
import DashboardCard from "./dashboard-card"
import {motion} from 'motion/react'
import {SortingState} from "@tanstack/react-table";
import AddDialog from "@/components/add-dialog";
import {useForm} from "react-hook-form";
import { useEntity } from "@/hooks/useEntity"
import { EntityKey } from "@/utils/form-config"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { normalizeKeys } from "@/lib/utils";

export default  function TabsWithTable(){
    const [pagination, setPagination] =useState({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [open,setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>(null)



    const path = usePathname()
    const isCrm=path.includes("crm")
    const activeFields = CrmFields
    const activeTableFields = path.includes("crm") ? CrmTableFields:SalesTableFields

    const [activeTab, setActiveTab] = useState<EntityKey >(activeFields[0])

    const entity = useEntity<Crm>(activeTab,{pagination, sorting})

    const form = useForm({
        resolver: zodResolver(entity.schema),
        defaultValues: entity.defaultValues,
        mode:"all",
        reValidateMode:"onBlur",
    })

    useEffect(() => {
        form.reset(entity.defaultValues);
    }, [activeTab]);
    
    const onDelete = useCallback((ids:number[])=>{
        entity.actions.delete.mutate(ids)
    }, [entity.actions.delete])

    const onSubmit = useCallback( (data:any) => {
        entity.actions.create.mutate(data, {
            onSuccess: () => {
                form.reset(entity.defaultValues);
                setOpen(false);
            }
        })
    }, [entity.actions.create, form, entity.defaultValues])

    const { isPending, isError, data, error } = entity.actions.query

    const total=useMemo(() => {
            return data?.total || 0
        },[data?.total])
        
    const queryData = useMemo(() => {
        return (
            data?.[activeTab.toLowerCase()] ??
            data?.data ??
            []
        );
    }, [data, activeTab]);
        
    useEffect(() => {
        if(isError){
            toast.error(error?.message)
        }
    },[isError,error])

    const updateForm = useForm({
        resolver: zodResolver(entity.schema),
        defaultValues: entity.defaultValues,
        mode:"all",
        reValidateMode:"onBlur",
    })
    
    const onUpdate = useCallback(
  (data: any) => {

    if (!selectedItem?.id) return;

    entity?.actions?.update.mutate(
      {
        ...data,
        id: selectedItem.id,
      },
      {
        onSuccess: () => {
          form.reset(entity.defaultValues);
          setSelectedItem(null);
        },
      }
    );
  },
  [entity?.actions?.update, selectedItem, form, entity.defaultValues]
);

      useEffect(() => {
         if (selectedItem) {
            const {Fournisseur,...rest}= selectedItem
            if(activeTab=="Contacts fournisseurs"){
                updateForm.reset({...normalizeKeys(rest),Fournisseur:selectedItem.fournisseurId,"Identifiant fiscal (IF)" : selectedItem.identifiantFiscal,Email:selectedItem.email || undefined})    
            }else if(activeTab ==="Contacts"){
                updateForm.reset({...normalizeKeys(rest),Email:selectedItem.email || undefined})
            }
            else{
                updateForm.reset({...normalizeKeys(rest),"Identifiant fiscal (IF)" : selectedItem.identifiantFiscal,"Modèle de contrat":selectedItem.modèleContrat,"Date de depart":selectedItem.dateDepart,"Date de fin":selectedItem.dateFin,Email:selectedItem.email || undefined,Nom:selectedItem?.entreprise})
            }
          }
    }, [selectedItem, updateForm])

    return (
        <motion.div>
            <TabsSwitch setOpen={setOpen} constants={activeFields} activeTab={activeTab} setActiveTab={setActiveTab} towButtons={false}>
            <Card className="mt-4 px-4 py-6 flex flex-col gap-4">
                {FiledsNeedCards.includes(activeTab) && (isCrm ?(<>
                <div className="grid md:grid-cols-2 grid-cols-2 gap-4">
                    <DashboardCard number={data?.countActif || 0} extra="Actif" />
                    <DashboardCard number={data?.inactif || 0} extra="Inactif"/>
                    </div>
                </>) : (<div className="grid md:grid-cols-2 grid-cols-2 gap-4">
                    <DashboardCard number={data?.total || 0} extra="Total" />
                    <DashboardCard number={data?.paye || 0} extra="Paye"/>
                    <DashboardCard number={data?.annule || 0} extra="Annule" />
                    <DashboardCard number={data?.brouillon || 0} extra="Brouillon"/>
                </div>))}
                <DataTable selectedItem={selectedItem} setselectedItem={setSelectedItem} form={updateForm} isUpdatePending={entity?.actions?.update?.isPending} onUpdate={onUpdate} isPending={isPending} schema={entity.schema} rowCount={total} sorting={sorting} setSorting={setSorting} pagination={pagination} setPagination={setPagination} constants={activeTableFields} activeTab={activeTab} data={queryData} onDelete={onDelete}/>
            </Card>
            </TabsSwitch>
            {isCrm  && <AddDialog  constants={activeTableFields} activeTab={activeTab} open={open} form={form}  setOpen={setOpen}  onSubmit={onSubmit} isPending={entity.actions.create.isPending} />}
        </motion.div>
        
    )
}