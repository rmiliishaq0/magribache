import React, { SetStateAction } from "react";

export type EntityDialogType={
    title:string,
    open:boolean,
    setIsOpen:React.Dispatch<SetStateAction<boolean>>
    children:React.ReactNode
}