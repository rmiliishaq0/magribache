import { crmScemaWithId } from "@/modules/crm/types";
import { devisSchemaWithId } from "@/modules/devis/schemas/devis";
import { Table } from "@tanstack/react-table";
import React, { SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";


export type filterBoard = {
    title:string
    table:Table<any>
    setIsOpen?:React.Dispatch<SetStateAction<boolean>>
    children:React.ReactNode,
    form:UseFormReturn<any>,
    link?:string
}

