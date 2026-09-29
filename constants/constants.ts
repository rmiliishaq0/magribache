import {
  BriefcaseBusiness,
  ChartColumn,
  Landmark,
  Package,
  PieChart,
  ShoppingCart,
  UserRoundCheck,
  Users2,
  FileText
} from "lucide-react"
import type { ColumnMeta } from "../types/types"
import { EntityKey } from "../config/form-config"

export const sideBarecontents = {
  user: {
    name: "admin",
    email: "admin@admin.com",
  },
  logo:{
    name:"Magribache",
    logo:BriefcaseBusiness,
    sub:"Gestion Commerciale"
  },
  contents:[
    {
      title:"Tableau de bord",
      icon:PieChart,
      href:"/admin",
    },
    {
      title:"CRM",
      icon:Users2,
      href:"/admin/crm",
    },
    {
      title:"Clients",
      icon:UserRoundCheck,
      href:"/admin/clients",
    },
     {
      title:"Devis",
      icon:FileText,
      href:"/admin/devis",
    },
    {
      title:"Achats",
      icon:ShoppingCart,
      href:"/admin/purchases",
    },
    {
      title:"Produits",
      icon:Package,
      href:"/admin/products",
    },
    {
      title:"Finances",
      icon:Landmark,
      href:"/admin/finances",
    },
    {
      title:"Rapports",
      icon:ChartColumn,
      href:"/admin/reports",
    },
  ]
}

export const CrmFields:EntityKey[] = [
  "Clients",
  "Fournisseurs",
  "Contacts",
  "Contacts fournisseurs",
  "Prospects",
  "Contrats"
]





export const SalesFields = [
  "Devis",
 // "Bon de commande",
  "Factures",
 // "Bon de Livraison",
//  "Avoir",
 // "Règlements",
 // "Avances",
]

export const SalesTableFields : Record<string,Record<string, ColumnMeta[]>> ={
  Devis:{
    "Numéro":[],   
    "Client":[{isInput:true,key:"entreprise"}],
    "Date":[{isDate:true}],
    "Montant TTC":[{isInput:true,type:"number",key:"montantTTC"}],
    //"Facture":[{isInput:true,type:"number"}],
    //"Bon de commande": [{isInput:true,type:"number"}],
    //"Bon de livraison": [{isInput:true,type:"text"}],
    "Commentaires": [{isInput:true,type:"text",key:"notes"}],
    "Statut": [{isBadge:true,key:"status"}],
  },
  // "Bon de commande":{
  //   "Numéro":[],
  //   "Client":[{isNavigate:true,}],
  //   "Date":[{isInput:true,type:"date"}],
  //   "Total HT":[{isInput:true,type:"date"}],
  //   "Montant":[{isInput:true,type:"number"}],
  //   "Statut":[{isBadge:true}],
  //   "Qualification": [{isInput:true,type:"number"}],
  //   "Agent": [{isInput:true,type:"text"}],
  //   "N° de bon": [{isInput:true,type:"text"}],
  // },
  Factures:{
    "Numéro":[],    
    "Client":[{isInput:true,key:"entreprise"}],
    "Date de facture":[{isInput:true,type:"text",key:"dateDocument"}],
    "Total HT":[{isInput:true,type:"number",key:"montantHT"}],
    "Montant":[{isInput:true,type:"text",key:"montantTTC"}],
    "Statut":[{isBadge:true,key:"status"}],
    //"Commercial":[{isInput:true,type:"text",key:"montantTTC"}],
    //"Periode":[],
  }
  // "Bon de Livraison":{
  //   "Numéro":[],
  //   "Client":[{isNavigate:true,}],
  //   "Date":[{isInput:true,type:"text"}],
  //   "Montant HT":[{isInput:true,type:"email"}],
  //   "Montant TTC":[{isInput:true,type:"number"}],
  //   "Statut":[{isBadge:true}],
  //   "Société de livraison":[{isInput:true,type:"text"}],
  //   "Statut de livraison":[{isInput:true,type:"text"}],
  //   "Transporteur":[{isInput:true}]
 // },
  // Avoir:{
  //   "Nom":[{isNavigate:true,}],
  //   "Prospect":[{isInput:true,type:"text"}],
  //   "Email":[{isInput:true,type:"email"}],
  //   "Téléphone":[{isInput:true,type:"number"}],
  //   "Attribué à":[{isInput:true,type:"text"}],
  //   "Statut":[{isInput:true,type:"text"}],
  //   "Source":[{isInput:true,type:"text"}],
  //   "Date d'ajout":[{isInput:true,type:"date"}],
  //   "Dernier contact":[{isInput:true,type:"date"}],
  //   "Localisation":[{isInput:true,type:"text"}],
  // },
  // Règlements:{
  //   "Avoir #":[],
  //   "Client":[{isInput:true,type:"text"}],
  //   "Date":[{isInput:true,type:"text"}],
  //   "Montant HT":[{isInput:true,type:"date"}],
  //   "Montant":[{isInput:true,type:"date"}]
  // },
  // Avances:{
  //   "Document":[{isInput:true,type:"text"}],
  //   "Mode de règlement":[{isInput:true,type:"text"}],
  //   "Client":[{isNavigate:true}],
  //   "Montant reçu":[{isInput:true,type:"date"}],
  //   "Référence":[{isInput:true,type:"date"}],
  //   "Numéro de document":[{isInput:true}],
  //   "Date":[],
  //   "Libelle de paiement":[]
  //   }
}

export const FiledsNeedCards=[
  "Contacts",
  //"Prospects",
  "Contacts fournisseurs",
  "Devis",
  "Bon de commande",
  "Factures",
  "Bon de Livraison"
]

export const TasksTableFields:Record<string,ColumnMeta[]> = {
    "name":[{isNavigate:true}],
    "priority":[{isBadge:true,type:"text",values:["Haute","Moyenne","Basse"],isSelected:true}],
    "projet":[{isInput:true,type:"text"}],
    "status":[{isBadge:true,isSelected:true,values:["En cours","Terminé"]}],
    "description":[{isTextEarea:true}],
    "dueDate":[{isDate:true}],
    "createdAt":[{isDate:true}],
    "updatedAt":[{isDate:true}],
}
export const TasksTableFieldsKeys: Record<string, string> = {
    "name": "Titre",
    "priority": "Priorité",
    "projet": "Projet",
    "status": "Statut",
    "description": "Description",
    "dueDate": "Date d'échéance",
    "createdAt": "Date de création",
    "updatedAt": "Date de modification"
}
