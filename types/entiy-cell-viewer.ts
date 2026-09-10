import { crmScemaWithId } from "@/modules/crm/types";
import React from "react";
import { z } from "zod";

export type EntityCellViewer = {
    link?:string,
    children:React.ReactNode,
    title?:string
    ModifyButton?: React.ReactNode
    item:any
    setItem:React.Dispatch<React.SetStateAction<any>>
}