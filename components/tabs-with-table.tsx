"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TabsWithTable() {
  return (
    <Tabs defaultValue="factures" className="w-full">
      <TabsList>
        <TabsTrigger value="devis">Devis</TabsTrigger>
        <TabsTrigger value="factures">Factures</TabsTrigger>
      </TabsList>
      <TabsContent value="devis" className="mt-4">
        <Card className="p-4">
          <Button asChild>
            <Link href="/admin/sales/factures/create">Créer une facture</Link>
          </Button>
        </Card>
      </TabsContent>
      <TabsContent value="factures" className="mt-4">
        <Card className="p-4">
          <Button asChild>
            <Link href="/admin/sales/factures/create">Créer une facture</Link>
          </Button>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
