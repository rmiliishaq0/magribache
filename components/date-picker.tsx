"use client"

import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function DatePickerWithRange<T extends FieldValues>({field}:{field:ControllerRenderProps<T>}) {

  return (
      <Popover>
        <PopoverTrigger asChild >
            <Button variant="outline" id="date-picker-range" className={cn("bg-white hover:bg-white hover:text-muted-foreground justify-start px-2.5 font-normal text-muted-foreground",field.value?.from && "text-black")}><CalendarIcon data-icon="inline-start" />{field.value?.from? field.value.to? `${format(field.value.from, "PPP")} - ${format(field.value.to, "PPP")}`: format(field.value.from, "PPP"): "Toutes périodes"}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={field.value}
            onSelect={field.onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
  )
}
