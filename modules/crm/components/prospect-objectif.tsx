import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProspectObjectif(){
    const data = null
    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-secondary">Besoin client</CardTitle>
            </CardHeader>
            <CardContent>
                {data ? <></> : <div className="pb-6 text-muted-foreground flex items-center justify-center text-md ">aucune donnée</div>}
            </CardContent>
        </Card>
    )
}