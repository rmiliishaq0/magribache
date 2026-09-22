import { ResizablePanel, ResizablePanelGroup,ResizableHandle } from "@/components/ui/resizable";
import DevisForm from "@/components/doc-from"
import DevisPreview from "@/components/doc-preview"
import { Card,  } from "@/components/ui/card"
import { DevisContentProps } from "../types";



export default function DevisContent({form, onSubmit, data, previewRef, client,reference}:DevisContentProps) {
    return(
      <Card>
          <ResizablePanelGroup
                  orientation="horizontal"
                    className="min-h-[200px] w-full flex gap-4 px-6 py-3 justify-around"
            >
              <ResizablePanel defaultSize="40%" className="w-full">
                <div className="flex h-full  justify-center w-full">
                  <DevisForm onSubmit={onSubmit} clients={data} form={form} />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize="60%" className="w-full">
                <div ref={previewRef} className="flex h-full w-full justify-center  w-full">
                  <DevisPreview clientRefrence={client.reference} docNumber={reference} isFacture={false} name={client?.name} email={client?.email} phone={client?.phone} form={form}/>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
      </Card>
    )
}