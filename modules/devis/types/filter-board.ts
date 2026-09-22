import { crmScemaWithId } from "@/modules/crm/types";
import { Table } from "@tanstack/react-table";
import React, { SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { filterSchema } from "../schemas/devis-filter-schema";


export type filterBoard = {
    title:string
    table:Table<z.infer<typeof crmScemaWithId>>
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
    children:React.ReactNode,
    form:UseFormReturn<z.infer< typeof filterSchema>>
}

