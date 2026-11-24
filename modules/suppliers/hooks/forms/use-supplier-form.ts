import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { SuppliersSchema } from "../../types";
import { SupplierStatus } from "@/app/generated/prisma/enums";
import { suppliersSchema } from "../../schemas/suppliers";

export function useSupplierForm({defaultValues}:{defaultValues?:SuppliersSchema}){
    return useForm<SuppliersSchema>({
        mode:"all",
        reValidateMode:"onChange",
        resolver: zodResolver(suppliersSchema) as Resolver<SuppliersSchema>,
        defaultValues:defaultValues? defaultValues : {
             reference:"RF",
             name:undefined,
            status:SupplierStatus.ACTIVE!,
            contactName:undefined,
            phone:undefined,
            whatsapp:undefined,
            email:undefined,
            country:undefined,
            city:undefined,
            address:undefined,
            ice:undefined,
            rc:undefined,
            ifNumber:undefined,
            paymentTerms:undefined,
            currency:"MAD",
            deliveryDelayDays:undefined,
            notes:undefined,
            createdAt:undefined,
            products:undefined,
        }
    })}