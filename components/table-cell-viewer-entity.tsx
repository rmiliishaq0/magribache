import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button"
import { EntityCellViewer } from "@/types/entiy-cell-viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function TableCellViewerEntity({children,title,item,setItem}: EntityCellViewer) {
    const isMobile = useIsMobile()

    return (
        <Drawer modal={true} direction={isMobile ? "bottom" : "right"} open={!!item} onOpenChange={(nextOpen) => {
          if (!nextOpen) setItem(null)
        }}>
      <DrawerContent className="overflow-visible">
        <DrawerHeader className=" gap-1">
          <div className="flex justify-between items-center">
            <DrawerTitle>{title}</DrawerTitle>
              <Link href={`/admin/crm/${item?.reference }` || ""}><Button variant={"outline"}><ExternalLink/></Button></Link>
          </div>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
    )
}
