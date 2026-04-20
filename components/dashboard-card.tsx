import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function DashboardCard({title,children,Logo,number,extra}: { title: string, children: React.ReactNode, Logo: React.ReactNode, number: number, extra: string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle >
                    <div className="flex items-center font-medium justify-between text-primary">
                        {title}
                        {Logo}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="text-secondary flex gap-1 items-baseline">
                    <h2 className="text-3xl font-bold">{number}</h2>
                    <span className="text-sm text-muted-foreground">{extra}</span>
                </div>
                <div>
                    {children}
                </div>
                </div>
            </CardContent>
        </Card>
    )
}