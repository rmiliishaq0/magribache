import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import  { Button } from "@/components/ui/button";

export default function Settings() {
    return (
        <Card className="text-foreground p-4 flex flex-col mb-6">
            <h1 className="text-xl font-medium">Profile Settings</h1>
            <div className="flex items-center gap-4 mt-4">
                <Avatar className="h-20 w-20">
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <Input type="file" accept="image/*" className="w-fit cursor-pointer" />
            </div>
            <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <Input id="name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <Input id="email" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="company">Company</label>
                    <Input id="company" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="address">Address</label>
                    <Input id="address" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="phone">Phone</label>
                    <Input id="phone" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="website">Website</label>
                    <Input id="website" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <Input id="description" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="logo">Logo</label>
                    <Input id="logo" type="file" accept="image/*" className="w-fit cursor-pointer" />
                </div>
                <Button>Save</Button>
            </div>
        </Card>
    )
}
