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

type ColumnMeta = {
  isNavigate?: boolean
  isInput?: boolean
  isBadge?: boolean
  type?: "text" | "number" | "email" | "date" | "file"
}

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
  "Bon de commande":{
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
  Factures:{
    "Nom":[{isNavigate:true,}],
    "Civilité":[{isInput:true,type:"text"}],
    "E-mail":[{isInput:true,type:"email"}],
    "Téléphone":[{isInput:true,type:"number"}],
    "Entreprise":[{isInput:true,type:"text"}],
    "Ville":[{isInput:true,type:"text"}],
    "Pays":[{isInput:true,type:"text"}],
    "Actif":[{isBadge:true}],
  },
  "Bon de Livraison":{
    "Name":[{isNavigate:true,}],
    "Title":[{isInput:true,type:"text"}],
    "Email":[{isInput:true,type:"email"}],
    "Phone Number":[{isInput:true,type:"number"}],
    "Supplier":[{isInput:true,type:"text"}],
    "City":[{isInput:true,type:"text"}],
    "Country":[{isInput:true,type:"text"}]
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
   "Sujet":[{isNavigate:true,}],
  "Client":[{isInput:true,type:"text"}],
  "Modèle de contrat":[{isInput:true,type:"text"}],
  "Date de depart":[{isInput:true,type:"date"}],
  "Date de fin":[{isInput:true,type:"date"}]
  },
  Avances:{
   "Sujet":[{isNavigate:true,}],
  "Client":[{isInput:true,type:"text"}],
  "Modèle de contrat":[{isInput:true,type:"text"}],
  "Date de depart":[{isInput:true,type:"date"}],
  "Date de fin":[{isInput:true,type:"date"}]
  }
}
