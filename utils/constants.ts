import {
  Banknote,
  BriefcaseBusiness,
  ChartColumn,
  Landmark,
  Package,
  PieChart,
  ShoppingCart,
  Users2,
} from "lucide-react"
import type { ColumnMeta } from "./types"

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
      title:"Ventes",
      icon:Banknote,
      href:"/admin/sales",
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

export const CrmFields = [
  "Clients",
  "Fournisseurs",
  "Contacts",
  "Contacts fournisseurs",
  "Prospects",
  "Contrats"
]



export const CrmTableFields : Record<string,Record<string, ColumnMeta[]>>={
  Clients:{
    "Code":[],
    "Entreprise":[{isNavigate:true,}],
    "Téléphone":[{isInput:true,type:"number"}],
    "Email":[{isInput:true,type:"email"}],
    "Catégories":[{isInput:true,type:"text"}],
    "ICE":[{isInput:true,type:"number"}],
    "Identifiant fiscal (IF)": [{isInput:true,type:"number"}],
    "Ville": [{isInput:true,type:"text"}],
    "Pays": [{isInput:true,type:"text"}],
    "Actif": [{isBadge:true}],
    "CARTE VISITE": [{isInput:true,type:"file"}],
  },
  Fournisseurs:{
    "Code":[],
    "Fournisseur":[{isNavigate:true,}],
    "Email":[{isInput:true,type:"email"}],
    "Numéro de téléphone":[{isInput:true,type:"number"}],
    "ICE":[{isInput:true,type:"number"}],
    "Identifiant fiscal (IF)": [{isInput:true,type:"number"}],
    "Ville": [{isInput:true,type:"text"}],
    "Pays": [{isInput:true,type:"text"}],
    "Catégories": [{isInput:true,type:"text"}]
  },
  Contacts:{
    "Nom":[{isNavigate:true,}],
    "Civilité":[{isInput:true,type:"text"}],
    "E-mail":[{isInput:true,type:"email"}],
    "Téléphone":[{isInput:true,type:"number"}],
    "Entreprise":[{isInput:true,type:"text"}],
    "Ville":[{isInput:true,type:"text"}],
    "Pays":[{isInput:true,type:"text"}],
    "Actif":[{isBadge:true}],
  },
  "Contacts fournisseurs":{
    "Name":[{isNavigate:true,}],
    "Title":[{isInput:true,type:"text"}],
    "Email":[{isInput:true,type:"email"}],
    "Phone Number":[{isInput:true,type:"number"}],
    "Supplier":[{isInput:true,type:"text"}],
    "City":[{isInput:true,type:"text"}],
    "Country":[{isInput:true,type:"text"}]
  },
  Prospects:{
    "Nom":[{isNavigate:true,}],
    "Prospect":[{isInput:true,type:"text"}],
    "Email":[{isInput:true,type:"email"}],
    "Téléphone":[{isInput:true,type:"number"}],
    "Attribué à":[{isInput:true,type:"text"}],
    "Statut":[{isInput:true,type:"text"}],
    "Source":[{isInput:true,type:"text"}],
    "Date d'ajout":[{isInput:true,type:"date"}],
    "Dernier contact":[{isInput:true,type:"date"}],
    "Localisation":[{isInput:true,type:"text"}],
  },
  Contrats:{
   "Sujet":[{isNavigate:true,}],
  "Client":[{isInput:true,type:"text"}],
  "Modèle de contrat":[{isInput:true,type:"text"}],
  "Date de depart":[{isInput:true,type:"date"}],
  "Date de fin":[{isInput:true,type:"date"}]
  }
}

export const SalesFields = [
  "Devis",
  "Bon de commande",
  "Factures",
  "Bon de Livraison",
  "Avoir",
  "Règlements",
  "Avances",
]

export const SalesTableFields : Record<string,Record<string, ColumnMeta[]>>={
  Devis:{
    "Numéro":[],   
    "Client":[{isNavigate:true}],
    "Date":[],
    "Montant TTC":[{isInput:true,type:"number"}],
    "Facture":[{isInput:true,type:"number"}],
    "Bon de commande": [{isInput:true,type:"number"}],
    "Bon de livraison": [{isInput:true,type:"text"}],
    "Commentaires": [{isInput:true,type:"text"}],
    "Statut": [{isBadge:true}],
  },
  "Bon de commande":{
    "Numéro":[],
    "Client":[{isNavigate:true,}],
    "Date":[{isInput:true,type:"date"}],
    "Total HT":[{isInput:true,type:"date"}],
    "Montant":[{isInput:true,type:"number"}],
    "Statut":[{isBadge:true}],
    "Qualification": [{isInput:true,type:"number"}],
    "Agent": [{isInput:true,type:"text"}],
    "N° de bon": [{isInput:true,type:"text"}],
  },
  Factures:{
    "Numéro":[],    
    "Client":[{isNavigate:true}],
    "Date de facture":[{isInput:true,type:"text"}],
    "Total HT":[{isInput:true,type:"number"}],
    "Montant":[{isInput:true,type:"text"}],
    "Statut":[{isBadge:true}],
    "Commercial":[{isInput:true,type:"text"}],
    "Periode":[],
  },
  "Bon de Livraison":{
    "Numéro":[],
    "Client":[{isNavigate:true,}],
    "Date":[{isInput:true,type:"text"}],
    "Montant HT":[{isInput:true,type:"email"}],
    "Montant TTC":[{isInput:true,type:"number"}],
    "Statut":[{isBadge:true}],
    "Société de livraison":[{isInput:true,type:"text"}],
    "Statut de livraison":[{isInput:true,type:"text"}],
    "Transporteur":[{isInput:true}]
  },
  Avoir:{
    "Nom":[{isNavigate:true,}],
    "Prospect":[{isInput:true,type:"text"}],
    "Email":[{isInput:true,type:"email"}],
    "Téléphone":[{isInput:true,type:"number"}],
    "Attribué à":[{isInput:true,type:"text"}],
    "Statut":[{isInput:true,type:"text"}],
    "Source":[{isInput:true,type:"text"}],
    "Date d'ajout":[{isInput:true,type:"date"}],
    "Dernier contact":[{isInput:true,type:"date"}],
    "Localisation":[{isInput:true,type:"text"}],
  },
  Règlements:{
    "Avoir #":[],
    "Client":[{isInput:true,type:"text"}],
    "Date":[{isInput:true,type:"text"}],
    "Montant HT":[{isInput:true,type:"date"}],
    "Montant":[{isInput:true,type:"date"}]
  },
  Avances:{
    "Document":[{isInput:true,type:"text"}],
    "Mode de règlement":[{isInput:true,type:"text"}],
    "Client":[{isNavigate:true}],
    "Montant reçu":[{isInput:true,type:"date"}],
    "Référence":[{isInput:true,type:"date"}],
    "Numéro de document":[{isInput:true}],
    "Date":[],
    "Libelle de paiement":[]
    }
}

export const FiledsNeedCards=[
  "Contacts",
  "Prospects",
  "Contacts fournisseurs",
  "Devis",
  "Bon de commande",
  "Factures",
  "Bon de Livraison"
]

export const TasksTableFields:Record<string,ColumnMeta[]> = {
    "Titre":[{isNavigate:true,}],
    "Date d'échéance":[{isInput:true,type:"date"}],
    "Priorité":[{isInput:true,type:"text"}],
    "Assigné":[{isInput:true,type:"text"}],
    "Projet":[{isInput:true,type:"text"}],
    "Statut":[{isBadge:true}],
    "Date de création":[{isInput:true,type:"date"}],
    "Date de dernière modification":[{isInput:true,type:"date"}],
}