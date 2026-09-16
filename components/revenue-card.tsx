"use client"
import { Card ,CardHeader,CardTitle,CardContent} from "./ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import clsx from "clsx";
import { useState } from "react";
import {motion} from "motion/react"
import { ArrowUp01Icon } from "lucide-react";

export default function RevenueCard() {
    const [tabValue, setTabValue] = useState("Annuel")
    function handelTabCahnge(value:string){
        setTabValue(value)
    }
    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="flex items-center gap-6 justify-between">
                    <div className="text-secondary">
                        Chiffre d'affaires HT
                    </div>
                    <ToggleGroup type="single" className="text-secondary">
                        {["Annuel", "Mensuel", "Quotidien"].map((tab) => (
                            <ToggleGroupItem
                            key={tab}
                            onClick={() => handelTabCahnge(tab)}
                            value={tab}
                            className={clsx(
                                "relative px-3 py-2 cursor-pointer transition hover:text-primary",
                                tabValue === tab && "text-primary"
                            )}
                            >
                            {tab}

                            {tabValue === tab && (
                                <motion.div
                                layoutId="underline"
                                className="absolute left-0 bottom-0 h-[2px] w-full bg-primary"
                                />
                            )}
                            </ToggleGroupItem>
                        ))}
                        </ToggleGroup>
                </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary flex justify-between">
                    <div className=" font-bold text-2xl">
                        10000
                    </div>
                    <div >
                        <ArrowUp01Icon/>
                    </div>
            </CardContent>
        </Card>
    )
}